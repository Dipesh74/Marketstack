const API_KEY = "d423b37af5677975831d02c798bb2376"; 
const BASE_URL = "https://api.marketstack.com/v1/eod";

async function getStockData() {
  const symbolInput = document.getElementById("symbolInput");
  const symbol = symbolInput.value.trim().toUpperCase();
  const loader = document.getElementById("loader");
  const resultCard = document.getElementById("stockResult");

  if (!symbol) {
    alert("Please enter a stock symbol");
    return;
  }

  loader.classList.remove("hidden");
  resultCard.classList.add("hidden");

  try {
    const response = await fetch(`${BASE_URL}?access_key=${API_KEY}&symbols=${symbol}&limit=1`);
    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      alert("No data found for this symbol. Try AAPL or MSFT.");
      return;
    }

    const stock = data.data[0];

    document.getElementById("stockName").innerText = stock.symbol;
    document.getElementById("price").innerText = stock.close.toFixed(2);
    document.getElementById("date").innerText = new Date(stock.date).toLocaleDateString();
    document.getElementById("open").innerText = stock.open.toFixed(2);
    document.getElementById("high").innerText = stock.high.toFixed(2);
    document.getElementById("low").innerText = stock.low.toFixed(2);

    resultCard.classList.remove("hidden");
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to fetch data. Check your connection or API key.");
  } finally {
    loader.classList.add("hidden");
  }
}