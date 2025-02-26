import React, { Component, createRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

class StockDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockSymbol: "AAPL", // Default stock symbol
      stockData: null,
      searchHistory: [], // Store previous stock symbols
    };

    this.inputRef = createRef(); // Uncontrolled component reference
  }

  // Fetch stock data when component mounts
  componentDidMount() {
    this.fetchStockData(this.state.stockSymbol);
  }

  // Fetch stock data when stockSymbol changes
  componentDidUpdate(prevProps, prevState) {
    if (prevState.stockSymbol !== this.state.stockSymbol) {
      this.fetchStockData(this.state.stockSymbol);
    }
  }

  // Simulated stock API fetch
  fetchStockData(symbol) {
    const dummyStockData = {
      symbol: symbol.toUpperCase(),
      price: (Math.random() * 100 + 100).toFixed(2), // Random price
      change: (Math.random() * 10 - 5).toFixed(2) + "%",
    };

    this.setState((prevState) => ({
      stockData: dummyStockData,
      searchHistory: [...prevState.searchHistory, symbol], // Store in history
    }));
  }

  // Handle input change (controlled component)
  handleInputChange = (event) => {
    this.setState({ stockSymbol: event.target.value });
  };

  // Handle form submission
  handleSearch = (event) => {
    event.preventDefault();
    const symbol = this.inputRef.current.value; // Uncontrolled input
    if (symbol) {
      this.setState({ stockSymbol: symbol });
    }
  };

  render() {
    return (
      <div className="container text-center mt-5 p-4 bg-dark text-white rounded">
        <h2>📈 Stock Market Dashboard</h2>

        {/* Input Field (Controlled) */}
        <form onSubmit={this.handleSearch} className="my-3">
          <input
            type="text"
            value={this.state.stockSymbol}
            onChange={this.handleInputChange}
            className="form-control w-50 mx-auto"
            placeholder="Enter Stock Symbol"
          />
          <button type="submit" className="btn btn-primary mt-2">Search</button>
        </form>

        {/* Uncontrolled Component (Previous Searches) */}
        <div className="mt-3">
          <input ref={this.inputRef} type="text" className="form-control w-50 mx-auto" placeholder="Quick Stock Lookup" />
        </div>

        {/* Stock Data Display */}
        {this.state.stockData ? (
          <div className="mt-4 p-3 bg-secondary rounded">
            <h3>Stock: {this.state.stockData.symbol}</h3>
            <p>📌 Price: ${this.state.stockData.price}</p>
            <p>📊 Change: {this.state.stockData.change}</p>
          </div>
        ) : (
          <p>Loading stock data...</p>
        )}

        {/* Display Search History */}
        <div className="mt-3">
          <h5>🔍 Previous Searches:</h5>
          <ul className="list-group w-50 mx-auto">
            {this.state.searchHistory.map((symbol, index) => (
              <li key={index} className="list-group-item">{symbol.toUpperCase()}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default StockDashboard;


