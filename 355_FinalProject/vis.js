//----------------------------------------------------------first-------------------------------------------------

// // Data validation function
// function validateAndParse(value, defaultValue = 0) {
//   const parsedValue = parseFloat(value);
//   return isNaN(parsedValue) || !isFinite(parsedValue) ? defaultValue : parsedValue;
// }

// // Data loading and transformation
// async function loadDataAndRender() {
//   // Load Wage data
//   const wageData = await d3.csv("./dataset/wages.csv");
//   console.log("Raw Wage Data:", wageData);

//   // Transform Wage data into long format and reorder years
//   const transformedWageData = [];
//   wageData.forEach((row) => {
//     ["2021", "2020", "2019"].forEach((year) => {
//       transformedWageData.push({
//         "Row Labels": row["Row Labels"] || "Unknown",
//         Year: year,
//         Wage: validateAndParse(row[year]),
//       });
//     });
//   });
//   console.log("Transformed Wage Data (Reversed):", transformedWageData);

//   // Load CPI data
//   const cpiData = await d3.csv("./dataset/cpi.csv");
//   console.log("Raw CPI Data:", cpiData);

//   // Transform CPI data into growth rate format
//   const transformedCPIData = [];
//   cpiData.forEach((row) => {
//     const baseValue = validateAndParse(row["2019"]); // 2019 baseline value
//     ["2019", "2020", "2021"].forEach((year) => {
//       const cpiValue = validateAndParse(row[year]);
//       const growthRate = baseValue ? ((cpiValue - baseValue) / baseValue) * 100 : 0; // Calculate growth rate
//       transformedCPIData.push({
//         Category: row["Category"] || "Unknown",
//         Year: year,
//         GrowthRate: growthRate, // Growth rate
//       });
//     });
//   });
//   console.log("Transformed CPI Growth Rate Data:", transformedCPIData);

//   // Load Quintile data
//   const quintileData = await d3.csv("./dataset/final_cleaned_quintiles.csv");
//   console.log("Raw Quintile Data:", quintileData);

//   // Transform Quintile data into spending share format
//   const quintileColumns = [
//     "Lowest quintile",
//     "Second quintile",
//     "Third quintile",
//     "Fourth quintile",
//     "Highest quintile",
//   ];
//   const processedQuintileData = [];
//   quintileColumns.forEach((quintile) => {
//     const totalSpending = d3.sum(quintileData, (d) => validateAndParse(d[quintile]));
//     quintileData.forEach((row) => {
//       processedQuintileData.push({
//         Quintile: quintile,
//         Category: row["Category"],
//         Percentage: (validateAndParse(row[quintile]) / totalSpending) * 100,
//       });
//     });
//   });
//   console.log("Processed Quintile Data:", processedQuintileData);

//   // Calculate data for the fourth chart
//   const finalData = [];
//   quintileColumns.forEach((quintile) => {
//     const totalWeightedCPI = quintileData
//       .map((row) => {
//         const category = row["Category"];
//         const consumptionShare = validateAndParse(row[quintile]) / d3.sum(quintileData, (d) => validateAndParse(d[quintile]));
//         const cpiGrowthRate = transformedCPIData.find((c) => c.Category === category && c.Year === "2021")?.GrowthRate || 0;
//         return consumptionShare * cpiGrowthRate;
//       })
//       .reduce((a, b) => a + b, 0);

//     wageData.forEach((row) => {
//       const wageGrowthRate = ((validateAndParse(row["2021"]) - validateAndParse(row["2019"])) / validateAndParse(row["2019"])) * 100;
//       const wageAverage = (validateAndParse(row["2019"]) + validateAndParse(row["2020"]) + validateAndParse(row["2021"])) / 3;

//       finalData.push({
//         Profession: row["Row Labels"],
//         Quintile: quintile,
//         "Wage Growth Rate": wageGrowthRate,
//         "Weighted CPI Growth Rate": totalWeightedCPI,
//         "Wage Average": wageAverage,
//         Impact: wageGrowthRate - totalWeightedCPI,
//         Color: wageGrowthRate > totalWeightedCPI ? "green" : "red",
//       });
//     });
//   });
//   console.log("Final Data for Visualization 4:", finalData);

//   // Render the first chart
//   await render1(transformedWageData);

//   // Render the second chart
//   await render2(transformedCPIData);

//   // Render the third chart
//   await render3(processedQuintileData);

//   // Render the fourth chart
//   await render4(finalData);
// }

// // Rendering function for the first chart
// async function render1(transformedWageData) {
//   const sortedData = transformedWageData
//     .reduce((acc, row) => {
//       const existing = acc.find(r => r["Row Labels"] === row["Row Labels"]);
//       if (existing) {
//         existing.TotalWage += row.Wage;
//       } else {
//         acc.push({ ...row, TotalWage: row.Wage });
//       }
//       return acc;
//     }, [])
//     .sort((a, b) => a.TotalWage - b.TotalWage) // Sort industries by total wage
//     .map(row => row["Row Labels"]);

//   const vlSpec = vl
//     .markBar({ opacity: 0.7 })
//     .data(transformedWageData)
//     .title("Wage Growth by Industry (2019, 2020, 2021)")
//     .encode(
//       vl.x().fieldN("Row Labels").title("Industry").sort(vl.fieldQ(sortedData)),
//       vl.y().fieldQ("Wage").title("Wage ($)").stack("zero"),
//       vl.color().fieldN("Year").title("Year").scale({ scheme: "tableau10" }).sort(["2019", "2020", "2021"]),
//       vl.tooltip(["Row Labels", "Year", "Wage"])
//     )
//     .width(600)
//     .height(400)
//     .toSpec();

//   vegaEmbed("#view1", vlSpec);
// }

// // Rendering function for the second chart
// async function render2(transformedCPIData) {
//   const vlSpec = vl
//     .markLine({ point: true })
//     .data(transformedCPIData)
//     .title("CPI Growth Rate by Category (2019 as Base)")
//     .encode(
//       vl.x().fieldN("Year").title("Year").sort(["2019", "2020", "2021"]),
//       vl.y().fieldQ("GrowthRate").title("Growth Rate (%)"),
//       vl.color().fieldN("Category").title("Category"),
//       vl.tooltip(["Category", "Year", "GrowthRate"])
//     )
//     .width(500)
//     .height(400)
//     .toSpec();

//   vegaEmbed("#view2", vlSpec);
// }

// // Rendering function for the third chart
// async function render3(processedQuintileData) {
//   const vlSpec = vl
//     .markArc()
//     .data(processedQuintileData)
//     .title("Household Spending Distribution by Quintile")
//     .encode(
//       vl.theta().fieldQ("Percentage"),
//       vl.color().fieldN("Category").title("Category"),
//       vl.facet().fieldN("Quintile").columns(3),
//       vl.tooltip(["Quintile", "Category", "Percentage"])
//     )
//     .width(150)
//     .height(150)
//     .toSpec();

//   vegaEmbed("#view3", vlSpec);
// }

// // Rendering function for the fourth chart
// async function render4(finalData) {
//   const vlSpec = vl
//     .markCircle({ stroke: "black", strokeWidth: 1 })
//     .data(finalData)
//     .title("Weighted CPI Growth vs Wage Growth by Profession")
//     .encode(
//       vl.x().fieldQ("Wage Growth Rate").title("Wage Growth Rate (%)"),
//       vl.y().fieldQ("Weighted CPI Growth Rate").title("Weighted CPI Growth Rate (%)"),
//       vl.size().fieldQ("Wage Average").scale({ range: [10, 500] }).title("Average Wage ($)"),
//       vl.color().fieldN("Color").title("Impact"),
//       vl.tooltip(["Profession", "Quintile", "Wage Growth Rate", "Weighted CPI Growth Rate", "Impact", "Wage Average"])
//     )
//     .width(800)
//     .height(600)
//     .toSpec();

//   vegaEmbed("#view4", vlSpec);
// }

// // Execute data loading and rendering
// loadDataAndRender();

//----------------------------------------------------------second-------------------------------------------------

// // Data validation function
// function validateAndParse(value, defaultValue = null) {
//   const parsedValue = parseFloat(value);
//   return isNaN(parsedValue) || !isFinite(parsedValue)
//     ? defaultValue
//     : parsedValue;
// }

// // Define the mapping of original categories to major categories
// const categoryMapping = {
//   // Map your original categories to major categories
//   "Food at home": "Food",
//   "Food away from home": "Food",
//   "Alcoholic beverages": "Food",
//   "Housing": "Housing",
//   "Household furnishings and equipment": "Housing",
//   "Apparel and services": "Apparel",
//   "Transportation": "Transportation",
//   "Healthcare": "Healthcare",
//   "Entertainment": "Entertainment",
//   "Personal care": "Personal Care",
//   "Education": "Education",
//   "Personal insurance and pensions": "Finance",
//   // Add all your category mappings
// };

// // Function to group categories
// function groupCategory(category) {
//   return categoryMapping[category] || category || "Others";
// }

// // Define quintileColumns globally
// const quintileColumns = [
//   "Lowest quintile",
//   "Second quintile",
//   "Third quintile",
//   "Fourth quintile",
//   "Highest quintile",
// ];

// // Mapping between wage quintiles and consumption quintiles
// const wageQuintileMapping = {
//   "Quintile 1": "Lowest quintile",
//   "Quintile 2": "Second quintile",
//   "Quintile 3": "Third quintile",
//   "Quintile 4": "Fourth quintile",
//   "Quintile 5": "Highest quintile",
// };

// // Category name mapping between consumption data and CPI data
// const categoryNameMapping = {
//   // Total categories
//   "Total expenditure": "All-items",
//   "Total current consumption": "All-items",
//   // Food
//   "Food expenditures": "Food 7",
//   "Food purchased from stores": "Food 7",
//   "Food purchased from restaurants": "Food 7",
//   // Shelter
//   "Shelter": "Shelter 8",
//   "Principal accommodation": "Shelter 8",
//   "Rented living quarters": "Shelter 8",
//   "Owned living quarters": "Shelter 8",
//   "Water, fuel and electricity for principal accommodation": "Shelter 8",
//   "Other accommodation": "Shelter 8",
//   // Household operations
//   "Household operations": "Household operations, furnishings and equipment",
//   "Communications": "Household operations, furnishings and equipment",
//   // Household furnishings and equipment
//   "Household furnishings and equipment": "Household operations, furnishings and equipment",
//   "Household furnishings": "Household operations, furnishings and equipment",
//   "Household equipment": "Household operations, furnishings and equipment",
//   "Household appliances": "Household operations, furnishings and equipment",
//   // Clothing and accessories
//   "Clothing and accessories": "Clothing and footwear",
//   // Transportation
//   "Transportation": "Transportation",
//   "Private transportation": "Transportation",
//   "Public transportation": "Transportation",
//   // Health care and personal care
//   "Health care": "Health and personal care",
//   "Direct health care costs to household": "Health and personal care",
//   "Personal care": "Health and personal care",
//   // Recreation and education
//   "Recreation": "Recreation, education and reading",
//   "Recreational equipment and related services": "Recreation, education and reading",
//   "Home entertainment equipment and services": "Recreation, education and reading",
//   "Recreational services": "Recreation, education and reading",
//   "Recreational vehicles and associated services": "Recreation, education and reading",
//   "Education": "Recreation, education and reading",
//   "Reading materials and other printed matter": "Recreation, education and reading",
//   // Tobacco, alcohol, and others
//   "Tobacco products, alcoholic beverages and cannabis for non-medical use": "Alcoholic beverages, tobacco products and recreational cannabis",
//   "Games of chance": "Alcoholic beverages, tobacco products and recreational cannabis",
//   // Miscellaneous expenditures
//   "Miscellaneous expenditures": "All-items excluding food and energy 9",
//   // Personal insurance and pensions
//   "Personal insurance payments and pension contributions": "All-items excluding food and energy 9",
//   // Gifts and contributions
//   "Gifts of money, support payments and charitable contributions": "All-items excluding food and energy 9",
//   // Energy
//   "Gasoline": "Gasoline",
//   // Add other necessary mappings
// };

// // Data loading and transformation
// async function loadDataAndRender() {
//   // Load Wage data
//   const wageData = await d3.csv("./dataset/wages.csv");
//   console.log("Raw Wage Data:", wageData);

//   // Transform Wage data into long format and reorder years
//   const transformedWageData = [];
//   wageData.forEach((row) => {
//     ["2021", "2020", "2019"].forEach((year) => {
//       transformedWageData.push({
//         "Row Labels": row["Row Labels"] || "Unknown",
//         Year: year,
//         Wage: validateAndParse(row[year], 0),
//       });
//     });
//   });
//   console.log("Transformed Wage Data (Reversed):", transformedWageData);

//   // Load raw CPI data from the CSV file
//   const cpiData = await d3.csv("./dataset/cpi.csv");
//   console.log("Raw CPI Data:", cpiData);

//   // Initialize an array to store the transformed CPI data
//   const transformedCPIData = [];

//   // Process each row in the raw CPI data
//   cpiData.forEach((row) => {
//     const baseValue = validateAndParse(row["2019"], null);

//     ["2019", "2020", "2021", "2022", "2023"].forEach((year) => {
//       const cpiValue = validateAndParse(row[year], null);
//       let growthRate = null;

//       if (
//         baseValue !== null &&
//         baseValue !== 0 &&
//         isFinite(baseValue) &&
//         cpiValue !== null &&
//         isFinite(cpiValue)
//       ) {
//         growthRate = ((cpiValue - baseValue) / baseValue) * 100;
//       }

//       transformedCPIData.push({
//         Category: row["Category"] || "Unknown",
//         Year: year,
//         GrowthRate: growthRate,
//       });
//     });
//   });
//   console.log("Transformed CPI Growth Rate Data:", transformedCPIData);

//   // Standardize category names in CPI data
//   transformedCPIData.forEach((d) => {
//     d.Category = d.Category.trim();
//   });

//   // Load Quintile data
//   const quintileData = await d3.csv("./dataset/final_cleaned_quintiles.csv");
//   console.log("Raw Quintile Data:", quintileData);

//   // Standardize category names in consumption data
//   quintileData.forEach((d) => {
//     d.Category = d.Category.trim();
//   });

//   // Update processedQuintileData with grouped categories (Top 4 categories)
//   const processedQuintileData = [];
//   quintileColumns.forEach((quintile) => {
//     const totalSpending = d3.sum(quintileData, (d) =>
//       validateAndParse(d[quintile], 0)
//     );

//     // Aggregate spending by major categories
//     const aggregatedData = {};
//     quintileData.forEach((row) => {
//       const majorCategory = groupCategory(row["Category"]);
//       const spending = validateAndParse(row[quintile], 0);

//       if (!aggregatedData[majorCategory]) {
//         aggregatedData[majorCategory] = 0;
//       }
//       aggregatedData[majorCategory] += spending;
//     });

//     // Convert aggregated data to array and handle 'Others' category
//     let aggregatedArray = Object.entries(aggregatedData).map(
//       ([category, spending]) => ({
//         Quintile: quintile,
//         Category: category,
//         Spending: spending,
//       })
//     );

//     // Sort categories by spending and limit to top 4 categories
//     aggregatedArray.sort((a, b) => b.Spending - a.Spending);
//     const topCategories = aggregatedArray.slice(0, 4);
//     const otherCategories = aggregatedArray.slice(4);

//     // Sum 'Others' spending
//     const othersSpending = otherCategories.reduce(
//       (sum, item) => sum + item.Spending,
//       0
//     );

//     // Reconstruct the final data array
//     const finalAggregatedData = topCategories;
//     if (othersSpending > 0) {
//       finalAggregatedData.push({
//         Quintile: quintile,
//         Category: "Others",
//         Spending: othersSpending,
//       });
//     }

//     // Calculate percentages
//     finalAggregatedData.forEach((item) => {
//       processedQuintileData.push({
//         Quintile: quintile,
//         Category: item.Category,
//         Percentage: (item.Spending / totalSpending) * 100,
//       });
//     });
//   });

//   console.log("Processed Quintile Data (Grouped):", processedQuintileData);

//   // Calculate weighted CPI growth rate for each consumption quintile
//   const quintileWeightedCPI = {};

//   quintileColumns.forEach((quintile) => {
//     // Calculate total consumption for the quintile
//     const totalConsumption = d3.sum(quintileData, (d) =>
//       validateAndParse(d[quintile], 0)
//     );

//     let weightedCPI = 0;

//     quintileData.forEach((d) => {
//       const consumptionCategory = d["Category"];
//       const consumptionAmount = validateAndParse(d[quintile], 0);
//       const consumptionShare = consumptionAmount / totalConsumption;

//       // Use category name mapping
//       let cpiCategory = categoryNameMapping[consumptionCategory];

//       if (!cpiCategory) {
//         console.warn(
//           `No CPI category mapping found for consumption category: ${consumptionCategory}`
//         );
//         // Map to "All-items" if no specific mapping is found
//         cpiCategory = "All-items";
//       }

//       let cpiGrowthRate = transformedCPIData.find(
//         (c) => c.Category === cpiCategory && c.Year === "2021"
//       )?.GrowthRate;

//       if (cpiGrowthRate === undefined || cpiGrowthRate === null) {
//         console.warn(`No CPI growth rate found for category: ${cpiCategory}`);
//         // Use "All-items" growth rate as default
//         cpiGrowthRate = transformedCPIData.find(
//           (c) => c.Category === "All-items" && c.Year === "2021"
//         )?.GrowthRate;

//         if (cpiGrowthRate === undefined || cpiGrowthRate === null) {
//           console.error("All-items CPI growth rate not found.");
//           return; // Skip this category if growth rate is not available
//         }
//       }

//       // Convert cpiGrowthRate to decimal
//       const cpiGrowthRateDecimal = cpiGrowthRate / 100;

//       const contribution = consumptionShare * cpiGrowthRateDecimal;
//       weightedCPI += contribution;

//       // Debug output
//       console.log(
//         `Quintile: ${quintile}, Consumption Category: ${consumptionCategory}, CPI Category: ${cpiCategory}, Consumption Share: ${(
//           consumptionShare * 100
//         ).toFixed(2)}%, CPI Growth Rate: ${cpiGrowthRate}%, Contribution to Weighted CPI: ${(
//           contribution * 100
//         ).toFixed(4)}%`
//       );
//     });

//     // Convert weightedCPI back to percentage
//     quintileWeightedCPI[quintile] = weightedCPI * 100;

//     // For debugging
//     console.log(
//       `Weighted CPI for ${quintile}: ${quintileWeightedCPI[quintile].toFixed(
//         2
//       )}%`
//     );
//   });

//   console.log("Quintile Weighted CPI:", quintileWeightedCPI);

//   // Calculate average wage for each profession
//   wageData.forEach((row) => {
//     const wage2019 = validateAndParse(row["2019"], null);
//     const wage2020 = validateAndParse(row["2020"], null);
//     const wage2021 = validateAndParse(row["2021"], null);

//     const avgWage =
//       [wage2019, wage2020, wage2021]
//         .filter((d) => d !== null)
//         .reduce((a, b) => a + b, 0) /
//       [wage2019, wage2020, wage2021].filter((d) => d !== null).length;

//     row["Average Wage"] = avgWage;
//   });

//   // Sort wage data by average wage and assign wage quintiles
//   const sortedWageData = wageData
//     .filter((d) => d["Average Wage"] !== null)
//     .sort((a, b) => a["Average Wage"] - b["Average Wage"]);

//   const wageQuintileSize = Math.floor(sortedWageData.length / 5);
//   sortedWageData.forEach((row, index) => {
//     const quintileIndex = Math.min(Math.floor(index / wageQuintileSize), 4);
//     row["Wage Quintile"] = `Quintile ${quintileIndex + 1}`;
//   });

//   // Prepare finalData for visualization 4
//   const finalData = [];
//   sortedWageData.forEach((row) => {
//     const profession = row["Row Labels"];
//     const wage2019 = validateAndParse(row["2019"], null);
//     const wage2021 = validateAndParse(row["2021"], null);

//     let wageGrowthRate = null;
//     if (wage2019 !== null && wage2019 !== 0 && wage2021 !== null) {
//       wageGrowthRate = ((wage2021 - wage2019) / wage2019) * 100;
//     } else {
//       wageGrowthRate = 0;
//     }

//     const avgWage = row["Average Wage"];
//     const wageQuintile = row["Wage Quintile"];

//     // Find weighted CPI growth rate for the corresponding consumption quintile
//     const consumptionQuintile = wageQuintileMapping[wageQuintile];
//     const weightedCPI = quintileWeightedCPI[consumptionQuintile];

//     // Determine the impact color
//     const impactColor = wageGrowthRate > weightedCPI ? "green" : "red";

//     finalData.push({
//       Profession: profession,
//       "Wage Growth Rate": wageGrowthRate,
//       "Weighted CPI Growth Rate": weightedCPI,
//       "Average Wage": avgWage,
//       "Wage Quintile": wageQuintile,
//       Color: impactColor,
//     });
//   });

//   console.log("Final Data for Visualization 4:", finalData);

//   // Render the first chart
//   await render1(newWageData);

//   // Render the second chart
//   await render2(transformedCPIData);

//   // Render the third chart
//   await render3(processedQuintileData, quintileData);

//   // Render the fourth chart
//   await render4(finalData);
// }

// //-----------------------------------------------------------------------------
// // const newWageData = await d3.csv("./dataset/Book12.csv");
// // console.log("newWageData: ",newWageData);

// // async function render1(newWageData) {
// //   // Ensure Wage_Growth_Rate is a number
// //   newWageData.forEach(d => {
// //     d["Wage_Growth_Rate"] = parseFloat(d["Wage_Growth_Rate"]);
// //   });

// //   // Find the overall min and max Wage_Growth_Rate for all years
// //   const allRates = newWageData.map(d => d.Wage_Growth_Rate);
// //   const yMin = Math.floor(Math.min(...allRates));
// //   const yMax = Math.ceil(Math.max(...allRates)); 
// //   // Define Vega-Lite specification
// //   const vlSpec = {
// //     $schema: "https://vega.github.io/schema/vega-lite/v5.json",
// //     title: "Wage Growth Rate by Classification and Year",
// //     data: { values: newWageData },
// //     width: 600,
// //     height: 400,
// //     mark: { type: "bar", opacity: 1 },
// //     encoding: {
// //       x: {
// //         field: "North American Industry Classification System (NAICS)",
// //         type: "nominal",
// //         title: "Classification",
// //         axis: { labelAngle: -45 },
// //       },   
// //       y: {
// //         field: "Wage_Growth_Rate",
// //         type: "quantitative",
// //         title: "Wage Growth Rate (%)",
// //         stack: null,
// //         scale: { domain: [yMin, yMax] } 
// //       },
// //       color: {
// //         field: "Year",
// //         type: "nominal",
// //         title: "Year",
// //         scale: {
// //           domain: ["2019", "2020", "2021"], 
// //           // range: ["#b3cde0", "#6497b1", "#005b96"] 
// //           range: ["#b3cde0", "#6497b1", "#004675"] 
// //         },
// //         legend: {
// //           orient: "right",
// //           symbolType: "square",
// //           symbolSize: 100,
// //           title:"Year (Interactive)",
// //         }
// //       },
// //       order: {
// //         field: "Wage_Growth_Rate", 
// //         type: "quantitative",
// //         sort: "descending" 
// //       },
// //       tooltip: [
// //         { field: "North American Industry Classification System (NAICS)", type: "nominal" },
// //         { field: "Year", type: "nominal" },
// //         { field: "Wage", type: "quantitative" },
// //         { field: "Wage_Growth_Rate", type: "quantitative" }
// //       ]
// //     },
// //     selection: {
// //       yearSelection: {
// //         type: "multi",
// //         fields: ["Year"],
// //         bind: "legend"
// //       }
// //     },
// //     transform: [
// //       {
// //         filter: {
// //           selection: "yearSelection"
// //         }
// //       }
// //     ]
// //   };

// //   vegaEmbed("#view1", vlSpec);

  

// // }

// const newWageData = await d3.csv("./dataset/Book12.csv");
// console.log("newWageData: ", newWageData);

// async function render1(newWageData) {
//   // Ensure Wage is a number
//   newWageData.forEach(d => {
//     d["Wage"] = parseFloat(d["Wage"]);
//   });

//   // Find the overall min and max Wage for all years
//   const allWages = newWageData.map(d => d.Wage);
//   const yMin = Math.floor(Math.min(...allWages));
//   const yMax = Math.ceil(Math.max(...allWages)); 
//   // Define Vega-Lite specification
//   const vlSpec = {
//     $schema: "https://vega.github.io/schema/vega-lite/v5.json",
//     title: "Wage by Classification and Year",
//     data: { values: newWageData },
//     width: 700,
//     height: 400,
//     mark: { type: "bar", opacity: 1, size:25},
//     encoding: {
//       x: {
//         field: "North American Industry Classification System (NAICS)",
//         type: "nominal",
//         title: "Classification",
//         axis: { labelAngle: -45 },
//         sort: {
//           field: "Wage", 
//           order: "descending"
//         }
//       },   
//       y: {
//         field: "Wage",
//         type: "quantitative",
//         title: "Wage ($)",
//         stack: null,
//         scale: { domain: [yMin, yMax] } ,
        
//       },
//       color: {
//         field: "Year",
//         type: "nominal",
//         title: "Year",
//         scale: {
//           domain: ["2019", "2020", "2021","2022","2023"], 
//           range: ["#DEDEDE","#b3cde0", "#6497b1", "#004675","#4DB1F4"] 
//         },
//         legend: {
//           orient: "right",
//           symbolType: "square",
//           symbolSize: 100,
//           title: "Year (Interactive)",
//         }
//       },
//       order: {
//         field: "Wage", 
//         type: "quantitative",
//         sort: "descending" 
//       },
//       tooltip: [
//         { field: "North American Industry Classification System (NAICS)", type: "nominal" },
//         { field: "Year", type: "nominal" },
//         { field: "Wage", type: "quantitative" }
//       ]
//     },
//     selection: {
//       yearSelection: {
//         type: "multi",
//         fields: ["Year"],
//         bind: "legend"
//       }
//     },
//     transform: [
//       {
//         filter: {
//           selection: "yearSelection"
//         }
//       }
//     ],
//   };

//   vegaEmbed("#view1", vlSpec);

// }


// //-----------------------------------------------------------------------------
// async function render2(transformedCPIData) {
//   const selection = vl
//     .selectMulti("CategorySelect")
//     .fields("Category")
//     .bind("legend");

//   const vlSpec = vl
//     .markLine({ point: true })
//     .data(transformedCPIData)
//     .title("CPI Growth Rate by Category (2019 as Base)")
//     .transform(
//       vl.filter("datum.GrowthRate != null && isFinite(datum.GrowthRate)")
//     )
//     .params(selection)
//     .encode(
//       vl.x().fieldN("Year").title("Year"),
//       vl.y().fieldQ("GrowthRate").title("Growth Rate (%)"),
//       vl.color().fieldN("Category").title("Category (Interactive)"),
//       vl.opacity().if(selection, vl.value(1)).value(0.1),
//       vl.tooltip(["Category", "Year", "GrowthRate"])
//     )
//     .width(700)
//     .height(400)
//     .toSpec();

//   await vegaEmbed("#view2", vlSpec, { renderer: "svg" });
// }

// // Rendering function for the third chart with drill-down functionality
// async function render3(processedQuintileData, quintileData) {
//   // Variable to track the current level and selected category
//   let currentLevel = "major"; // "major" or "sub"
//   let selectedCategory = null;
//   let previousDataStack = [];

//   // Function to render the chart
//   function renderChart(data) {
//     // Show or hide the back button
//     document.getElementById("backButton").style.display =
//       previousDataStack.length > 0 ? "block" : "none";

//     const vlSpec = vl
//       .markArc()
//       .data(data)
//       .title(
//         currentLevel === "major"
//           ? "Household Spending Distribution by Quintile (Slices are interactive)"
//           : `Breakdown of ${selectedCategory} Spending`
//       )
//       .encode(
//         vl.theta().fieldQ("Percentage"),
//         vl.color()
//           .fieldN("Category")
//           .title("Category")
//           .legend({ symbolLimit: 100 }),
//         vl.facet().fieldN("Quintile").columns(3),
//         vl.tooltip(["Quintile", "Category", "Percentage"])
//       )
//       .width(150)
//       .height(150)
//       .params(
//         vl
//           .selectSingle("sliceClick")
//           .encodings("color")
//           .on("click")
//           .clear(false)
//       )
//       .transform(vl.filter("datum.Percentage > 0"))
//       .toSpec();

//     vegaEmbed("#view3", vlSpec).then((result) => {
//       // Add click event listener
//       result.view.addEventListener("click", (event, item) => {
//         if (item && item.datum) {
//           // Save current data for navigation
//           previousDataStack.push({
//             data: data,
//             level: currentLevel,
//             category: selectedCategory,
//           });

//           // Update level and selected category
//           selectedCategory = item.datum.Category;

//           // Prepare sub-category data
//           const subCategoryData = getSubCategoryData(selectedCategory);

//           if (subCategoryData.length === 0) {
//             // No further subcategories, do not drill down
//             previousDataStack.pop(); // Remove the last state as we are not drilling down
//             return;
//           }

//           currentLevel = "sub";
//           renderChart(subCategoryData);
//         }
//       });
//     });
//   }

//   // Function to get sub-category data
//   function getSubCategoryData(parentCategory) {
//     const subCategoryData = [];
//     quintileColumns.forEach((quintile) => {
//       const totalSpending = d3.sum(quintileData, (d) => {
//         const category = d["Category"];
//         const majorCategory = groupCategory(category);
//         // Include only if category matches the parent category
//         if (parentCategory === "Others") {
//           if (!Object.values(categoryMapping).includes(majorCategory)) {
//             return validateAndParse(d[quintile], 0);
//           }
//         } else if (majorCategory === parentCategory) {
//           return validateAndParse(d[quintile], 0);
//         }
//         return 0;
//       });

//       // Aggregate subcategories
//       let subCategories = [];
//       quintileData.forEach((row) => {
//         const category = row["Category"];
//         const majorCategory = groupCategory(category);

//         if (parentCategory === "Others") {
//           if (!Object.values(categoryMapping).includes(majorCategory)) {
//             const spending = validateAndParse(row[quintile], 0);
//             subCategories.push({
//               Quintile: quintile,
//               Category: category,
//               Spending: spending,
//             });
//           }
//         } else if (majorCategory === parentCategory) {
//           const spending = validateAndParse(row[quintile], 0);
//           subCategories.push({
//             Quintile: quintile,
//             Category: category,
//             Spending: spending,
//           });
//         }
//       });

//       // Sort and limit to top 4 subcategories
//       subCategories.sort((a, b) => b.Spending - a.Spending);
//       const topSubCategories = subCategories.slice(0, 4);
//       const otherSubCategories = subCategories.slice(4);

//       // Sum 'Others' spending
//       const othersSpending = otherSubCategories.reduce(
//         (sum, item) => sum + item.Spending,
//         0
//       );

//       // Reconstruct the final data array
//       const finalSubCategories = topSubCategories;
//       if (othersSpending > 0) {
//         finalSubCategories.push({
//           Quintile: quintile,
//           Category: "Others",
//           Spending: othersSpending,
//         });
//       }

//       // Calculate percentages
//       finalSubCategories.forEach((item) => {
//         subCategoryData.push({
//           Quintile: quintile,
//           Category: item.Category,
//           Percentage: (item.Spending / totalSpending) * 100,
//         });
//       });
//     });

//     return subCategoryData;
//   }

//   // Add event listener to the back button
//   document.getElementById("backButton").addEventListener("click", () => {
//     if (previousDataStack.length > 0) {
//       const previousState = previousDataStack.pop();
//       currentLevel = previousState.level;
//       selectedCategory = previousState.category;
//       renderChart(previousState.data);
//     }
//   });

//   // Initially render the major categories chart
//   renderChart(processedQuintileData);
// }

// // Rendering function for the fourth chart with interactivity
// async function render4(finalData) {
//   // Create a dropdown for selecting Wage Quintile
//   const wageQuintiles = [
//     "Quintile 1",
//     "Quintile 2",
//     "Quintile 3",
//     "Quintile 4",
//     "Quintile 5",
//   ];

//   const selection = vl
//     .selectSingle("WageQuintileSelect")
//     .fields("Wage Quintile")
//     .init({ "Wage Quintile": "Quintile 1" })
//     .bind(vl.menu(wageQuintiles));

//   const vlSpec = vl
//     .markCircle({ stroke: "black", strokeWidth: 1 })
//     .data(finalData)
//     .title("Weighted CPI Growth vs Wage Growth by Profession")
//     .params(selection)
//     .transform(vl.filter(selection))
//     .encode(
//       vl.x().fieldQ("Wage Growth Rate").title("Wage Growth Rate (%)"),
//       vl
//         .y()
//         .fieldQ("Weighted CPI Growth Rate")
//         .title("Weighted CPI Growth Rate (%)"),
//       vl
//         .size()
//         .fieldQ("Average Wage")
//         .scale({ range: [10, 500] })
//         .title("Average Wage ($)"),
//       vl
//         .color()
//         .fieldN("Color")
//         .title("Impact")
//         .scale({ domain: ["green", "red"], range: ["green", "red"] }),
//       vl.tooltip([
//         "Profession",
//         "Wage Quintile",
//         "Wage Growth Rate",
//         "Weighted CPI Growth Rate",
//         "Average Wage",
//       ])
//     )
//     .width(600)
//     .height(400)
//     .toSpec();

//   await vegaEmbed("#view4", vlSpec);
// }

// // Execute data loading and rendering
// loadDataAndRender();







//----------------------------------------------------------third-------------------------------------------------

// Data validation function
function validateAndParse(value, defaultValue = null) {
  const parsedValue = parseFloat(value);
  return isNaN(parsedValue) || !isFinite(parsedValue) ? defaultValue : parsedValue;
}

// 类别映射
const categoryMappingTo14 = {
  "Total expenditure": "All-items",
  "Total current consumption": "All-items",

  "Food expenditures": "Food",
  "Food purchased from stores": "Food",
  "Food purchased from restaurants": "Food",

  "Shelter": "Shelter",
  "Principal accommodation": "Shelter",
  "Rented living quarters": "Shelter",
  "Owned living quarters": "Shelter",
  "Water, fuel and electricity for principal accommodation": "Shelter",
  "Other accommodation": "Shelter",

  "Household operations": "Household operations, furnishings and equipment",
  "Communications": "Household operations, furnishings and equipment",
  "Household furnishings and equipment": "Household operations, furnishings and equipment",
  "Household furnishings": "Household operations, furnishings and equipment",
  "Household equipment": "Household operations, furnishings and equipment",
  "Household appliances": "Household operations, furnishings and equipment",

  "Clothing and accessories": "Clothing and footwear",

  "Transportation": "Transportation",
  "Private transportation": "Transportation",
  "Public transportation": "Transportation",

  "Health care": "Health and personal care",
  "Direct health care costs to household": "Health and personal care",
  "Personal care": "Health and personal care",

  "Recreation": "Recreation, education and reading",
  "Recreational equipment and related services": "Recreation, education and reading",
  "Home entertainment equipment and services": "Recreation, education and reading",
  "Recreational services": "Recreation, education and reading",
  "Recreational vehicles and associated services": "Recreation, education and reading",
  "Education": "Recreation, education and reading",
  "Reading materials and other printed matter": "Recreation, education and reading",

  "Tobacco products, alcoholic beverages and cannabis for non-medical use": "Alcoholic beverages, tobacco products and recreational cannabis",
  "Games of chance": "Alcoholic beverages, tobacco products and recreational cannabis",

  "Miscellaneous expenditures": "All-items excluding food and energy",

  "Income taxes": "Services ",
  "Personal insurance payments and pension contributions": "Services",
  "Gifts of money, support payments and charitable contributions": "Services"
};

// 定义目标类别列表
const targetCategories = [
  "All-items",
  "Food",
  "Shelter",
  "Household operations, furnishings and equipment",
  "Clothing and footwear",
  "Transportation",
  "Gasoline",
  "Health and personal care",
  "Recreation, education and reading",
  "Alcoholic beverages, tobacco products and recreational cannabis",
  "All-items excluding food and energy",
  "All-items excluding energy",
  "Energy",
  "Goods",
  "Services"
];

async function loadDataAndRender() {
  // 五年数据2019～2023
  const wageYears = ["2019", "2020", "2021", "2022", "2023"];
  const cpiYears = ["2019", "2020", "2021", "2022", "2023"];

  // Load Wage data
  const wageData = await d3.csv("./dataset/wages.csv");
  console.log("Raw Wage Data:", wageData);

  // Transform Wage data
  const transformedWageData = [];
  wageData.forEach((row) => {
    wageYears.forEach((year) => {
      const wage = validateAndParse(row[year], null);
      if (wage !== null) {
        transformedWageData.push({
          Profession: row["Row Labels"] || "Unknown",
          Year: year,
          Wage: wage,
        });
      }
    });
  });
  console.log("Transformed Wage Data:", transformedWageData);

  // Load CPI data
  const cpiData = await d3.csv("./dataset/cpi.csv");
  console.log("Raw CPI Data:", cpiData);

  // Load Quintile data for computing weights
  const quintileData = await d3.csv("./dataset/final_cleaned_quintiles.csv");
  console.log("Raw Quintile Data:", quintileData);

  const quintileColumns = ["Lowest quintile", "Second quintile", "Third quintile", "Fourth quintile", "Highest quintile"];
  quintileData.forEach(d => {
    quintileColumns.forEach(col => {
      d[col] = validateAndParse(d[col], 0);
    });
  });

  // 将原始类别映射到14个大类并汇总消费金额
  const categorySum = {};
  quintileData.forEach(row => {
    const originalCat = row.Category;
    const mappedCat = categoryMappingTo14[originalCat];
    if(!mappedCat) {
      console.warn(`No mapping found for category: ${originalCat}, ignoring`);
      return;
    }
    const totalSpending = quintileColumns.reduce((acc,col)=>acc+row[col],0);
    if(!categorySum[mappedCat]) categorySum[mappedCat] = 0;
    categorySum[mappedCat] += totalSpending;
  });

  const totalConsumptionAll = Object.values(categorySum).reduce((acc,v)=>acc+v,0);
  const categoryWeights = {};
  for(const cat of targetCategories) {
    const val = categorySum[cat] || 0;
    categoryWeights[cat] = val/totalConsumptionAll;
  }

  console.log("Category Weights:", categoryWeights);

  // Prepare CPI Lookup
  const cpiLookup = {};
  cpiData.forEach(row => {
    const category = row["Category"]?.trim() || "Unknown";
    cpiYears.forEach(year => {
      const val = validateAndParse(row[year], null);
      if(val!==null) {
        cpiLookup[category] = cpiLookup[category] || {};
        cpiLookup[category][year] = val;
      }
    });
  });

  // Compute weighted CPI growth (2019为基准)
  function computeWeightedCPIGrowth(year) {
    if (year === "2019") return 0; // base year growth = 0
    let weightedSum = 0;
    for(const cat of targetCategories) {
      const weight = categoryWeights[cat] || 0;
      if(weight === 0) continue;
      const cpiCat = cpiLookup[cat];
      if (!cpiCat || cpiCat["2019"]===undefined || cpiCat[year]===undefined) {
        console.warn(`Missing CPI data for ${cat} in ${year}, using no contribution`);
        continue;
      }
      const baseVal = cpiCat["2019"];
      const currentVal = cpiCat[year];
      if(baseVal > 0 && isFinite(baseVal) && isFinite(currentVal)) {
        const growth = ((currentVal - baseVal)/baseVal)*100;
        const contribution = weight * growth;
        weightedSum += contribution;
      } else {
        console.warn(`Invalid CPI values for ${cat} in ${year}, baseVal=${baseVal}, currentVal=${currentVal}`);
      }
    }
    console.log(`For year ${year}, Weighted CPI Growth: ${weightedSum.toFixed(2)}%`);
    return weightedSum;
  }

  const weightedCPIByYear = {};
  cpiYears.forEach(y => {
    weightedCPIByYear[y] = computeWeightedCPIGrowth(y);
  });

  console.log("Weighted CPI by Year:", weightedCPIByYear);

  // Compute wage growth relative to 2019
  const professionBaseWage = d3.rollup(
    transformedWageData.filter(d=>d.Year==="2019"),
    v=>v[0].Wage,
    d=>d.Profession
  );

  const finalDataChart4 = [];
  transformedWageData.forEach(d => {
    const profession = d.Profession;
    const year = d.Year;
    // 不包括2019年数据点
    if(year === "2019") return;
    const baseWage = professionBaseWage.get(profession);
    if(baseWage===undefined || baseWage===0) return;

    const wageGrowthRate = ((d.Wage - baseWage)/baseWage)*100;
    const cpiGrowthRate = weightedCPIByYear[year] || 0;
    const growthRateDiff = wageGrowthRate - cpiGrowthRate;
    // Impact使用正负描述
    const impactLabel = growthRateDiff > 0 ? "Positive impact" : "Negative impact";

    finalDataChart4.push({
      Profession: profession,
      Year: year,
      "Wage Growth Rate": wageGrowthRate,
      "CPI Growth Rate": cpiGrowthRate,
      "Growth Rate Difference": Math.abs(growthRateDiff),
      Impact: impactLabel
    });
  });

  console.log("Final Data for Visualization 4:", finalDataChart4);

  const newWageData = await d3.csv("./dataset/Book12.csv");
  console.log("newWageData: ", newWageData);

  // Render Visualization 1
  await render1(newWageData);

  // Render Visualization 2
  await render2(cpiData);

  // Render Visualization 4 (只显示内圈)
  await render4(finalDataChart4);
}

// Rendering function for the first chart

async function render1(newWageData) {
  // Ensure Wage is a number
  newWageData.forEach(d => {
    d["Wage"] = parseFloat(d["Wage"]);
  });

  // Find the overall min and max Wage for all years
  const allWages = newWageData.map(d => d.Wage);
  const yMin = Math.floor(Math.min(...allWages));
  const yMax = Math.ceil(Math.max(...allWages)); 
  // Define Vega-Lite specification
  const vlSpec = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    title: "Wage by Occupational Classification and Year",
    data: { values: newWageData },
    width: 700,
    height: 400,
    mark: { type: "bar", opacity: 1, size:25},
    encoding: {
      x: {
        field: "North American Industry Classification System (NAICS)",
        type: "nominal",
        title: "Occupational Classification",
        // axis: { labelAngle: -45 },
        sort: {
          field: "Wage", 
          order: "descending"
        }
      },   
      y: {
        field: "Wage",
        type: "quantitative",
        title: "Wage ($)",
        stack: null,
        scale: { domain: [yMin, yMax] } ,
        
      },
      color: {
        field: "Year",
        type: "nominal",
        title: "Year",
        scale: {
          domain: ["2019", "2020", "2021","2022","2023"], 
          range: ["#DEDEDE","#b3cde0", "#6497b1", "#004675","#4DB1F4"] 
        },
        legend: {
          orient: "right",
          symbolType: "square",
          symbolSize: 100,
          title: "Year (Interactive)",
        }
      },
      order: {
        field: "Wage", 
        type: "quantitative",
        sort: "descending" 
      },
      tooltip: [
        { field: "North American Industry Classification System (NAICS)", type: "nominal" },
        { field: "Year", type: "nominal" },
        { field: "Wage", type: "quantitative" }
      ]
    },
    selection: {
      yearSelection: {
        type: "multi",
        fields: ["Year"],
        bind: "legend",
        init: [{ Year: "2019" }, { Year: "2023" }]
      }
    },
    transform: [
      {
        filter: {
          selection: "yearSelection"
        }
      }
    ],
  };

  vegaEmbed("#view1", vlSpec);

}

// Rendering function for the second chart
async function render2(cpiData) {
  const cpiYears = ["2019","2020","2021","2022","2023"];
  const transformedCPIData2 = [];
  cpiData.forEach((row) => {
    const baseValue = validateAndParse(row["2019"], null);
    cpiYears.forEach((year) => {
      const cpiValue = validateAndParse(row[year], null);
      let growthRate = null;
      if (
        baseValue !== null &&
        baseValue !== 0 &&
        isFinite(baseValue) &&
        cpiValue !== null &&
        isFinite(cpiValue)
      ) {
        growthRate = ((cpiValue - baseValue) / baseValue) * 100;
      }
      if (growthRate !== null) {
        transformedCPIData2.push({
          Category: row["Category"] || "Unknown",
          Year: year,
          GrowthRate: growthRate,
        });
      }
    });
  });

  const selection = vl
    .selectMulti("CategorySelect")
    .fields("Category")
    .bind("legend");

  const vlSpec = vl
    .markLine({ point: true })
    .data(transformedCPIData2)
    .title("CPI Growth Rate by Category (2019 as Base)")
    .transform(vl.filter("datum.GrowthRate != null && isFinite(datum.GrowthRate)"))
    .params(selection)
    .encode(
      vl.x().fieldN("Year").title("Year"),
      vl.y().fieldQ("GrowthRate").title("Growth Rate (%)"),
      vl.color().fieldN("Category").title("Category"),
      vl.opacity().if(selection, vl.value(1)).value(0.1),
      vl.tooltip(["Category", "Year", "GrowthRate"])
    )
    .width(700)
    .height(400)
    .toSpec();

  await vegaEmbed("#view2", vlSpec, { renderer: "svg" });
}

// Rendering function for the fourth chart
async function render4(finalDataChart4) {
  const minPitSize = 10;
  const maxPitSize = 500;

  const vlSpec = vl
    .markCircle({ stroke: "black", strokeWidth: 1 })
    .data(finalDataChart4)
    .title("Wage Growth vs Weighted CPI Growth (2020-2023)")
    .encode(
      vl.x().fieldN("Profession").title("Profession").sort(null),
      // 不展示2019年，数据中已过滤掉
      vl.y().fieldN("Year").title("Year").sort(["2020","2021","2022","2023"]),
      vl.size()
        .fieldQ("Growth Rate Difference")
        .scale({ range: [minPitSize, maxPitSize] })
        .title("Growth Rate Difference (%)"),
      vl.color()
        .fieldN("Impact")
        .title("Impact")
        // Impact已经是"Positive impact"和"Negative impact"
        .scale({ domain: ["Positive impact","Negative impact"], range: ["green", "red"] }),
      vl.tooltip([
        "Profession",
        "Year",
        "Wage Growth Rate",
        "CPI Growth Rate",
        "Growth Rate Difference"
      ])
    )
    .width(700)
    .height(400)
    .toSpec();

  await vegaEmbed("#view4", vlSpec);
}

// Execute data loading and rendering
loadDataAndRender();
