const API_KEY = "d423b37af5677975831d02c798bb2376"; // replace with your Marketstack API key
const BASE_URL = "http://api.marketstack.com/v1/eod";

async function getStockData() {
  const symbol = document.getElementById("symbolInput").value.toUpperCase();
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
      throw new Error("No data found");
    }

    const stock = data.data[0];

    document.getElementById("stockName").innerText = stock.symbol;
    document.getElementById("price").innerText = stock.close;
    document.getElementById("date").innerText = stock.date;
    document.getElementById("open").innerText = stock.open;
    document.getElementById("high").innerText = stock.high;
    document.getElementById("low").innerText = stock.low;

    resultCard.classList.remove("hidden");

  } catch (error) {
    alert("Error fetching stock data");
    console.error(error);
  } finally {
    loader.classList.add("hidden");
  }
}