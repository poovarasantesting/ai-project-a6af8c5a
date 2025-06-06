import React from "react";
import { Calculator } from "./components/Calculator";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Calculator />
    </div>
  );
}

export default App;