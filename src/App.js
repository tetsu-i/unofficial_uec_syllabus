// src/App.js
import React from "react";
import MaterialTable from "./MaterialTable";
import "./App.css";
import Data from "./data.json";

const App = () => {
  return (
    <div className="App">
      <h1>UEC K課程 シラバス</h1>
      <MaterialTable initialData={Data["data"]} />
    </div>
  );
};

export default App;
