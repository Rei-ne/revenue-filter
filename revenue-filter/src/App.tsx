import { useEffect, useState } from "react";
import { apiClient } from "./core/api";
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";

import "./App.css";
import Balance from "./components/Balance";

function App() {
  return (
    <section className="font-Degular h-full text-black flex relative">
      <SideBar />

      <div className="flex flex-col flex-1">
        <NavBar />
        <Balance />
      </div>
    </section>
  );
}

export default App;
