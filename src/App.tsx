import React from "react";
import CountryList from "./components/CountryList";
import "./App.css";
import Header from "./components/Header";

function App() {
  return (
    <div className="App bg-dark pt-3">
      <div className="container font-weight-bold">
        <Header />
        <CountryList />
      </div>
    </div>
  );
}

export default App;
