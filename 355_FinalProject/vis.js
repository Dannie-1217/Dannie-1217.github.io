// Data validation function
function validateAndParse(value, defaultValue = 0) {
  const parsedValue = parseFloat(value);
  return isNaN(parsedValue) || !isFinite(parsedValue) ? defaultValue : parsedValue;
}

// Data loading and transformation
async function loadDataAndRender() {
  // Load Wage data
  const wageData = await d3.csv("./dataset/wages.csv");
  console.log("Raw Wage Data:", wageData);

  // Transform Wage data into long format and reorder years
  const transformedWageData = [];
  wageData.forEach((row) => {
    ["2021", "2020", "2019"].forEach((year) => {
      transformedWageData.push({
        "Row Labels": row["Row Labels"] || "Unknown",
        Year: year,
        Wage: validateAndParse(row[year]),
      });
    });
  });
  console.log("Transformed Wage Data (Reversed):", transformedWageData);

  // Load CPI data
  const cpiData = await d3.csv("./dataset/cpi.csv");
  console.log("Raw CPI Data:", cpiData);

  // Transform CPI data into growth rate format
  const transformedCPIData = [];
  cpiData.forEach((row) => {
    const baseValue = validateAndParse(row["2019"]); // 2019 baseline value
    ["2019", "2020", "2021"].forEach((year) => {
      const cpiValue = validateAndParse(row[year]);
      const growthRate = baseValue ? ((cpiValue - baseValue) / baseValue) * 100 : 0; // Calculate growth rate
      transformedCPIData.push({
        Category: row["Category"] || "Unknown",
        Year: year,
        GrowthRate: growthRate, // Growth rate
      });
    });
  });
  console.log("Transformed CPI Growth Rate Data:", transformedCPIData);

  // Load Quintile data
  const quintileData = await d3.csv("./dataset/final_cleaned_quintiles.csv");
  console.log("Raw Quintile Data:", quintileData);

  // Transform Quintile data into spending share format
  const quintileColumns = [
    "Lowest quintile",
    "Second quintile",
    "Third quintile",
    "Fourth quintile",
    "Highest quintile",
  ];
  const processedQuintileData = [];
  quintileColumns.forEach((quintile) => {
    const totalSpending = d3.sum(quintileData, (d) => validateAndParse(d[quintile]));
    quintileData.forEach((row) => {
      processedQuintileData.push({
        Quintile: quintile,
        Category: row["Category"],
        Percentage: (validateAndParse(row[quintile]) / totalSpending) * 100,
      });
    });
  });
  console.log("Processed Quintile Data:", processedQuintileData);

  // Calculate data for the fourth chart
  const finalData = [];
  quintileColumns.forEach((quintile) => {
    const totalWeightedCPI = quintileData
      .map((row) => {
        const category = row["Category"];
        const consumptionShare = validateAndParse(row[quintile]) / d3.sum(quintileData, (d) => validateAndParse(d[quintile]));
        const cpiGrowthRate = transformedCPIData.find((c) => c.Category === category && c.Year === "2021")?.GrowthRate || 0;
        return consumptionShare * cpiGrowthRate;
      })
      .reduce((a, b) => a + b, 0);

    wageData.forEach((row) => {
      const wageGrowthRate = ((validateAndParse(row["2021"]) - validateAndParse(row["2019"])) / validateAndParse(row["2019"])) * 100;
      const wageAverage = (validateAndParse(row["2019"]) + validateAndParse(row["2020"]) + validateAndParse(row["2021"])) / 3;

      finalData.push({
        Profession: row["Row Labels"],
        Quintile: quintile,
        "Wage Growth Rate": wageGrowthRate,
        "Weighted CPI Growth Rate": totalWeightedCPI,
        "Wage Average": wageAverage,
        Impact: wageGrowthRate - totalWeightedCPI,
        Color: wageGrowthRate > totalWeightedCPI ? "green" : "red",
      });
    });
  });
  console.log("Final Data for Visualization 4:", finalData);

  // Render the first chart
  await render1(transformedWageData);

  // Render the second chart
  await render2(transformedCPIData);

  // Render the third chart
  await render3(processedQuintileData);

  // Render the fourth chart
  await render4(finalData);
}

// Rendering function for the first chart
async function render1(transformedWageData) {
  const sortedData = transformedWageData
    .reduce((acc, row) => {
      const existing = acc.find(r => r["Row Labels"] === row["Row Labels"]);
      if (existing) {
        existing.TotalWage += row.Wage;
      } else {
        acc.push({ ...row, TotalWage: row.Wage });
      }
      return acc;
    }, [])
    .sort((a, b) => a.TotalWage - b.TotalWage) // Sort industries by total wage
    .map(row => row["Row Labels"]);

  const vlSpec = vl
    .markBar({ opacity: 0.7 })
    .data(transformedWageData)
    .title("Wage Growth by Industry (2019, 2020, 2021)")
    .encode(
      vl.x().fieldN("Row Labels").title("Industry").sort(vl.fieldQ(sortedData)),
      vl.y().fieldQ("Wage").title("Wage ($)").stack("zero"),
      vl.color().fieldN("Year").title("Year").scale({ scheme: "tableau10" }).sort(["2019", "2020", "2021"]),
      vl.tooltip(["Row Labels", "Year", "Wage"])
    )
    .width(600)
    .height(400)
    .toSpec();

  vegaEmbed("#view1", vlSpec);
}

// Rendering function for the second chart
async function render2(transformedCPIData) {
  const vlSpec = vl
    .markLine({ point: true })
    .data(transformedCPIData)
    .title("CPI Growth Rate by Category (2019 as Base)")
    .encode(
      vl.x().fieldN("Year").title("Year").sort(["2019", "2020", "2021"]),
      vl.y().fieldQ("GrowthRate").title("Growth Rate (%)"),
      vl.color().fieldN("Category").title("Category"),
      vl.tooltip(["Category", "Year", "GrowthRate"])
    )
    .width(600)
    .height(400)
    .toSpec();

  vegaEmbed("#view2", vlSpec);
}

// Rendering function for the third chart
async function render3(processedQuintileData) {
  const vlSpec = vl
    .markArc()
    .data(processedQuintileData)
    .title("Household Spending Distribution by Quintile")
    .encode(
      vl.theta().fieldQ("Percentage"),
      vl.color().fieldN("Category").title("Category"),
      vl.facet().fieldN("Quintile").columns(5),
      vl.tooltip(["Quintile", "Category", "Percentage"])
    )
    .width(150)
    .height(150)
    .toSpec();

  vegaEmbed("#view3", vlSpec);
}

// Rendering function for the fourth chart
async function render4(finalData) {
  const vlSpec = vl
    .markCircle({ stroke: "black", strokeWidth: 1 })
    .data(finalData)
    .title("Weighted CPI Growth vs Wage Growth by Profession")
    .encode(
      vl.x().fieldQ("Wage Growth Rate").title("Wage Growth Rate (%)"),
      vl.y().fieldQ("Weighted CPI Growth Rate").title("Weighted CPI Growth Rate (%)"),
      vl.size().fieldQ("Wage Average").scale({ range: [10, 500] }).title("Average Wage ($)"),
      vl.color().fieldN("Color").title("Impact"),
      vl.tooltip(["Profession", "Quintile", "Wage Growth Rate", "Weighted CPI Growth Rate", "Impact", "Wage Average"])
    )
    .width(800)
    .height(600)
    .toSpec();

  vegaEmbed("#view4", vlSpec);
}

// Execute data loading and rendering
loadDataAndRender();
