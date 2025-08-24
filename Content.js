// Function to calculate growth
const calculateGrowth = (current, previous) => {
    if (!previous || previous === 0) return 0; // Avoid division by zero
    return (current - previous) / Math.abs(previous);
  };
  
  // Function to calculate Net Profit Margin (NPM)
  const calculateNPM = (netProfit, sales) => {
    if (!sales || sales === 0) return 0; // Avoid division by zero
    return netProfit / sales;
  };
  
  // Function to calculate points based on consistency
  const assignConsistencyPoints = (values) => {
    if (values[3] > values[2] && values[2] > values[1] && values[1] > values[0]) {
      return 2; // Consistent growth
    }
    return 1; // Default point
  };
  
  // Function to calculate points based on growth
  const assignGrowthPoints = (growthQ4, avgGrowth) => {
    if (growthQ4 >= 0.2) return 2;
    if (growthQ4 >= 0) return 1.5;
    return 1;
  };
  
  // Function to calculate points based on comparison with average growth
  const assignAvgGrowthPoints = (growthQ4, avgGrowth) => {
    if (growthQ4 > avgGrowth) return 2;
    if (growthQ4 === avgGrowth) return 1.5;
    return 1;
  };
  
  // Function to replace 0 values with 0.01 in arrays
  const replaceZeroes = (array) => array.map((v) => (v === 0 ? 0.01 : v));
  
  // Function to parse numbers from text (handle commas)
  const parseNumber = (text) => {
    if (!text) return 0;
    return parseFloat(text.replace(/,/g, "")) || 0;
  };
  
  // Function to calculate score for a single group of quarters
  const calculateGroupScore = (sales, netProfit, eps) => {
    sales = replaceZeroes(sales);
    netProfit = replaceZeroes(netProfit);
    eps = replaceZeroes(eps);
  
    const salesGrowth = [
      calculateGrowth(sales[1], sales[0]),
      calculateGrowth(sales[2], sales[1]),
      calculateGrowth(sales[3], sales[2]),
    ];
    const avgSalesGrowth = (salesGrowth[0] + salesGrowth[1] + salesGrowth[2]) / 3;
  
    const netProfitGrowth = [
      calculateGrowth(netProfit[1], netProfit[0]),
      calculateGrowth(netProfit[2], netProfit[1]),
      calculateGrowth(netProfit[3], netProfit[2]),
    ];
    const avgNetProfitGrowth =
      (netProfitGrowth[0] + netProfitGrowth[1] + netProfitGrowth[2]) / 3;
  
    const epsGrowth = [
      calculateGrowth(eps[1], eps[0]),
      calculateGrowth(eps[2], eps[1]),
      calculateGrowth(eps[3], eps[2]),
    ];
    const avgEpsGrowth = (epsGrowth[0] + epsGrowth[1] + epsGrowth[2]) / 3;
  
    const npm = [
      calculateNPM(netProfit[0], sales[0]),
      calculateNPM(netProfit[1], sales[1]),
      calculateNPM(netProfit[2], sales[2]),
      calculateNPM(netProfit[3], sales[3]),
    ];
    const processedNpm = replaceZeroes(npm);
  
    const npmGrowth = [
      calculateGrowth(processedNpm[1], processedNpm[0]),
      calculateGrowth(processedNpm[2], processedNpm[1]),
      calculateGrowth(processedNpm[3], processedNpm[2]),
    ];
    const avgNpmGrowth = (npmGrowth[0] + npmGrowth[1] + npmGrowth[2]) / 3;
  
    const salesPoints =
      assignConsistencyPoints(sales) +
      assignGrowthPoints(salesGrowth[2], avgSalesGrowth) +
      assignAvgGrowthPoints(salesGrowth[2], avgSalesGrowth);
  
    const netProfitPoints =
      assignConsistencyPoints(netProfit) +
      assignGrowthPoints(netProfitGrowth[2], avgNetProfitGrowth) +
      assignAvgGrowthPoints(netProfitGrowth[2], avgNetProfitGrowth);
  
    const epsPoints =
      assignConsistencyPoints(eps) +
      assignGrowthPoints(epsGrowth[2], avgEpsGrowth) +
      assignAvgGrowthPoints(epsGrowth[2], avgEpsGrowth);
  
    const npmPoints =
      assignConsistencyPoints(processedNpm) +
      assignGrowthPoints(npmGrowth[2], avgNpmGrowth) +
      assignAvgGrowthPoints(npmGrowth[2], avgNpmGrowth);

      console.log({
        salesGrowth,
        avgSalesGrowth,
        netProfitGrowth,
        avgNetProfitGrowth,
        epsGrowth,
        avgEpsGrowth,
        npmGrowth,
        avgNpmGrowth,
        salesPoints,
        netProfitPoints,
        epsPoints,
        npmPoints,
      });
  
  
    const totalPoints = salesPoints + netProfitPoints + epsPoints + npmPoints;
    return totalPoints / 24; // Normalize by maximum possible score
  };
  
  // Function to calculate scores for all groups
  const calculateScores = (data) => {
    const scores = [];
    for (let i = 0; i <= data.sales.length - 4; i++) {
      const salesGroup = data.sales.slice(i, i + 4);
      const netProfitGroup = data.netProfit.slice(i, i + 4);
      const epsGroup = data.eps.slice(i, i + 4);
  
      if (
        salesGroup.some((v) => v === null || v === undefined || isNaN(v)) ||
        netProfitGroup.some((v) => v === null || v === undefined || isNaN(v)) ||
        epsGroup.some((v) => v === null || v === undefined || isNaN(v))
      ) {
        console.warn(`Skipping group ${i + 1} due to incomplete data`);
        continue;
      }
  
      const groupScore = calculateGroupScore(salesGroup, netProfitGroup, epsGroup);
      scores.push(groupScore);
    }
    return scores;
  };
  
  // Function to extract table data
  const extractTableData = () => {
    const table = document.querySelector("#quarters table");
    if (!table) return null;
  
    const rows = table.querySelectorAll("tr");
    const data = {
      sales: [],
      netProfit: [],
      eps: [],
    };
  
    rows.forEach((row) => {
      const cells = Array.from(row.querySelectorAll("td"));
      const header = row.querySelector("th, td")?.textContent?.trim()?.toLowerCase();
  
      if (header?.includes("sales") || header?.includes("revenue")) {
        data.sales = cells.map((cell) => parseNumber(cell.textContent.trim()));
      } else if (header?.includes("net profit")) {
        data.netProfit = cells.map((cell) => parseNumber(cell.textContent.trim()));
      } else if (header?.includes("eps")) {
        data.eps = cells.map((cell) => parseNumber(cell.textContent.trim()));
      }
    });
  
    data.sales = data.sales.slice(1);
    data.netProfit = data.netProfit.slice(1);
    data.eps = data.eps.slice(1);
  
    return data;
  };
  
  // Updated function to display scores
  const addScoresAboveTable = (scores) => {
    const table = document.querySelector("#quarters table");
    if (!table || !scores) return;

    const scoreContainer = document.createElement("div");
    scoreContainer.className = "score-container";

    const headers = Array.from(table.querySelectorAll("thead th"));

    // Calculate offset to align scores towards the right
    const offset = headers.length - scores.length - 1; // Exclude the first header (index 0)

    headers.forEach((header, index) => {
        if (index <= offset || index > scores.length + offset) return; // Skip headers outside score range

        const scoreBox = document.createElement("div");
        scoreBox.className = "score-box";
        scoreBox.style.fontWeight = scores[index - offset - 1] * 100 >= 79 ? "bold" : "normal";
        scoreBox.style.backgroundColor =
            scores[index - offset - 1] * 100 >= 79 ? "green" : "#e6f7ff";
        scoreBox.style.color = scores[index - offset - 1] * 100 >= 79 ? "white" : "black";
        scoreBox.textContent = `${(scores[index - offset - 1] * 100).toFixed(2)}%`;

        header.appendChild(scoreBox); // Append score box to header
    });
};

  // Main function to run the extension
  const runExtension = async () => {
    const table = document.querySelector("#quarters table");
    if (!table) {
      console.log("Waiting for the #quarters table...");
      setTimeout(runExtension, 500);
      return;
    }
  
    const data = extractTableData();
    if (!data || data.sales.length < 4) {
      console.log("Insufficient data");
      return;
    }
  
    const scores = calculateScores(data);
    addScoresAboveTable(scores);
  };
  
  console.log("Extension loaded on:", window.location.href);
  runExtension();
  