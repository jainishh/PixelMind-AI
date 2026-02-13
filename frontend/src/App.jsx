import { useState } from "react";
// import { ThreeDCardDemo } from "./components/ThreeDCardDemo";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AllRotes from "./Pages/AllRoutes/AllRoutes";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AllRotes />
    </BrowserRouter>
  );
}

export default App;
