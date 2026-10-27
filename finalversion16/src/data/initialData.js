/**
 * DS LAB seed data.
 * Modules and experiments are intentionally independent.
 */

import idCardPhoto from '../assets/id-card-photo.jpeg';

const LEGACY_DEFAULT_AVATAR = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400";

export const INITIAL_STUDENT_PROFILE = {
  name: "BAPATHI SARANYA",
  role: "Data Science Student",
  course: "Bachelore-CSEDS",
  rollNo: "24102A030008",
  subject: "Data Science Laboratory",
  university: "Mohan Babu University",
  faculty: "S.BosuBabu",
  avatar: idCardPhoto,
  linkedIn: "https://www.linkedin.com/in/saranya-bapathi-b10b97370",
  github: "https://github.com/bapathisharanya28",
  email: "bapathisharanyareddy@gmail.com",
  semester: "2026",
  batch: "2024-2025",
  branch: "CSE (DS)",
  section: "DS-1",
  resume: null
};

export const INITIAL_MODULES = [
  {
    id: 1, number: 1, title: "Introduction",
    periods: 9,
    description: "Introduction to Data Science, including its definition, required skills, tools, data types, data collections, preprocessing, data analysis, and major types of analytics.",
    overview: "This module introduces the foundations of Data Science. It covers what Data Science is, the skills and tools needed for data science work, different data types and collections, data preprocessing, and the major approaches used for analysing data.",
    objectives: [
      "Understand the definition and fundamentals of Data Science.",
      "Identify the skills and tools required for Data Science.",
      "Understand different data types and data collections.",
      "Explain data preprocessing and data analysis.",
      "Differentiate descriptive, diagnostic, predictive, prescriptive, exploratory, and mechanistic analysis."
    ],
    topics: [
      "Definition of Data Science", "Skills for Data Science", "Tools for Data Science", "Data Types", "Data Collections", "Data Preprocessing", "Data Analysis", "Descriptive Analysis", "Diagnostic Analysis", "Predictive Analytics", "Prescriptive Analytics", "Exploratory Analysis", "Mechanistic Analysis"
    ],
    pdfs: [
      { id: "ds-mod1.pdf", name: "ds-mod1.pdf", dataUrl: "/ds-mod1.pdf" }
    ]
  },
  {
    id: 2, number: 2, title: "Data Extraction",
    periods: 9,
    description: "Extracting meaning from data through feature selection, user retention, filters, wrappers, entropy, decision tree algorithms, random forests, the dimensionality problem, SVD, and PCA.",
    overview: "This module focuses on extracting useful information from data and selecting informative features. It introduces feature-selection approaches, decision trees, random forests, dimensionality problems, singular value decomposition, and principal component analysis.",
    objectives: [
      "Understand how useful meaning can be extracted from data.",
      "Explain feature selection and feature-selection methods.",
      "Understand entropy and decision tree algorithms.",
      "Describe random forests and their use in data analysis.",
      "Understand the dimensionality problem, SVD, and PCA."
    ],
    topics: [
      "Extracting Meaning from Data", "Feature Selection", "User Retention", "Filters", "Wrappers", "Entropy", "Decision Tree Algorithm", "Random Forests", "Dimensionality Problem", "Single Value Decomposition", "Principal Component Analysis"
    ],
    pdfs: [
      { id: "ds-mod2.pdf", name: "ds-mod2.pdf", dataUrl: "/ds-mod2.pdf" }
    ]
  },
  {
    id: 3, number: 3, title: "Data Visualization",
    periods: 8,
    description: "Visualizing data using Matplotlib, Pandas, Seaborn, line plots, bar plots, histograms, density plots, scatter plots, facet grids, and categorical data visualizations.",
    overview: "This module introduces Python-based data visualization. It covers the Matplotlib API, plotting with Pandas and Seaborn, and a range of plots for understanding distributions, relationships, and categorical data.",
    objectives: [
      "Understand the basic Matplotlib API.",
      "Create visualizations using Pandas and Seaborn.",
      "Represent data using line plots, bar plots, histograms, and density plots.",
      "Create scatter plots and facet grids.",
      "Visualize categorical data effectively."
    ],
    topics: [
      "Matplotlib API", "Plotting with Pandas", "Seaborn", "Line Plots", "Bar Plots", "Histograms", "Density Plots", "Scatter Plots", "Facet Grids", "Categorical Data", "Other Python Visualization Tools"
    ],
    pdfs: [
      { id: "ds-mod3.pdf", name: "ds-mod3.pdf", dataUrl: "/ds-mod3.pdf" }
    ]
  },
  {
    id: 4, number: 4, title: "Statistical Thinking",
    periods: 11,
    description: "Understanding distributions through histograms, outliers, variance, probability mass functions, cumulative distribution functions, percentile-based statistics, random numbers, and probability distributions.",
    overview: "This module develops statistical thinking for understanding and representing data distributions. It covers histograms, outliers, variance, PMFs, CDFs, percentile-based statistics, random numbers, and important probability distributions including exponential, normal, and lognormal distributions.",
    objectives: [
      "Represent and plot distributions using histograms.",
      "Identify outliers and summarize distributions.",
      "Understand variance and probability mass functions.",
      "Represent and interpret cumulative distribution functions and percentile-based statistics.",
      "Understand exponential, normal, and lognormal distributions."
    ],
    topics: [
      "Distributions", "Representing and Plotting Histograms", "Outliers", "Summarizing Distributions", "Variance", "Reporting Results", "Probability Mass Function", "Plotting PMFs", "Other Visualizations", "Class Size Paradox", "Data Frame Indexing", "Cumulative Distribution Functions", "Limits of PMFs", "Representing CDFs", "Percentile Based Statistics", "Random Numbers", "Comparing Percentile Ranks", "Modeling Distributions", "Exponential Distribution", "Normal Distribution", "Lognormal Distribution"
    ],
    pdfs: [
      { id: "ds-mod4.pdf", name: "ds-mod4.pdf", dataUrl: "/ds-mod4.pdf" }
    ]
  },
  {
    id: 5, number: 5, title: "Time Series Analysis and Predictive Modeling",
    periods: 8,
    description: "Analysing time series through importing and cleaning data, plotting, moving averages, missing values, serial correlation, autocorrelation, predictive modeling, model evaluation, model-solution building, and sentiment analysis.",
    overview: "This module introduces time series analysis and predictive modeling. It covers importing and cleaning time-series data, plotting and moving averages, handling missing values, serial correlation and autocorrelation, predictive modeling, evaluation of predictive models, building predictive model solutions, and sentiment analysis.",
    objectives: [
      "Import, clean, and plot time-series data.",
      "Understand moving averages and missing values in time series.",
      "Explain serial correlation and autocorrelation.",
      "Understand predictive modeling and evaluate predictive models.",
      "Build predictive model solutions and understand sentiment analysis."
    ],
    topics: [
      "Time Series Analysis", "Importing and Cleaning", "Plotting", "Moving Averages", "Missing Values", "Serial Correlation", "Autocorrelation", "Predictive Modeling", "Predictive Modeling Overview", "Evaluating Predictive Models", "Building Predictive Model Solutions", "Sentiment Analysis"
    ],
    pdfs: [
      { id: "ds-mod5.pdf", name: "ds-mod5.pdf", dataUrl: "/ds-mod5.pdf" }
    ]
  }
];

const csvCode = `import pandas as pd
import os

# 1A.1 - Read CSV file (cached locally for instant loading, with online fallback)
url = "https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv"
if os.path.exists("iris.csv"):
    df = pd.read_csv("iris.csv")
else:
    try:
        df = pd.read_csv(url)
    except Exception:
        df = pd.read_csv("students.csv")
print("First five rows of the dataset:")
print(df.head())
print("\\nDataset Information:")
print(df.info())
print("\\nNumber of rows and columns:")
print(df.shape)

# 1A.2 - Write the DataFrame to CSV
output_file = "iris_output.csv"
df.to_csv(output_file, index=False)
print(f"\\nThe dataset has been successfully written to {output_file}")

# 1A.3 - Create a tab-delimited student file, then read it
student_data = {
    "Roll_No": [101, 102, 103, 104],
    "Name": ["Anusha", "Babitha", "Charitha", "Deepika"],
    "Department": ["IT", "IT", "CSE", "ECE"],
    "Percentage": [89, 92, 88, 85]
}
student_df = pd.DataFrame(student_data)
student_df.to_csv("students.txt", sep="\\t", index=False)
print("\\nData successfully written to students.txt")

print("\\nStudent data read from the tab-delimited file:")
print(pd.read_csv("students.txt", sep="\\t"))`;

const jsonCode = `import pandas as pd
import requests
from io import StringIO

# 1B.1 - Write a DataFrame to JSON
student_data = {
    "Roll No": [101, 102, 103, 104],
    "Name": ["Anu", "Bobby", "Cheriy", "Duke"],
    "Department": ["IT", "IT", "CSE", "DS"]
}
df = pd.DataFrame(student_data)
df.to_json("students.json", orient="records", indent=4)
print("JSON file created successfully")

# 1B.2 - Read the JSON file
print("\\nStudent Data")
print(pd.read_json("students.json"))

# 1B.3 - Parse JSON text directly
json_data = """
[
    {"RollNo": 101, "Name": "Anu", "Marks": 89},
    {"RollNo": 102, "Name": "Bobby", "Marks": 92},
    {"RollNo": 103, "Name": "Charitha", "Marks": 88}
]
"""
parsed_df = pd.read_json(StringIO(json_data))
print("\\nParsed JSON Data")
print(parsed_df)

# 1B.4 - Read JSON data from a public API
url = "https://jsonplaceholder.typicode.com/users"
ENABLE_LIVE_API = False  # Change to True when you want to call the public API.
if ENABLE_LIVE_API:
    try:
        response = requests.get(url, timeout=2)
        response.raise_for_status()
        api_df = pd.read_json(StringIO(response.text))
        print("\\nSource: JSONPlaceholder API")
    except Exception as error:
        print("\\nAPI unavailable; using offline sample records:", error)
        api_df = pd.DataFrame([
            {"id": 1, "name": "Anu", "username": "anu_ds", "email": "anu@example.com"},
            {"id": 2, "name": "Bobby", "username": "bobby_ds", "email": "bobby@example.com"},
            {"id": 3, "name": "Charitha", "username": "charitha_ds", "email": "charitha@example.com"}
        ])
else:
    api_df = pd.DataFrame([
        {"id": 1, "name": "Anu", "username": "anu_ds", "email": "anu@example.com"},
        {"id": 2, "name": "Bobby", "username": "bobby_ds", "email": "bobby@example.com"},
        {"id": 3, "name": "Charitha", "username": "charitha_ds", "email": "charitha@example.com"}
    ])
    print("\\nUsing offline sample API records for fast execution. Set ENABLE_LIVE_API=True to call the live API.")
print("\\nFirst 5 API Records:")
print(api_df.head())`;

const excelCode = `import pandas as pd

# 1C.1 - Write a student DataFrame to Excel
student_data = {
    "Roll No": [101, 102, 103, 104],
    "Name": ["Anu", "Bobby", "Cherry", "Duke"],
    "Department": ["IT", "IT", "CSE", "DS"],
    "Percentage": [89, 92, 88, 85]
}
df = pd.DataFrame(student_data)
df.to_excel("students.xlsx", sheet_name="Student-Details", index=False)
print("Data successfully written to students.xlsx")

# 1C.2 - Read the Excel file
read_df = pd.read_excel("students.xlsx", sheet_name="Student-Details")
print("\\nData read from Excel File:")
print(read_df)

# 1C.3 - Write multiple DataFrames to different sheets
course_data = {
    "Course-ID": ["C101", "C102", "C103"],
    "Course-Name": ["Python", "DataScience", "Machine Learning"],
    "Credits": [4, 3, 4]
}
courses_df = pd.DataFrame(course_data)
with pd.ExcelWriter("college-data.xlsx", engine="openpyxl") as writer:
    df.iloc[:3].to_excel(writer, sheet_name="Students", index=False)
    courses_df.to_excel(writer, sheet_name="Courses", index=False)
print("\\nMultiple sheets successfully written to college-data.xlsx")

# 1C.4 - Read all sheets
excel_data = pd.read_excel("college-data.xlsx", sheet_name=None)
print("\\nAvailable Sheets:")
print(list(excel_data.keys()))
print("\\nStudent Sheet:")
print(excel_data["Students"])
print("\\nCourse Sheet:")
print(excel_data["Courses"])`;

const exp2a = `import requests
import pandas as pd

# Set ENABLE_LIVE_API=True to call GitHub. The default is offline for fast, reliable runs.
ENABLE_LIVE_API = False
url = "https://api.github.com/repos/pandas-dev/pandas/issues?per_page=5"
if ENABLE_LIVE_API:
    try:
        response = requests.get(url, timeout=2)
        response.raise_for_status()
        df_issues = pd.DataFrame(response.json())
        print("Source: GitHub REST API")
    except Exception as error:
        print("API unavailable; using offline sample records:", error)
        df_issues = pd.DataFrame([
            {"id": 101, "title": "Improve documentation", "state": "open", "created_at": "2026-01-10"},
            {"id": 102, "title": "Fix dataframe edge case", "state": "closed", "created_at": "2026-01-12"},
            {"id": 103, "title": "Add plotting example", "state": "open", "created_at": "2026-01-14"},
        ])
else:
    df_issues = pd.DataFrame([
        {"id": 101, "title": "Improve documentation", "state": "open", "created_at": "2026-01-10"},
        {"id": 102, "title": "Fix dataframe edge case", "state": "closed", "created_at": "2026-01-12"},
        {"id": 103, "title": "Add plotting example", "state": "open", "created_at": "2026-01-14"},
    ])
    print("Using offline sample API records. Set ENABLE_LIVE_API=True to call GitHub.")
print(df_issues[["id", "title", "state", "created_at"]].head())`;
const exp2b = `import sqlite3
import pandas as pd

conn = sqlite3.connect("students.db")
cursor = conn.cursor()

cursor.execute("""CREATE TABLE IF NOT EXISTS students
                  (id INTEGER, name TEXT)""")
cursor.execute("INSERT INTO students VALUES (1, 'John')")
conn.commit()

df = pd.read_sql_query("SELECT * FROM students", conn)
print(df)

cursor.execute("UPDATE students SET name = 'Alice' WHERE id = 1")
cursor.execute("DELETE FROM students WHERE id = 1")
conn.commit()
conn.close()`;

const exp3a = `import numpy as np
import pandas as pd

data = {"A": [1, 2, np.nan], "B": [4, np.nan, np.nan]}
df = pd.DataFrame(data)
print("Missing-value mask:")
print(df.isna())

df_clean = df.dropna()
df_filled = df.fillna(0)
print("\\nRows after dropna():")
print(df_clean)
print("\\nValues after fillna(0):")
print(df_filled)

df = df.drop_duplicates()
print("\\nDuplicates removed:")
print(df)`;
const exp3b = `import pandas as pd

df = pd.DataFrame({"gender": ["male", "female", "male"]})
df["gender_num"] = df["gender"].map({"male": 0, "female": 1})
df_renamed = df.rename(columns={"gender": "Gender"})
print(df_renamed)`;
const exp3c = `import numpy as np
import pandas as pd

data = pd.DataFrame(np.random.randn(100, 3))
outliers = (data > 3) | (data < -3)
print("Outlier count per column:")
print(outliers.sum())`;
const exp3d = `import re

text = "This is 1 test"
split_text = re.split(r"\\s+", text)
print("Split text:")
print(split_text)`;

const exp4a = `import pandas as pd
import numpy as np

data = pd.Series(
    np.random.randn(6),
    index=[["a", "a", "b", "b", "c", "c"], [1, 2, 1, 2, 1, 2]]
)
print(data)
print("\\nValues under label 'b':")
print(data["b"])
print("\\nValues at second-level index 1:")
print(data[:, 1])`;
const exp4b = `import pandas as pd
import numpy as np

data = pd.Series(
    np.random.randn(6),
    index=[["a", "a", "b", "b", "c", "c"], [1, 2, 1, 2, 1, 2]]
)
df = data.unstack()
print("Unstacked DataFrame:")
print(df)
print("\\nStacked Series:")
print(df.stack())`;
const exp4c = `import pandas as pd
import numpy as np

df1 = pd.DataFrame({"a": [1, np.nan, 3], "b": [4, 5, 6]})
df2 = pd.DataFrame({"a": [7, 8, 9], "b": [np.nan, 11, 12]})
merged = df1.combine_first(df2)
print("Combined DataFrame:")
print(merged)`;

const exp5a = `import matplotlib.pyplot as plt

x = [13, 20, 23, 27, 30]
y = [15, 20, 25, 30, 35]
plt.plot(x, y)
plt.title('line plot')
plt.xlabel("x-axis")
plt.ylabel("y-axis")
plt.grid(True)
plt.show()`;
const exp5b = `import pandas as pd
import matplotlib.pyplot as plt

df = pd.DataFrame({"Category": ["A", "B", "C"], "values": [12, 24, 55]})
df.plot(kind="bar", x="Category", y="values")
plt.title('Bar Plot')
plt.show()`;
const exp5c = `import seaborn as sns
import numpy as np
import matplotlib.pyplot as plt

data = np.random.randn(500)
sns.histplot(x=data, kde=True, color="teal")
plt.title('Histogram and density')
plt.show()`;
const exp5d = `import numpy as np
import matplotlib.pyplot as plt

x = np.random.rand(54)
y = np.random.rand(54)
plt.scatter(x, y)
plt.xlabel("x-axis")
plt.ylabel("y-axis")

plt.show()`;
const exp5e = `import seaborn as sns
import numpy as np
import matplotlib.pyplot as plt

sns.boxplot(data=np.random.randn(80, 4))
plt.title('box plot')
plt.show()`;

const exp6a = `import pandas as pd
import numpy as np

rng = pd.date_range("2023-01-01", periods=6, freq="D")
ts = pd.Series(np.random.randn(len(rng)), index=rng)
print(ts)`;
const exp6b = `import pandas as pd

ts = pd.Timestamp.now()
ts_utc = ts.tz_localize("UTC")
ts_ind = ts_utc.tz_convert("Asia/Kolkata")
print("India time:")
print(ts_ind)`;
const exp6c = `import pandas as pd

p = pd.Period("2024Q1")
print("Next period:")
print(p + 1)
print("Quarter converted to month-end frequency:")
print(p.asfreq("M", "end"))`;
const exp6d = `import pandas as pd
import numpy as np

ts = pd.Series(
    np.random.randn(100),
    index=pd.date_range("2024-01-01", periods=100)
)
# Use 'ME' (month-end) frequency for modern Pandas
ts_monthly = ts.resample("ME").mean()
print("Monthly mean values:")
print(ts_monthly)`;

const exp6e = `import pandas as pd

p = pd.Period("2026-01", freq="M")
print("Original monthly period:")
print(p)
print("\\nMonthly to daily (start):")
print(p.asfreq("D", how="start"))
print("\\nMonthly to daily (end):")
print(p.asfreq("D", how="end"))

period_index = pd.period_range(start="2026-01", periods=3, freq="M")
print("\\nOriginal PeriodIndex:")
print(period_index)
print("\\nPeriodIndex to daily (start):")
print(period_index.asfreq("D", how="start"))
print("\\nPeriodIndex to daily (end):")
print(period_index.asfreq("D", how="end"))`;

const exp6f = `import pandas as pd

dates = pd.to_datetime(["2026-01-10", "2026-02-15", "2026-03-20", "2026-04-25"])
sales = pd.Series([1000, 1500, 1800, 2200], index=dates)
print("Original Series:")
print(sales)
print("\\nSeries converted to monthly periods:")
print(sales.to_period("M"))

df = pd.DataFrame(
    {"Sales": [1000, 1500, 1800, 2200], "Profit": [200, 300, 400, 500]},
    index=dates
)
print("\\nDataFrame converted to monthly periods:")
print(df.to_period("M"))`;

const exp6g = `import pandas as pd

dates = pd.date_range("2026-01-01 00:00", periods=12, freq="h")
values = [10, 12, 15, 14, 18, 20, 22, 21, 25, 28, 30, 32]
ts = pd.Series(values, index=dates)
print("Original hourly time series:")
print(ts)

print("\\nResampling - 3-hour mean:")
print(ts.resample("3h").mean())

print("\\nDownsampling - 4-hour sum:")
print(ts.resample("4h").sum())

print("\\nUpsampling - 30-minute intervals:")
print(ts.resample("30min").asfreq())

print("\\nUpsampling with forward fill:")
print(ts.resample("30min").ffill())`;

const exp7a = `import pandas as pd

data = {
    "Name": ["Ravi", "Sita", "Arun", "Priya", "Kiran", "Anil", "Lakshmi", "Rahul"],
    "Department": ["CSE", "CSE", "ECE", "ECE", "CSE", "ECE", "CSE", "ECE"],
    "Year": [2, 2, 3, 3, 2, 3, 3, 2],
    "Marks": [85, 90, 78, 88, 75, 82, 95, 70]
}
df = pd.DataFrame(data)
print("Original DataFrame:")
print(df)

print("\\nGroup by Department:")
for department, group in df.groupby("Department"):
    print(f"\\nDepartment: {department}")
    print(group)
print("\\nAverage marks by Department:")
print(df.groupby("Department")["Marks"].mean())

print("\\nGroup by Department and Year:")
for key, group in df.groupby(["Department", "Year"]):
    print(f"\\nGroup: {key}")
    print(group)
print("\\nAverage marks by Department and Year:")
print(df.groupby(["Department", "Year"])["Marks"].mean())`;

const exp7b = `import pandas as pd

data = {
    "Department": ["CSE", "CSE", "CSE", "ECE", "ECE", "ECE", "EEE", "EEE", "EEE"],
    "Marks": [80, 75, 85, 70, 65, 75, 90, 85, 95],
    "Attendance": [90, 85, 95, 80, 75, 85, 95, 90, 100]
}
df = pd.DataFrame(data)
print("Original DataFrame:")
print(df)

summary = df.groupby("Department").aggregate({
    "Marks": ["sum", "mean", "std"],
    "Attendance": ["sum", "mean", "std"]
})
print("\\nSummary statistics:")
print(summary)`;

const exp7c = `import pandas as pd

# Prefer the bundled Iris dataset for fast, offline execution.
import os
if os.path.exists("iris.csv"):
    df = pd.read_csv("iris.csv")
else:
    try:
        df = pd.read_csv("https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv")
    except Exception:
        df = pd.DataFrame({
            "sepal_length": [5.1, 4.9, 4.7, 6.4, 6.9, 5.5, 6.5, 6.3, 5.8],
            "sepal_width": [3.5, 3.0, 3.2, 3.2, 3.1, 2.3, 3.0, 2.5, 2.7],
            "petal_length": [1.4, 1.4, 1.3, 4.5, 4.9, 4.0, 5.2, 5.0, 5.1],
            "petal_width": [0.2, 0.2, 0.2, 1.5, 1.5, 1.3, 2.0, 1.9, 1.9],
            "species": ["setosa"] * 3 + ["versicolor"] * 3 + ["virginica"] * 3
        })

print("First 5 records:")
print(df.head())
print("\\nDataset information:")
df.info()
print("\\nStatistical summary:")
print(df.describe())

print("\\nGroupBy using a single column:")
print(df.groupby("species")["sepal_length"].agg(
    ["count", "sum", "mean", "std", "min", "max"]
))

print("\\nGroupBy using multiple columns:")
print(df.groupby(["species", "sepal_width"])["sepal_length"].mean().head(15))

print("\\nSummary statistics by species:")
print(df.groupby("species").agg({
    "sepal_length": ["mean", "std", "min", "max"],
    "sepal_width": ["mean", "std", "min", "max"],
    "petal_length": ["mean", "std", "min", "max"],
    "petal_width": ["mean", "std", "min", "max"]
}))

print("\\nNumber of records in each species:")
print(df["species"].value_counts())
print("\\nAverage petal length by species:")
print(df.groupby("species")["petal_length"].mean())
print("\\nAverage petal width by species:")
print(df.groupby("species")["petal_width"].mean())
print("\\nMaximum sepal length by species:")
print(df.groupby("species")["sepal_length"].max())`;

const exp8a = `from bs4 import BeautifulSoup
import pandas as pd
import os

# Experiment 8A: Web Scraping Product Reviews using Beautiful Soup
# Reads authorized/saved reviews.html and extracts title, review text, and rating

html_file = "reviews.html"
if not os.path.exists(html_file):
    print("reviews.html not found, using default sample HTML.")
    html_content = \"\"\"<div class="review">
        <div class="review-title">Great product</div>
        <div class="rating">5 out of 5</div>
        <div class="review-text">Excellent quality! Works like a charm and very durable. I am extremely satisfied with this purchase.</div>
    </div>
    <div class="review">
        <div class="review-title">Not satisfied</div>
        <div class="rating">2 out of 5</div>
        <div class="review-text">The product stopped working after three days. Very poor build and terrible customer service.</div>
    </div>
    <div class="review">
        <div class="review-title">Worth buying</div>
        <div class="rating">4 out of 5</div>
        <div class="review-text">Good performance and decent battery life. Fast delivery and nice packaging. Satisfied!</div>
    </div>\"\"\"
else:
    with open(html_file, "r", encoding="utf-8") as file:
        html_content = file.read()

soup = BeautifulSoup(html_content, "html.parser")
review_blocks = soup.select(".review")

records = []
for block in review_blocks:
    review_element = block.select_one(".review-text")
    rating_element = block.select_one(".rating")
    title_element = block.select_one(".review-title")

    review_text = review_element.get_text(" ", strip=True) if review_element else ""
    rating_text = rating_element.get_text(" ", strip=True) if rating_element else ""
    title = title_element.get_text(" ", strip=True) if title_element else ""

    if review_text:
        records.append({
            "title": title,
            "review": review_text,
            "rating": rating_text
        })

df = pd.DataFrame(records)
df.to_csv("product_reviews.csv", index=False, encoding="utf-8-sig")

print(df.head())
print("\\nTotal reviews extracted:", len(df))
print("Saved to product_reviews.csv")`;

const exp8bi = `import pandas as pd
import matplotlib.pyplot as plt
import os
try:
    from wordcloud import WordCloud
except ImportError:
    from server.wordcloud import WordCloud
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

# Experiment 8B(i): WordCloud Generation for All, Positive, and Negative Reviews

# Ensure product_reviews.csv exists
if not os.path.exists("product_reviews.csv"):
    df_init = pd.DataFrame({
        "title": ["Great product", "Not satisfied", "Worth buying", "Waste of money", "Outstanding performance"],
        "review": [
            "Excellent quality! Works like a charm and very durable. Extremely satisfied.",
            "The product stopped working after three days. Very poor build and terrible customer service.",
            "Good performance and decent battery life. Fast delivery and nice packaging.",
            "Bad experience. Broken on arrival and unusable. Cheap plastic parts.",
            "Amazing device! Exceeded my expectations. Beautiful design, super fast, and wonderful display."
        ],
        "rating": ["5 out of 5", "2 out of 5", "4 out of 5", "1 out of 5", "5 out of 5"]
    })
    df_init.to_csv("product_reviews.csv", index=False)

df = pd.read_csv("product_reviews.csv")
df["review"] = df["review"].fillna("").astype(str)

analyzer = SentimentIntensityAnalyzer()

def classify_sentiment(text):
    score = analyzer.polarity_scores(text)["compound"]
    if score >= 0.05:
        return "Positive"
    elif score <= -0.05:
        return "Negative"
    return "Neutral"

df["sentiment"] = df["review"].apply(classify_sentiment)

def generate_wordcloud(text, title, filename):
    if not text.strip():
        print(f"No text available for: {title}")
        return

    cloud = WordCloud(
        width=700,
        height=350,
        background_color="white",
        max_words=100,
        collocations=False
    ).generate(text)
    
    plt.figure(figsize=(8, 4))
    plt.imshow(cloud, interpolation="bilinear")
    plt.axis("off")
    plt.title(title, fontsize=16, fontweight="bold", pad=12)
    plt.tight_layout()
    plt.savefig(filename, dpi=100, bbox_inches="tight")
    plt.show()

# 1. All reviews
all_text = " ".join(df["review"])
generate_wordcloud(all_text, "WordCloud - All Reviews", "wordcloud_all.png")

# 2. Positive reviews
positive_text = " ".join(df.loc[df["sentiment"] == "Positive", "review"])
generate_wordcloud(positive_text, "WordCloud - Positive Reviews", "wordcloud_positive.png")

# 3. Negative reviews
negative_text = " ".join(df.loc[df["sentiment"] == "Negative", "review"])
generate_wordcloud(negative_text, "WordCloud - Negative Reviews", "wordcloud_negative.png")

df.to_csv("product_reviews_analyzed.csv", index=False)
print("Sentiment counts:")
print(df["sentiment"].value_counts())
print("WordCloud images saved successfully.")`;

const exp8bii = `import re
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from collections import Counter
import os

# Experiment 8B(ii): Distribution of Stopwords, Numerics, Word Count, Character Count, and Avg Word Length

# Built-in stopword list avoids a slow NLTK corpus download on first run.
if not os.path.exists("product_reviews.csv"):
    df_init = pd.DataFrame({
        "title": ["Great product", "Not satisfied", "Worth buying"],
        "review": [
            "Excellent quality with 10 days battery life and 100 percent satisfaction.",
            "Defective 2 items received out of 5 ordered. Completely broken.",
            "Good value for 2026. Highly recommended!"
        ],
        "rating": ["5 out of 5", "1 out of 5", "4 out of 5"]
    })
    df_init.to_csv("product_reviews.csv", index=False)

df = pd.read_csv("product_reviews.csv")
df["review"] = df["review"].fillna("").astype(str)

stop_words = set("a an the and or but if while is are was were be been being have has had do does did of to in on for with as by from at this that it its i you he she we they my your our their not very really so too can could will would should".split())

def analyze_review(text):
    tokens = re.findall(r"\\b[\\w']+\\b", text.lower())
    words = re.findall(r"\\b[A-Za-z]+\\b", text)
    numeric_tokens = re.findall(r"\\b\\d+(?:\\.\\d+)?\\b", text)

    stopword_tokens = [token for token in tokens if token in stop_words]

    return pd.Series({
        "word_count": len(tokens),
        "character_count": len(text),
        "numeric_count": len(numeric_tokens),
        "stopword_count": len(stopword_tokens),
        "average_word_length": (
            sum(len(word) for word in words) / len(words)
            if words else 0
        )
    })

statistics = df["review"].apply(analyze_review)
df = pd.concat([df, statistics], axis=1)

df.to_csv("review_statistics.csv", index=False)

columns = [
    ("stopword_count", "Stopword Count"),
    ("numeric_count", "Numeric Token Count"),
    ("word_count", "Word Count"),
    ("character_count", "Character Count"),
    ("average_word_length", "Average Word Length")
]

fig, axes = plt.subplots(3, 2, figsize=(14, 15))
axes = axes.flatten()

for i, (column, title) in enumerate(columns):
    sns.histplot(data=df, x=column, kde=True, ax=axes[i], bins=15, color="#7c3aed")
    axes[i].set_title(title, fontweight="bold")
    axes[i].set_xlabel(title)
    axes[i].set_ylabel("Number of Reviews")

axes[-1].axis("off")
plt.tight_layout()
plt.savefig("review_statistics_distributions.png", dpi=140)
plt.show()

all_tokens = re.findall(r"\\b[\\w']+\\b", " ".join(df["review"]).lower())
stopword_frequency = Counter(token for token in all_tokens if token in stop_words)

print("Top 10 stopwords:")
print(stopword_frequency.most_common(10))

print("\\nDescriptive statistics:")
print(df[[
    "stopword_count",
    "numeric_count",
    "word_count",
    "character_count",
    "average_word_length"
]].describe())`;

const exp8biii = `import pandas as pd
import os
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer as StandaloneVADER

# Experiment 8B(iii): Display sentiment scores. Do not download NLTK corpora at runtime.
try:
    import nltk
    from nltk.sentiment.vader import SentimentIntensityAnalyzer as NLTKVADER
    try:
        nltk.data.find("sentiment/vader_lexicon.zip")
        nltk_analyzer = NLTKVADER()
    except LookupError:
        nltk_analyzer = StandaloneVADER()
        print("NLTK VADER lexicon is not cached; using the bundled VADER lexicon fallback.")
except Exception:
    nltk_analyzer = StandaloneVADER()
    print("NLTK VADER unavailable; using the bundled VADER lexicon fallback.")

if not os.path.exists("product_reviews.csv"):
    df_init = pd.DataFrame({
        "title": ["Great", "Bad", "Okay"],
        "review": ["The product is excellent.", "The quality is terrible.", "The product is okay."],
        "rating": ["5 out of 5", "1 out of 5", "3 out of 5"]
    })
    df_init.to_csv("product_reviews.csv", index=False)

df = pd.read_csv("product_reviews.csv")
df["review"] = df["review"].fillna("").astype(str)

vader_analyzer = StandaloneVADER()

def classify(score):
    if score >= 0.05:
        return "Positive"
    elif score <= -0.05:
        return "Negative"
    return "Neutral"

# NLTK VADER scores
nltk_scores = df["review"].apply(nltk_analyzer.polarity_scores)
df["nltk_positive"] = nltk_scores.apply(lambda x: x["pos"])
df["nltk_negative"] = nltk_scores.apply(lambda x: x["neg"])
df["nltk_neutral"] = nltk_scores.apply(lambda x: x["neu"])
df["nltk_compound"] = nltk_scores.apply(lambda x: x["compound"])

# Standalone VADER scores
vader_scores = df["review"].apply(vader_analyzer.polarity_scores)
df["vader_positive"] = vader_scores.apply(lambda x: x["pos"])
df["vader_negative"] = vader_scores.apply(lambda x: x["neg"])
df["vader_neutral"] = vader_scores.apply(lambda x: x["neu"])
df["vader_compound"] = vader_scores.apply(lambda x: x["compound"])

df["nltk_sentiment"] = df["nltk_compound"].apply(classify)
df["vader_sentiment"] = df["vader_compound"].apply(classify)

# Display sample results
print(df[[
    "review",
    "nltk_compound",
    "nltk_sentiment",
    "vader_compound",
    "vader_sentiment"
]].head(10).to_string(index=False))

print("\\nNLTK sentiment distribution:")
print(df["nltk_sentiment"].value_counts())

print("\\nStandalone VADER sentiment distribution:")
print(df["vader_sentiment"].value_counts())

df.to_csv("sentiment_analysis_results.csv", index=False)
print("\\nResults saved to sentiment_analysis_results.csv")`;

const exp8biv = `import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import os

# Experiment 8B(iv): Create Scatter Intensity Plot of Sentiments

# Ensure sentiment_analysis_results.csv exists
if not os.path.exists("sentiment_analysis_results.csv"):
    df_seed = pd.DataFrame({
        "review": [
            "Excellent quality! Highly recommended.",
            "The product stopped working after 3 days. Terrible.",
            "Good performance and fast delivery.",
            "Broken on arrival, waste of money.",
            "Super fast, wonderful display, loved it!",
            "Mediocre quality, expected better.",
            "Terrific value for money.",
            "Worst online shopping experience ever."
        ],
        "vader_compound": [0.82, -0.65, 0.74, -0.71, 0.88, -0.15, 0.68, -0.78],
        "vader_sentiment": ["Positive", "Negative", "Positive", "Negative", "Positive", "Negative", "Positive", "Negative"]
    })
    df_seed.to_csv("sentiment_analysis_results.csv", index=False)

df = pd.read_csv("sentiment_analysis_results.csv")

df["vader_compound"] = pd.to_numeric(df["vader_compound"], errors="coerce")
df = df.dropna(subset=["vader_compound"]).reset_index(drop=True)

df["review_index"] = range(1, len(df) + 1)

palette = {
    "Positive": "green",
    "Negative": "red",
    "Neutral": "gray"
}

plt.figure(figsize=(14, 7))

sns.scatterplot(
    data=df,
    x="review_index",
    y="vader_compound",
    hue="vader_sentiment",
    palette=palette,
    s=85,
    alpha=0.85
)

# Sentiment classification thresholds
plt.axhline(y=0.05, color="green", linestyle="--", label="Positive threshold (0.05)")
plt.axhline(y=-0.05, color="red", linestyle="--", label="Negative threshold (-0.05)")
plt.axhline(y=0, color="black", linestyle=":", label="Neutral reference (0.0)")

plt.ylim(-1.05, 1.05)
plt.xlabel("Review Index", fontsize=12, fontweight="bold")
plt.ylabel("VADER Compound Sentiment Score", fontsize=12, fontweight="bold")
plt.title("Sentiment Intensity Scatter Plot of Product Reviews", fontsize=15, fontweight="bold", pad=12)
plt.legend(loc="best")
plt.grid(alpha=0.25)
plt.tight_layout()

plt.savefig("sentiment_intensity_scatter.png", dpi=140)
plt.show()

print("Scatter intensity plot saved successfully as sentiment_intensity_scatter.png.")`;

const exp9a = `import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.cluster import KMeans

# Offline sample customer dataset: no external CSV download required.
df = pd.DataFrame({
    "CustomerID": range(1, 21),
    "Annual Income (k$)": [15, 18, 20, 22, 25, 28, 30, 35, 38, 42, 48, 52, 58, 62, 70, 75, 80, 85, 95, 110],
    "Spending Score (1-100)": [39, 81, 6, 77, 40, 76, 6, 75, 35, 61, 28, 59, 20, 68, 18, 73, 12, 82, 16, 90]
})
features = df[["Annual Income (k$)", "Spending Score (1-100)"]]
model = KMeans(n_clusters=4, random_state=42, n_init=10)
df["Cluster"] = model.fit_predict(features)
print("Customer segment counts:")
print(df["Cluster"].value_counts().sort_index())
print("\\nCustomer sample with assigned segments:")
print(df.head(10).to_string(index=False))
sns.scatterplot(data=df, x="Annual Income (k$)", y="Spending Score (1-100)", hue="Cluster", palette="tab10", s=90)
plt.title("Customer Segments (K-Means)")
plt.tight_layout()
plt.show()`;

const exp9b = `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

# Small offline customer personality dataset for a fast, repeatable demonstration.
rng = np.random.default_rng(42)
centers = [(35, 80, 500), (75, 35, 1200), (25, 25, 180), (90, 85, 1800)]
rows = []
for income, wine, total in centers:
    for _ in range(8):
        rows.append({
            "Income": max(10, income + rng.normal(0, 7)),
            "MntWines": max(0, wine + rng.normal(0, 9)),
            "MntFruits": max(0, total * 0.08 + rng.normal(0, 15)),
            "MntMeatProducts": max(0, total * 0.45 + rng.normal(0, 25)),
            "MntFishProducts": max(0, total * 0.10 + rng.normal(0, 10)),
            "MntSweetProducts": max(0, total * 0.08 + rng.normal(0, 8)),
            "MntGoldProds": max(0, total * 0.12 + rng.normal(0, 12))
        })
df = pd.DataFrame(rows)
features = ["Income", "MntWines", "MntFruits", "MntMeatProducts", "MntFishProducts", "MntSweetProducts", "MntGoldProds"]
data = df[features].fillna(df[features].median())
scaler = StandardScaler()
X = scaler.fit_transform(data)

scores = {}
for k in range(2, 6):
    labels = KMeans(n_clusters=k, random_state=42, n_init=5).fit_predict(X)
    scores[k] = silhouette_score(X, labels)
best_k = max(scores, key=scores.get)
model = KMeans(n_clusters=best_k, random_state=42, n_init=5)
df["Customer_Segment"] = model.fit_predict(X)
print("Silhouette scores by K:", {k: round(v, 3) for k, v in scores.items()})
print("Selected cluster count:", best_k)
print("\\nAverage customer profile by segment:")
print(df.groupby("Customer_Segment")[features].mean().round(2))
sns.scatterplot(data=df, x="Income", y="MntWines", hue="Customer_Segment", palette="Set2", s=75)
plt.title("Customer Personality Segments")
plt.tight_layout()
plt.show()
df.to_csv("customer_segments.csv", index=False)
print("\\nSaved customer_segments.csv")`;

const exp10a = `from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB

# Small labelled dataset: runs locally without downloading a corpus.
texts = [
    "I am happy today", "This is a wonderful day", "I feel cheerful and excited",
    "I am angry", "This makes me furious", "I hate this situation",
    "I feel sad", "I am lonely and disappointed", "I miss my family",
    "I love this so much", "You mean everything to me", "I adore this"
]
labels = ["happy", "happy", "happy", "anger", "anger", "anger", "sadness", "sadness", "sadness", "love", "love", "love"]
vectorizer = CountVectorizer()
X = vectorizer.fit_transform(texts)
model = MultinomialNB()
model.fit(X, labels)
examples = ["I am so happy today", "I am furious", "I miss my family", "I love this"]
for text in examples:
    predicted = model.predict(vectorizer.transform([text]))[0]
    print(f"Text: {text}\\nPredicted emotion: {predicted}\\n")`;

const exp10b = `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report

# Balanced sample data makes this experiment fully runnable offline.
data = {
    "text": [
        "I am very happy today", "This is a wonderful day", "I feel cheerful and excited",
        "I am sad and lonely", "I feel very disappointed", "I miss my family so much",
        "I am angry with you", "This makes me furious", "I hate this situation",
        "I am scared of the dark", "I am afraid of losing", "I feel nervous and frightened",
        "I love you so much", "You mean everything to me", "I adore spending time with you",
        "Wow this is unbelievable", "I did not expect this surprise", "What an amazing unexpected gift"
    ],
    "emotion": [
        "happy", "happy", "happy", "sadness", "sadness", "sadness",
        "anger", "anger", "anger", "fear", "fear", "fear",
        "love", "love", "love", "surprise", "surprise", "surprise"
    ]
}
df = pd.DataFrame(data)
X_train, X_test, y_train, y_test = train_test_split(
    df["text"], df["emotion"], test_size=0.33, random_state=42, stratify=df["emotion"]
)
model = Pipeline([
    ("tfidf", TfidfVectorizer(ngram_range=(1, 2))),
    ("classifier", LogisticRegression(max_iter=300, random_state=42))
])
model.fit(X_train, y_train)
predictions = model.predict(X_test)
print("Test Accuracy:", round(accuracy_score(y_test, predictions) * 100, 2), "%")
print("\\nClassification Report:")
print(classification_report(y_test, predictions, zero_division=0))
emoji_map = {"happy": "😊", "sadness": "😢", "anger": "😠", "fear": "😨", "love": "❤️", "surprise": "😲"}
def detect_emotion(text):
    emotion = model.predict([text])[0]
    print(f"Input Text: {text}\\nDetected Emotion: {emotion}\\nRelevant Emoji: {emoji_map[emotion]}\\n")
for message in ["I am happy to see you", "I feel lonely today", "I love my family", "I am afraid of this"]:
    detect_emotion(message)`;

function sub(id,name,description,code,technologies){return {id,name,description,code,output:"",outputImages:[],technologies,date:"2026",status:"Published"}}
export const INITIAL_EXPERIMENTS = [
  {id:1,number:1,name:"Working with Different Data Formats using Pandas",description:"A practical exploration of CSV, JSON, and Excel data handling with Pandas, including reading, writing, parsing, and working with multiple sheets.",coverImage:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",date:"2026",status:"Published",technologies:["Python","Pandas"],code:"",output:"",outputImages:[],subExperiments:[sub("1A","CSV File Handling","Read an online CSV dataset, write CSV output, and work with tab-delimited student data.",csvCode,["Python","Pandas","CSV"]),sub("1B","JSON File Handling","Create JSON records, read JSON files, parse JSON text, and consume JSON data from an API.",jsonCode,["Python","Pandas","JSON","API"]),sub("1C","Excel File Handling","Write and read Excel files, create multiple worksheets, and load all sheets with Pandas.",excelCode,["Python","Pandas","Excel","OpenPyXL"])]},
  {id:2,number:2,name:"Working with APIs and SQLite Databases",description:"Access live JSON data through a REST API and perform basic database creation, querying, updating, and deletion with SQLite and Pandas.",coverImage:"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=80",date:"2026",status:"Published",technologies:["Python","Requests","SQLite","Pandas"],code:"",output:"",outputImages:[],subExperiments:[sub("2A","Working with a REST API","Retrieve GitHub issue data through an API and convert the JSON response into a Pandas DataFrame.",exp2a,["Python","Requests","Pandas","REST API"]),sub("2B","SQLite Database Operations","Create a SQLite table, insert records, query them with Pandas, then update and delete a record.",exp2b,["Python","SQLite","SQL","Pandas"])]},
  {id:3,number:3,name:"Data Cleaning and Preprocessing",description:"Prepare raw data by identifying missing values, removing duplicates, encoding categories, detecting outliers, and performing simple text splitting.",coverImage:"https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&w=1400&q=80",date:"2026",status:"Published",technologies:["Python","Pandas","NumPy","Regex"],code:"",output:"",outputImages:[],subExperiments:[sub("3A","Missing Values and Duplicates","Inspect missing-value masks, remove incomplete rows, fill missing values, and remove duplicate records.",exp3a,["Python","Pandas","NumPy"]),sub("3B","Categorical Encoding","Map categorical gender values to numeric labels and rename a DataFrame column.",exp3b,["Python","Pandas"]),sub("3C","Outlier Detection","Identify observations outside a simple ±3 standard-deviation-style threshold in random data.",exp3c,["Python","Pandas","NumPy"]),sub("3D","Text Splitting with Regular Expressions","Split text into tokens using whitespace matching with Python regular expressions.",exp3d,["Python","Regex"])]},
  {id:4,number:4,name:"Advanced Pandas Operations",description:"Explore hierarchical indexing, reshaping with stack and unstack, and combining complementary DataFrames with Pandas.",coverImage:"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80",date:"2026",status:"Published",technologies:["Python","Pandas","NumPy"],code:"",output:"",outputImages:[],subExperiments:[sub("4A","MultiIndex Series","Create and query a hierarchical Pandas Series using two index levels.",exp4a,["Python","Pandas","NumPy"]),sub("4B","Stack and Unstack","Reshape a MultiIndex Series into a DataFrame and stack it back into a Series.",exp4b,["Python","Pandas","NumPy"]),sub("4C","Combine First","Fill missing values in one DataFrame using values from another DataFrame.",exp4c,["Python","Pandas","NumPy"])]},
  {id:5,number:5,name:"Data Visualization with Matplotlib and Seaborn",description:"Create common analytical plots including line, bar, histogram, scatter, and box plots and view the generated figures directly in the lab.",coverImage:"https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=1400&q=80",date:"2026",status:"Published",technologies:["Python","Matplotlib","Seaborn"],code:"",output:"",outputImages:[],subExperiments:[sub("5A","Line Plot","Create a simple line chart with labels, title, and grid.",exp5a,["Python","Matplotlib"]),sub("5B","Bar Plot","Compare categorical values using a Pandas bar plot.",exp5b,["Python","Pandas","Matplotlib"]),sub("5C","Histogram and Density Plot","Visualize a random distribution with a histogram and KDE curve.",exp5c,["Python","Seaborn","Matplotlib"]),sub("5D","Scatter Plot","Visualize the relationship between two random numerical variables.",exp5d,["Python","NumPy","Matplotlib"]),sub("5E","Box Plot","Summarize distributions across multiple variables with a Seaborn box plot.",exp5e,["Python","Seaborn","Matplotlib"])]},
  {id:6,number:6,name:"Time Series Analysis",description:"Create and manipulate timestamp-indexed data, generate date ranges, work with time zones and periods, convert periods and timestamps between frequencies, and perform resampling, downsampling, and upsampling.",coverImage:"https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1400&q=80",date:"2026",status:"Published",technologies:["Python","Pandas","Time Series"],code:"",output:"",outputImages:[],subExperiments:[sub("6A","Create a Time Series Using Datetime Objects","Create a Pandas Series indexed by timestamps.",exp6a,["Python","Pandas","Datetime"]),sub("6B","Generate Date Ranges and Work with Time Zones","Generate timestamps, localize a timezone, convert to another timezone, and combine timezone-aware series.",exp6b,["Python","Pandas","Timezone"]),sub("6C","Period Arithmetic and Period Ranges","Add and subtract integers from Period objects and create a range using period_range().",exp6c,["Python","Pandas","Period"]),sub("6D","Basic Time Series Resampling","Resample time-series observations and calculate monthly mean values.",exp6d,["Python","Pandas","Resampling"]),sub("6E","Convert Periods and PeriodIndex to Another Frequency","Use asfreq() to convert Period and PeriodIndex objects to another frequency, selecting the start or end of each period.",exp6e,["Python","Pandas","PeriodIndex","asfreq()"]),sub("6F","Convert Timestamp-Indexed Series and DataFrames to Periods","Use to_period() to convert timestamp indexes in Series and DataFrames into periods.",exp6f,["Python","Pandas","Series","DataFrame","to_period()"]),sub("6G","Resampling, Downsampling, and Upsampling","Resample hourly data, aggregate larger intervals, and upsample to 30-minute intervals with optional forward filling.",exp6g,["Python","Pandas","Resampling","Time Series"])]},
  {id:7,number:7,name:"Data Aggregation",description:"Group tabular data using single or multiple keys, calculate grouped summary statistics, and perform exploratory data analysis on an online dataset.",coverImage:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",date:"2026",status:"Published",technologies:["Python","Pandas","GroupBy","Aggregation","EDA"],code:"",output:"",outputImages:[],subExperiments:[sub("7A","Group Data Using Single and Multiple Keys","Create a DataFrame, group records by one or multiple keys, select groups, and calculate average marks.",exp7a,["Python","Pandas","DataFrame","groupby()"]),sub("7B","Compute Summary Statistics Using Aggregation","Calculate sum, mean, and standard deviation for Marks and Attendance grouped by department.",exp7b,["Python","Pandas","aggregate()","Statistics"]),sub("7C","GroupBy and Exploratory Data Analysis on an Online Dataset","Load the online Iris dataset, inspect and summarize it, group by one or multiple columns, and calculate species-level statistics.",exp7c,["Python","Pandas","Online Dataset","GroupBy","EDA"])]},
  {id:8,number:8,name:"Web Scraping and Exploratory Data Analysis of Product Reviews",description:"Extract product reviews from web pages using Beautiful Soup, perform NLP text analysis, generate WordClouds for positive and negative reviews, compute text statistics distributions, and perform VADER sentiment analysis.",coverImage:"https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",date:"2026",status:"Published",technologies:["Python","BeautifulSoup4","NLTK","VADER","WordCloud","Pandas","Seaborn"],code:"",output:"",outputImages:[],subExperiments:[
    sub("8A","Extract Product Reviews with Beautiful Soup","Extract customer review titles, bodies, and ratings from an authorized HTML source using Beautiful Soup and save to CSV.",exp8a,["Python","BeautifulSoup4","Pandas","Web Scraping"]),
    sub("8B(i)","WordCloud Analysis for Reviews","Classify reviews using VADER compound polarity and generate WordCloud visualizations for all, positive, and negative reviews.",exp8bi,["Python","WordCloud","VADER","Matplotlib"]),
    sub("8B(ii)","Text Statistics and Distributions","Calculate stopword count, numeric count, word count, character count, and average word length, and plot their frequency distributions.",exp8bii,["Python","NLTK","Seaborn","Regex","Statistics"]),
    sub("8B(iii)","Sentiment Analysis using NLTK and VADER","Calculate positive, negative, neutral, and compound scores and compare sentiment categories using NLTK VADER and standalone VADER.",exp8biii,["Python","NLTK","VADER","Sentiment Analysis"]),
    sub("8B(iv)","Scatter Intensity Plot of Sentiments","Visualize the distribution and strength of review sentiments across the dataset with horizontal threshold boundaries.",exp8biv,["Python","Seaborn","Matplotlib","Data Visualization"])
  ]},
  {id:9,number:9,name:"Customer Personality Analysis",description:"Analyze customer income and spending patterns, use K-Means clustering to discover customer segments, compare cluster quality with silhouette scores, and interpret profiles for targeted marketing. Uses bundled sample data for reliable offline execution.",coverImage:"https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80",date:"2026",status:"Published",technologies:["Python","Pandas","Scikit-learn","K-Means","Seaborn"],code:"",output:"",outputImages:[],subExperiments:[sub("9A","Customer Segmentation with K-Means","Cluster customers by annual income and spending score, then visualize the resulting groups. The bundled sample data avoids external downloads.",exp9a,["Python","Pandas","Scikit-learn","K-Means","Visualization"]),sub("9B","Customer Personality Analysis with StandardScaler","Standardize income and product spending features, evaluate cluster counts with silhouette scores, summarize customer segments, and plot segment profiles.",exp9b,["Python","Pandas","StandardScaler","K-Means","Silhouette Score"])]},
  {id:10,number:10,name:"Text Emotion Detection",description:"Train lightweight machine-learning models to classify emotion in short messages and display a matching emoji. Both examples use small labelled datasets bundled in the code, so no dataset downloads are required.",coverImage:"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80",date:"2026",status:"Published",technologies:["Python","NLP","Scikit-learn","Naive Bayes","TF-IDF","Logistic Regression"],code:"",output:"",outputImages:[],subExperiments:[sub("10A","Text Emotion Classification with Naive Bayes","Convert text into word-count features and train a Multinomial Naive Bayes classifier to predict happy, anger, sadness, and love labels.",exp10a,["Python","CountVectorizer","MultinomialNB","NLP"]),sub("10B","TF-IDF Emotion Detection with Emoji Prediction","Train a TF-IDF and Logistic Regression pipeline, evaluate its classification report, and predict an emotion and corresponding emoji for new text.",exp10b,["Python","TF-IDF","Logistic Regression","Emoji Prediction"])]}
];

export const INITIAL_PROJECTS = [
  {
    id: "stock-day-tracker",
    number: 1,
    title: "Stock Day Tracker",
    tagline: "NSE/BSE Market Intelligence & Day-by-Day Price Movement Analytics",
    category: "FinTech & Real-Time Analytics",
    status: "Completed",
    date: "2026",
    coverImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1400&q=80",
    technologies: ["React.js", "JavaScript", "Node.js", "Express.js", "Vite", "Market Data APIs"],
    description: "Developed a stock market tracking web application that displays day-by-day price movements of NSE/BSE stocks through interactive weekly and monthly views. Implemented watchlists, stock search, price change and percentage tracking, heatmap visualization, and stock detail charts. Designed a modular market data architecture supporting simulated data and external market data providers, with caching to improve efficiency.",
    keyFeatures: [
      "Interactive weekly and monthly views displaying day-by-day price movements of NSE/BSE stocks.",
      "Customizable watchlists with instant stock search and real-time ticker tracking.",
      "High-contrast price change metrics with green/red percentage tracking and volume signals.",
      "Dynamic sector heatmap visualization for rapid cross-market sector performance analysis.",
      "Detailed stock breakdown charts with moving averages, OHLCV data, and time-frame zoom.",
      "Modular market data architecture with automated fallback between live external APIs and simulated feeds.",
      "Multi-level in-memory data caching layer with TTL expiration for high throughput and reduced latency."
    ],
    architecture: "Vite + React.js frontend interface with modular data hooks, coupled with an Express.js backend caching proxy layer communicating with external Market Data APIs and in-memory cache stores.",
    githubUrl: "https://github.com/bapathisharanya28",
    liveDemoUrl: "https://github.com/bapathisharanya28",
    highlights: [
      { label: "Market Feeds", value: "NSE / BSE Real-time" },
      { label: "Data Caching", value: "In-Memory TTL Cache" },
      { label: "Visualizations", value: "Heatmap & OHLCV" },
      { label: "Architecture", value: "Modular Provider Proxy" }
    ]
  },
  {
    id: "civic-issue-reporting-platform",
    number: 2,
    title: "Civic Issue Reporting Platform (CivicConnect)",
    tagline: "Full-Stack Civic Grievance Management, Role-Based Redressal & Resolution Analytics",
    category: "GovTech & Civic Services",
    status: "Completed",
    date: "2026",
    coverImage: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1400&q=80",
    technologies: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "SQLite", "JWT"],
    description: "Developed a full-stack civic grievance management platform that enables citizens to report public issues and track their resolution status. Implemented role-based access for citizens, government officials, and administrators, including complaint assignment, status updates, activity timelines, and feedback submission. Integrated JWT-based authentication, password hashing, and an SQLite database to manage users, complaints, and administrative analytics.",
    keyFeatures: [
      "Citizen public grievance submission with geo-tagging, categorisation, and multimedia uploads.",
      "Role-Based Access Control (RBAC) securely separating Citizens, Government Officials, and System Administrators.",
      "Dynamic complaint assignment engine routing issues to relevant department officers based on jurisdiction.",
      "Live status progression (Submitted → Under Review → Assigned → In Progress → Resolved → Closed).",
      "Interactive activity timeline displaying transparent chronological audit trails of official actions.",
      "Citizen feedback and star-rating mechanism upon issue resolution for accountability.",
      "Stateless JWT-based authentication paired with Bcrypt salted cryptographic password hashing.",
      "Normalized SQLite relational schema managing users, grievances, department allocations, and audit logs.",
      "Administrative analytics dashboard with SLA turnaround tracking and department resolution charts."
    ],
    architecture: "Full-stack client-server platform powered by Node.js and Express.js REST endpoints, SQLite relational database layer with foreign key cascades, and stateless JWT token authentication middleware.",
    githubUrl: "https://github.com/bapathisharanya28",
    liveDemoUrl: "https://github.com/bapathisharanya28",
    highlights: [
      { label: "Access Control", value: "Role-Based (Citizen/Official/Admin)" },
      { label: "Security", value: "JWT + Salted Bcrypt" },
      { label: "Database", value: "SQLite Relational Engine" },
      { label: "Tracking", value: "Audited Activity Timeline" }
    ]
  }
];

export const DATA_VERSION = "ds-syllabus-v8";
const STORAGE_KEYS = { 
  PROFILE: "ds_lab_profile", 
  MODULES: "ds_lab_modules", 
  EXPERIMENTS: "ds_lab_experiments", 
  PROJECTS: "ds_lab_projects",
  THEME: "ds_lab_theme", 
  VERSION: "ds_lab_data_version" 
};

export function loadStoredData() {
  let profile = INITIAL_STUDENT_PROFILE;
  let modules = INITIAL_MODULES;
  let experiments = INITIAL_EXPERIMENTS;
  let projects = INITIAL_PROJECTS;
  let theme = 'dark';
  try {
    const savedProfile = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (savedProfile) {
      profile = JSON.parse(savedProfile);
      if (profile.avatar === LEGACY_DEFAULT_AVATAR) {
        profile = { ...profile, avatar: idCardPhoto };
      }
    }
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
    if (savedTheme) theme = savedTheme;
    const savedVersion = localStorage.getItem(STORAGE_KEYS.VERSION);
    const savedModules = localStorage.getItem(STORAGE_KEYS.MODULES);
    const savedExperiments = localStorage.getItem(STORAGE_KEYS.EXPERIMENTS);
    const savedProjects = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    // Preserve existing user edits while adding any newly seeded experiments/sub-experiments.
    if (savedModules) {
      const storedModules = JSON.parse(savedModules);
      modules = storedModules.map((stored) => {
        const seeded = INITIAL_MODULES.find((m) => m.number === stored.number || m.id === stored.id);
        const storedPdfs = stored.pdfs && stored.pdfs.length ? stored.pdfs : (seeded?.pdfs || []);
        return { ...seeded, ...stored, pdfs: storedPdfs };
      });
    }
    if (savedProjects) projects = JSON.parse(savedProjects);
    if (savedExperiments) {
      const storedExperiments = JSON.parse(savedExperiments);
      experiments = storedExperiments.map((stored) => {
        const seeded = INITIAL_EXPERIMENTS.find((item) => item.number === stored.number);
        if (!seeded) return stored;
        const storedSubs = stored.subExperiments || [];
        const missingSubs = (seeded.subExperiments || []).filter(
          (seedSub) => !storedSubs.some((storedSub) => storedSub.id === seedSub.id)
        );
        return { ...seeded, ...stored, subExperiments: [...storedSubs, ...missingSubs] };
      });
      const missingExperiments = INITIAL_EXPERIMENTS.filter(
        (seeded) => !experiments.some((stored) => stored.number === seeded.number)
      );
      experiments = [...experiments, ...missingExperiments];
    }
    localStorage.setItem(STORAGE_KEYS.VERSION, DATA_VERSION);
  } catch (err) { console.error('Error reading localStorage:', err); }
  return { profile, modules, experiments, projects, theme };
}

export function saveStoredData({ profile, modules, experiments, projects, theme }) {
  try {
    if (profile) localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    if (modules) localStorage.setItem(STORAGE_KEYS.MODULES, JSON.stringify(modules));
    if (experiments) localStorage.setItem(STORAGE_KEYS.EXPERIMENTS, JSON.stringify(experiments));
    if (projects) localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    if (theme) localStorage.setItem(STORAGE_KEYS.THEME, theme);
    localStorage.setItem(STORAGE_KEYS.VERSION, DATA_VERSION);
  } catch (err) { console.error('Error saving to localStorage:', err); }
}
