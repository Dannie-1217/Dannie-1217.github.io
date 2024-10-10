# Assignment 3: Introduction to Data Visualization with Vega-Lite
**Due Date:** 

[Link to Assignment on GitHub](https://github.com/SIAT-IAT-355/A3-Intro-to-vegalite)

## Objective

In this assignment, you will create data visualizations using **Vega-Lite**. You will explore video game sales data and produce insightful visualizations to analyze trends, relationships, and patterns. The goal is to apply your knowledge of visualization design principles and get hands-on experience with Vega-Lite.

### Getting Started with Vega-Lite
- You will use the **`datasets/videogames_wide.csv`** and **`datasets/videogames_long.csv`** for this assignment. Both datasets contain the same data, but one of them makes your life easier. Choose the dataset that best suits your needs.


### There are three main parts:

1. **Describe the dataset**: Summarize the data and variables to understand the context of the visualizations.
2. **Create visualizations and embed them in your website**: Design multiple visualizations to explore patterns in the data.
3. **Describe why your visualization choices were made**: Explain the reasoning behind your design choices.


### The Dataset
The dataset is a collection of video game sales data, with the following columns:

1. **Name**: The title of the video game.
2. **Platform**: The gaming platform on which the game was released (e.g., Wii, NES).
3. **Year**: The year the game was released.
4. **Genre**: The genre of the video game (e.g., Sports, Platform, Racing).
5. **Publisher**: The publisher of the game (e.g., Nintendo).
6. **NA_Sales**: Sales in North America (in millions of units).
7. **EU_Sales**: Sales in Europe (in millions of units).
8. **JP_Sales**: Sales in Japan (in millions of units).
9. **Other_Sales**: Sales in other regions (in millions of units).
10. **Global_Sales**: Total global sales (in millions of units).


### 1. Describe the Data
For each variable in the dataset, describe the **data type** and provide a summary of the key statistics:
- Data types include categories such as numerical, categorical, ordinal, etc.
- Summarize insights like the average global sales, most frequent genres, most popular platforms, and anything else you find significant.


### 2. Create 4 Visual Explorations Using Vega-Lite

- **Visualization 1**: **Global Sales by Genre and Platform**
  - Create a visualization to explore global sales by genre and platform.
  - **Reflection**: What trends do you notice? What’s interesting in the data? Are there certain platforms or genres that dominate the sales?

- **Visualization 2**: **Sales Over Time by Platform and Genre**
  - Visualize sales trends over time, focusing on platforms and genres.
  - **Reflection**: How have video game sales changed for different platforms, genres, and publishers?

- **Visualization 3**: **Regional Sales vs. Platform**
  - Compare the sales between different regions (NA, EU, JP, and Others) by platform.
  - **Reflection**: Do you notice any regional preferences or patterns? Which platforms are more popular in specific regions?

- **Visualization 4**: **Tell Us a Visual Story**
  - Now that you’ve explored the dataset, create a visualization that highlights a pattern or story you find interesting.
  - **Reflection**: This is intentionally open-ended. Focus on a specific area that piques your interest, such as sales trends in Japan, a focus on specific publishers, or how certain genres perform across regions. Feel free to get creative!

 ### 3. Describe Your Design Choices
For each of your visualizations, briefly describe why you chose the specific visualization type, how it helps convey the data effectively, and any interesting design choices you made.

### 4. Submission Instructions

- **You will make two submissions**:
  1. **Website Link**: 
     - You will create and deliver your visualizations in your website using **HTML, CSS, and JavaScript**. You can explore and create your visualizations in **Observable**.
     - Submit the **link** to your website.
  2. **PDF Report**:
     - Submit a PDF document that describes your design choices for each visualization. Reflect on the decisions you made, based on the lectures and principles covered in class.
     - The PDF should include the rationale behind your design choices.
     - **PDF Report:** `IAT355_Assignment3_FirstNameLastName.pdf`
     

### Tips:
- Use the provided **helper files** (`index.html`, `style.css`, `vis.js`) to kickstart your project.
- Feel free to ask questions on Discord and Google how to do things.


### You can explore **Vega-Lite** through the following resources:

- **UW Vega-Lite Course**: You can learn most things about Vega-Lite from this comprehensive [UW Vega-Lite course on Observable](https://observablehq.com/@jonfroehlich/observable-tutorial?collection=@jonfroehlich/intro-to-vega-lite).
  
- **Vega-Lite Documentation**: The official [Vega-Lite Documentation](https://vega.github.io/vega-lite/docs/) is a great reference for understanding the available features and how to implement them.

- **Vega-Lite API Examples**: Explore some great Vega-Lite API examples in this [collection on Observable](https://observablehq.com/collection/@vega/vega-lite-api).

- **Visualization Curriculum Collection**: You can also explore another [amazing collection of lessons](https://observablehq.com/collection/@uwdata/visualization-curriculum) for deeper insights into visualization design.

