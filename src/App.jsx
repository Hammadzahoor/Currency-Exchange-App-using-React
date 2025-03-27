import React, { useState, useEffect } from "react";
import countryList from "./countryList";

const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies";

const App = () => {
  const [fromCurr, setFromCurr] = useState("USD");
  const [toCurr, setToCurr] = useState("PKR");
  const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    updateExchangeRate();
  }, [fromCurr, toCurr, message]);

  const updateExchangeRate = async () => {
    const URL = `${BASE_URL}/${fromCurr.toLowerCase()}.json`;
    const response = await fetch(URL);
    const data = await response.json();
    const rate = data[fromCurr.toLowerCase()][toCurr.toLowerCase()];
    setExchangeRate(rate);
    const finalAmount = amount * exchangeRate;
    setMessage(`${amount} ${fromCurr} = ${finalAmount} ${toCurr}`); //   change when we click on button
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleFromCurrChange = (e) => {
    setFromCurr(e.target.value);
  };

  const handleToCurrChange = (e) => {
    setToCurr(e.target.value);
  };

  const handleSwap = (finalAmount) => {
    const temp = fromCurr;
    setFromCurr(toCurr);
    setToCurr(temp);
  };

  const updateFlag = (currCode) => {
    return `https://flagsapi.com/${countryList[currCode]}/flat/64.png`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount) {
      setAmount(1);
    }
    updateExchangeRate();
  };

  return (
    <div className="container">
      <h2>Currency Converter</h2>
      <form onSubmit={handleSubmit}>
        <div className="amount">
          <p>Enter Amount</p>
          <input value={amount} type="text" onChange={handleAmountChange} />
        </div>
        <div className="dropdown">
          <div className="from">
            <p>From</p>
            <div className="select-container">
              <img src={updateFlag(fromCurr)} alt="from-flag" />
              <select
                name="from"
                value={fromCurr}
                onChange={handleFromCurrChange}
              >
                {Object.keys(countryList).map((currCode) => (
                  <option key={currCode} value={currCode}>
                    {currCode}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* <i className="fa-solid fa-arrow-right-arrow-left"></i> */}
          <i
            className="fa-solid fa-arrow-right-arrow-left"
            onClick={handleSwap}
            style={{ cursor: "pointer" }} // Add cursor pointer to indicate it's clickable
          ></i>
          <div className="to">
            <p>To</p>
            <div className="select-container">
              <img src={updateFlag(toCurr)} alt="to-flag" />
              <select name="to" value={toCurr} onChange={handleToCurrChange}>
                {Object.keys(countryList).map((currCode) => (
                  <option key={currCode} value={currCode}>
                    {currCode}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="msg">
          {/* {amount} {fromCurr} = {(amount * exchangeRate)} {toCurr} // to automatically change the message */}

          {message}
        </div>
        <button type="submit">Get Exchange Rate</button>
      </form>
    </div>
  );
};

export default App;
