import axios from "axios";

async function getRate() {
  const rate = await axios.get(
    "https://blockchain.info/tobtc?currency=USD&value=1"
  );
  return rate;
}

async function getMarketPrice() {
  const marketPrice = await axios.get(
    "https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true"
  );
  return marketPrice;
}

async function getTradeVolume() {
  const tradeVolume = await axios.get(
    "https://api.blockchain.info/charts/trade-volume?timespan=5months&format=json&cors=true"
  );
  return tradeVolume;
}

async function getConfirmedTransactions() {
  const confirmedTransactions = await axios.get(
    "https://api.blockchain.info/charts/n-transactions?timespan=5months&format=json&cors=true"
  );
  return confirmedTransactions;
}

export default {
  getRate,
  getMarketPrice,
  getTradeVolume,
  getConfirmedTransactions
};
