import React, { useEffect, useRef, useState, useCallback } from 'react';
import { 
  X, ChevronLeft, ChevronRight, FileText, Maximize2, Loader2, 
  ZoomIn, ZoomOut, Volume2, VolumeX, Sparkles, BookOpen, Layers
} from 'lucide-react';
import { PageFlip } from 'page-flip';
import 'page-flip/src/Style/stPageFlip.css';

let pdfJsPromise = null;

function loadPdfJs() {
  if (typeof window !== 'undefined' && window.pdfjsLib) {
    return Promise.resolve(window.pdfjsLib);
  }
  if (pdfJsPromise) return pdfJsPromise;

  pdfJsPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-pdfjs="true"]');
    if (existing) {
      existing.addEventListener('load', () => resolve(window.pdfjsLib));
      existing.addEventListener('error', reject);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    script.async = true;
    script.dataset.pdfjs = 'true';
    script.onload = () => {
      if (!window.pdfjsLib) {
        reject(new Error('PDF.js failed to load.'));
        return;
      }
      window.pdfjsLib.GlobalWorkerOptions.workerSrc =
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      resolve(window.pdfjsLib);
    };
    script.onerror = () => reject(new Error('Unable to load PDF.js engine.'));
    document.head.appendChild(script);
  });

  return pdfJsPromise;
}

// Realistic page turn sound synthesized via Web Audio API (no external sound files required)
function playPageTurnAudio() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const bufferSize = ctx.sampleRate * 0.18; // 180ms paper swoosh
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      // Pinkish noise with rapid swell and decay curve
      const decay = Math.sin((i / bufferSize) * Math.PI);
      data[i] = (Math.random() * 2 - 1) * Math.pow(decay, 1.8) * 0.28;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    // Soft low-pass filter to replicate paper sliding
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.18);

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.35, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.18);

    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    noise.start();
    noise.onended = () => {
      try { ctx.close(); } catch { /* ignore */ }
    };
  } catch {
    // Ignore audio autoplay restrictions
  }
}

export default function PdfViewer({ pdfs = [], initialIndex = 0, onClose }) {
  const [index, setIndex] = useState(initialIndex);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStatus, setLoadingStatus] = useState('Initializing flipbook engine...');
  const [error, setError] = useState('');
  const [zoom, setZoom] = useState(1);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [bookPages, setBookPages] = useState([]); // Array of { num, dataUrl }

  const bookContainerRef = useRef(null);
  const pageFlipInstanceRef = useRef(null);
  const pdfDocRef = useRef(null);
  const isFlippingRef = useRef(false);

  const currentPdf = pdfs[index] || null;

  // Reset when document index changes
  useEffect(() => {
    setCurrentPage(1);
    setTotalPages(0);
    setBookPages([]);
    setError('');
    setZoom(1);
    if (pageFlipInstanceRef.current) {
      try {
        pageFlipInstanceRef.current.destroy();
      } catch { /* ignore */ }
      pageFlipInstanceRef.current = null;
    }
  }, [index, currentPdf?.id]);

  // Load PDF and render all pages to high-res image data
  useEffect(() => {
    let cancelled = false;

    async function loadAndRenderPdf() {
      if (!currentPdf?.dataUrl) {
        setError('No PDF URL available.');
        setLoading(false);
        return;
      }

      setLoading(true);
      setLoadingProgress(5);
      setLoadingStatus('Loading PDF document...');
      setError('');

      try {
        const pdfjsLib = await loadPdfJs();
        if (cancelled) return;

        let pdfData;
        if (currentPdf.dataUrl.startsWith('data:')) {
          // Extract base64
          const base64Part = currentPdf.dataUrl.split(',')[1];
          const binaryString = atob(base64Part);
          const bytes = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }
          pdfData = bytes;
        } else {
          // Fetch relative or remote URL
          const response = await fetch(currentPdf.dataUrl);
          if (!response.ok) throw new Error(`HTTP ${response.status}: Failed to fetch PDF`);
          const buffer = await response.arrayBuffer();
          pdfData = new Uint8Array(buffer);
        }

        if (cancelled) return;
        setLoadingProgress(20);
        setLoadingStatus('Parsing PDF structure...');

        const loadingTask = pdfjsLib.getDocument({ data: pdfData });
        const pdfDoc = await loadingTask.promise;
        if (cancelled) {
          pdfDoc.destroy();
          return;
        }

        pdfDocRef.current = pdfDoc;
        const numPages = pdfDoc.numPages || 1;
        setTotalPages(numPages);

        // Render each page to an optimized Canvas image at scale 1.8 for crisp retina text & images
        const renderedPages = [];
        const renderScale = 1.75;

        for (let pNum = 1; pNum <= numPages; pNum++) {
          if (cancelled) return;
          setLoadingStatus(`Rendering high-resolution page ${pNum} of ${numPages}...`);
          setLoadingProgress(20 + Math.round((pNum / numPages) * 75));

          const pageObj = await pdfDoc.getPage(pNum);
          const viewport = pageObj.getViewport({ scale: renderScale });

          const canvas = document.createElement('canvas');
          canvas.width = Math.floor(viewport.width);
          canvas.height = Math.floor(viewport.height);
          const ctx = canvas.getContext('2d', { alpha: false });

          // Fill clean crisp white background
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          await pageObj.render({
            canvasContext: ctx,
            viewport,
            background: '#ffffff'
          }).promise;

          const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
          renderedPages.push({
            num: pNum,
            dataUrl,
            aspect: viewport.width / viewport.height
          });
        }

        if (cancelled) return;
        setBookPages(renderedPages);
        setLoadingProgress(100);
        setLoadingStatus('Ready!');
      } catch (err) {
        if (!cancelled) {
          console.error('Flipbook PDF loading error:', err);
          setError(`Unable to load flipbook PDF (${err.message || 'Network or parse error'}).`);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadAndRenderPdf();

    return () => {
      cancelled = true;
      if (pdfDocRef.current) {
        try { pdfDocRef.current.destroy(); } catch { /* ignore */ }
        pdfDocRef.current = null;
      }
    };
  }, [currentPdf?.dataUrl, index]);

  // Initialize PageFlip instance once all pages are rendered
  useEffect(() => {
    if (loading || bookPages.length === 0 || !bookContainerRef.current) return;

    let destroyed = false;

    // Small delay to ensure DOM elements are attached
    const timer = setTimeout(() => {
      if (destroyed || !bookContainerRef.current) return;

      // Clean up any existing flip instance
      if (pageFlipInstanceRef.current) {
        try { pageFlipInstanceRef.current.destroy(); } catch { /* ignore */ }
        pageFlipInstanceRef.current = null;
      }

      // Calculate realistic book dimension based on viewport container
      const container = bookContainerRef.current;
      const cWidth = container.clientWidth || 900;
      const cHeight = container.clientHeight || 650;

      // Heyzine dual-page / single-page responsive dimensions
      // In 2-page spread mode, single page width is ~ half container minus margin
      const isMobile = window.innerWidth < 768;
      let pageWidth = isMobile ? Math.min(500, cWidth - 30) : Math.min(540, Math.floor((cWidth - 60) / 2));
      let pageHeight = Math.min(780, Math.floor(pageWidth * 1.414)); // Standard A4 / Book aspect ratio

      if (pageHeight > cHeight - 60) {
        pageHeight = Math.max(380, cHeight - 60);
        pageWidth = Math.floor(pageHeight / 1.414);
      }

      try {
        const pageFlip = new PageFlip(bookContainerRef.current, {
          width: pageWidth,
          height: pageHeight,
          size: 'fixed',
          minWidth: 280,
          maxWidth: 600,
          minHeight: 380,
          maxHeight: 850,
          drawShadow: true,
          flippingTime: 700,
          usePortrait: isMobile,
          startZIndex: 10,
          autoSize: false,
          maxShadowOpacity: 0.55,
          showCover: true,
          mobileScrollSupport: false,
          swipeDistance: 30
        });

        const htmlElements = bookContainerRef.current.querySelectorAll('.stf-page');
        if (htmlElements.length > 0) {
          pageFlip.loadFromHTML(htmlElements);
          pageFlipInstanceRef.current = pageFlip;

          pageFlip.on('flip', (e) => {
            setCurrentPage(e.data + 1);
            if (soundEnabled) {
              playPageTurnAudio();
            }
          });

          pageFlip.on('changeState', (e) => {
            isFlippingRef.current = e.data === 'flipping';
          });
        }
      } catch (e) {
        console.error('PageFlip mount error:', e);
      }
    }, 100);

    return () => {
      destroyed = true;
      clearTimeout(timer);
      if (pageFlipInstanceRef.current) {
        try { pageFlipInstanceRef.current.destroy(); } catch { /* ignore */ }
        pageFlipInstanceRef.current = null;
      }
    };
  }, [bookPages, loading, soundEnabled]);

  // Turn to Next / Previous page
  const flipPrev = useCallback(() => {
    if (pageFlipInstanceRef.current) {
      pageFlipInstanceRef.current.flipPrev();
    }
  }, []);

  const flipNext = useCallback(() => {
    if (pageFlipInstanceRef.current) {
      pageFlipInstanceRef.current.flipNext();
    }
  }, []);

  const goToPage = useCallback((targetPage) => {
    if (pageFlipInstanceRef.current) {
      const idx = Math.max(0, Math.min(bookPages.length - 1, targetPage - 1));
      pageFlipInstanceRef.current.turnToPage(idx);
    }
  }, [bookPages.length]);

  // Keyboard navigation (Left / Right arrow, Escape)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        flipNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        flipPrev();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [flipNext, flipPrev, onClose]);

  if (!currentPdf) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-stone-950/95 backdrop-blur-xl flex flex-col select-none animate-fadeIn overflow-hidden">
      {/* Top Heyzine-Style Academic Header Toolbar */}
      <header className="h-14 sm:h-16 px-4 sm:px-6 bg-stone-900/90 border-b border-white/10 flex items-center justify-between gap-4 shrink-0 shadow-lg z-20">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5 text-violet-400" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase bg-violet-500/20 text-violet-300 border border-violet-500/30">
                HEYZINE 3D FLIPBOOK
              </span>
              <h3 className="font-serif font-bold text-sm sm:text-base text-white truncate">
                {currentPdf.name}
              </h3>
            </div>
            <p className="text-[11px] font-mono text-stone-400 truncate">
              {bookPages.length > 0
                ? `Page ${currentPage} of ${totalPages} • Real 3D Physical Paper Simulation`
                : 'Loading pages...'}
            </p>
          </div>
        </div>

        {/* Top Control Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {pdfs.length > 1 && (
            <select
              value={index}
              onChange={(e) => setIndex(Number(e.target.value))}
              className="hidden md:block rounded-xl border border-white/10 bg-stone-800 text-stone-200 text-xs px-3 py-1.5 focus:outline-none focus:border-violet-500"
            >
              {pdfs.map((p, i) => (
                <option key={p.id || i} value={i}>
                  {p.name}
                </option>
              ))}
            </select>
          )}

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled((prev) => !prev)}
            className={`p-2 rounded-xl border transition-all ${
              soundEnabled
                ? 'bg-violet-600/20 border-violet-500/40 text-violet-300'
                : 'bg-stone-800/80 border-white/10 text-stone-400 hover:text-white'
            }`}
            title={soundEnabled ? 'Page Turn Sound: ON' : 'Page Turn Sound: MUTED'}
            aria-label="Toggle page turn audio"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Thumbnails Drawer Toggle */}
          <button
            onClick={() => setShowThumbnails((prev) => !prev)}
            className={`p-2 rounded-xl border transition-all ${
              showThumbnails
                ? 'bg-violet-600/20 border-violet-500/40 text-violet-300'
                : 'bg-stone-800/80 border-white/10 text-stone-400 hover:text-white'
            }`}
            title="Toggle Thumbnails Panel"
            aria-label="Toggle thumbnails drawer"
          >
            <Layers className="w-4 h-4" />
          </button>

          {/* Original View PDF Button */}
          <a
            href={currentPdf.dataUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-mono transition-all"
            title="Open original PDF in browser tab"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>View PDF</span>
          </a>

          {/* Close (×) Button - Returns to Modules section */}
          <button
            onClick={onClose}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 hover:text-rose-200 text-xs font-mono flex items-center gap-1.5 transition-all shadow-sm"
            title="Close flipbook (Esc)"
            aria-label="Close flipbook and return to Modules"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Close</span>
          </button>
        </div>
      </header>

      {/* Main Flipbook Stage (Heyzine 3D Environment) */}
      <div className="flex-1 min-h-0 relative flex items-center justify-center p-2 sm:p-6 overflow-hidden bg-gradient-to-b from-[#110f18] via-[#0c0a12] to-[#08070d]">
        {/* Subtle Ambient Studio Lighting */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.08)_0%,transparent_70%)]" />

        {/* Loading Spinner with Progress */}
        {loading && (
          <div className="z-30 flex flex-col items-center gap-4 p-8 rounded-2xl bg-stone-900/90 border border-white/10 shadow-2xl backdrop-blur-md max-w-sm text-center">
            <div className="relative">
              <Loader2 className="w-10 h-10 animate-spin text-violet-500" />
              <Sparkles className="w-4 h-4 text-violet-300 absolute top-0 right-0 animate-pulse" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-lg text-white">Rendering 3D Book</h4>
              <p className="text-xs font-mono text-stone-400 mt-1">{loadingStatus}</p>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-stone-800 rounded-full h-2 overflow-hidden border border-white/10">
              <div 
                className="bg-violet-600 h-full rounded-full transition-all duration-300 shadow-[0_0_12px_rgba(139,92,246,0.6)]"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <span className="text-[11px] font-mono text-violet-400 font-semibold">{loadingProgress}%</span>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="z-30 max-w-md p-6 rounded-2xl bg-stone-900 border border-rose-500/30 shadow-2xl text-center">
            <p className="text-sm text-rose-300 font-medium mb-4">{error}</p>
            <div className="flex items-center justify-center gap-3">
              <a
                href={currentPdf.dataUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-violet-600 text-white text-xs font-semibold"
              >
                View PDF Directly
              </a>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-white/10 text-stone-300 text-xs"
              >
                Back to Modules
              </button>
            </div>
          </div>
        )}

        {/* Left Side Quick Flip Arrow Zone */}
        {!loading && bookPages.length > 0 && (
          <button
            onClick={flipPrev}
            disabled={currentPage <= 1}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-20 sm:w-14 sm:h-24 rounded-2xl bg-stone-900/60 hover:bg-stone-800/90 border border-white/10 hover:border-violet-500/50 flex items-center justify-center text-white/70 hover:text-white transition-all shadow-xl backdrop-blur-md disabled:opacity-0 disabled:pointer-events-none group cursor-pointer"
            title="Previous Page (Left Arrow)"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
          </button>
        )}

        {/* Right Side Quick Flip Arrow Zone */}
        {!loading && bookPages.length > 0 && (
          <button
            onClick={flipNext}
            disabled={currentPage >= totalPages}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-20 sm:w-14 sm:h-24 rounded-2xl bg-stone-900/60 hover:bg-stone-800/90 border border-white/10 hover:border-violet-500/50 flex items-center justify-center text-white/70 hover:text-white transition-all shadow-xl backdrop-blur-md disabled:opacity-0 disabled:pointer-events-none group cursor-pointer"
            title="Next Page (Right Arrow)"
            aria-label="Next page"
          >
            <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
          </button>
        )}

        {/* 3D Flipbook Wrapper with realistic drop shadow & spine perspective */}
        <div 
          className="relative flex items-center justify-center transition-transform duration-300"
          style={{ transform: `scale(${zoom})` }}
        >
          {/* Wooden / Felt Reading Desk Shadow */}
          <div className="absolute -inset-10 bg-black/40 blur-3xl pointer-events-none rounded-full" />

          {/* Book Container attached to PageFlip */}
          <div 
            ref={bookContainerRef}
            className="flipbook-root relative shadow-[0_30px_70px_rgba(0,0,0,0.85),0_10px_25px_rgba(0,0,0,0.6)] rounded-sm overflow-hidden"
          >
            {bookPages.map((pageData, idx) => {
              const isHardCover = idx === 0 || idx === bookPages.length - 1;
              return (
                <div
                  key={pageData.num}
                  className={`stf-page bg-white relative overflow-hidden ${
                    isHardCover ? 'hard-cover shadow-2xl font-semibold' : ''
                  }`}
                  data-density={isHardCover ? 'hard' : 'soft'}
                  style={{ backgroundColor: '#ffffff' }}
                >
                  {/* High Resolution Page Canvas Image */}
                  <img
                    src={pageData.dataUrl}
                    alt={`Page ${pageData.num}`}
                    className="w-full h-full object-contain pointer-events-none select-none"
                    loading="eager"
                  />

                  {/* Realistic Book Spine Shading & Inner Curvature Gradient */}
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: idx % 2 === 0
                        ? 'linear-gradient(to right, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.04) 5%, transparent 12%)'
                        : 'linear-gradient(to left, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.04) 5%, transparent 12%)'
                    }}
                  />

                  {/* Paper Texture Overlay */}
                  <div 
                    className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply"
                    style={{
                      backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
                      backgroundSize: '4px 4px'
                    }}
                  />

                  {/* Subtle Page Footer Tag */}
                  <div className="absolute bottom-2 left-0 right-0 px-4 flex justify-between items-center text-[9px] font-mono text-stone-400 pointer-events-none">
                    <span>{idx % 2 === 0 ? `Module ${currentPdf.name.replace('.pdf', '')}` : ''}</span>
                    <span>{pageData.num}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Thumbnail Drawer (Collapsible bottom panel) */}
        {showThumbnails && bookPages.length > 0 && (
          <div className="absolute bottom-16 left-4 right-4 max-w-4xl mx-auto z-40 bg-stone-900/95 border border-white/10 rounded-2xl p-3 shadow-2xl backdrop-blur-xl animate-fadeIn">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-xs font-mono text-stone-300">
              <span className="flex items-center gap-1.5 font-bold text-violet-300">
                <Layers className="w-3.5 h-3.5" /> Page Navigator ({bookPages.length} pages)
              </span>
              <button 
                onClick={() => setShowThumbnails(false)} 
                className="text-stone-400 hover:text-white text-[11px]"
              >
                Close
              </button>
            </div>
            <div className="flex gap-2.5 overflow-x-auto py-1 scrollbar-thin">
              {bookPages.map((pageData) => {
                const isSelected = currentPage === pageData.num;
                return (
                  <button
                    key={pageData.num}
                    onClick={() => {
                      goToPage(pageData.num);
                      setShowThumbnails(false);
                    }}
                    className={`flex-shrink-0 flex flex-col items-center gap-1 p-1 rounded-lg border transition-all ${
                      isSelected
                        ? 'border-violet-500 bg-violet-500/20 shadow-md ring-2 ring-violet-500/40'
                        : 'border-white/10 bg-stone-800/80 hover:border-white/30'
                    }`}
                  >
                    <img
                      src={pageData.dataUrl}
                      alt={`Thumbnail ${pageData.num}`}
                      className="w-16 h-22 object-cover rounded shadow"
                    />
                    <span className="text-[10px] font-mono text-stone-300">{pageData.num}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Professional Heyzine Control Bar */}
      <footer className="h-14 sm:h-16 px-4 sm:px-6 bg-stone-900/90 border-t border-white/10 flex items-center justify-between gap-3 shrink-0 shadow-lg z-20">
        {/* Left: Quick Hint & Book Status */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-stone-400">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Click page corners or drag to flip like a physical magazine</span>
        </div>

        {/* Center: Flip Navigation Buttons */}
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <button
            onClick={flipPrev}
            disabled={currentPage <= 1}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 border border-white/10 text-white text-xs font-semibold disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
            title="Previous Page (Left Arrow)"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Prev</span>
          </button>

          {/* Page Number Quick Indicator */}
          <div className="px-3 py-1.5 rounded-xl bg-stone-950/80 border border-white/10 text-xs font-mono text-white flex items-center gap-1.5">
            <span className="text-violet-400 font-bold">{currentPage}</span>
            <span className="text-stone-500">/</span>
            <span>{totalPages || 1}</span>
          </div>

          <button
            onClick={flipNext}
            disabled={currentPage >= totalPages}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold disabled:opacity-30 disabled:pointer-events-none transition-all shadow-md shadow-violet-600/30 cursor-pointer"
            title="Next Page (Right Arrow)"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Zoom & Fullscreen Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-stone-800/80 px-1 py-0.5">
            <button
              onClick={() => setZoom((z) => Math.max(0.7, Math.round((z - 0.15) * 100) / 100))}
              disabled={zoom <= 0.7}
              className="p-1.5 rounded-lg text-stone-300 hover:text-white disabled:opacity-30 transition-colors"
              title="Zoom out"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="min-w-10 text-center text-[11px] font-mono text-stone-300">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom((z) => Math.min(1.6, Math.round((z + 0.15) * 100) / 100))}
              disabled={zoom >= 1.6}
              className="p-1.5 rounded-lg text-stone-300 hover:text-white disabled:opacity-30 transition-colors"
              title="Zoom in"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          <a
            href={currentPdf.dataUrl}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-xl border border-white/10 bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white transition-all"
            title="Open in new window / full screen"
            aria-label="Maximize PDF"
          >
            <Maximize2 className="w-4 h-4" />
          </a>
        </div>
      </footer>
    </div>
  );
}
