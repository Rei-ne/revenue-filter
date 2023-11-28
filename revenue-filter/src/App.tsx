import { useEffect, useState } from "react";
import { apiClient } from "./core/api";
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";
import { ApiResponse } from "./core/types";

import "./App.css";
import Balance from "./components/Balance";
import Transactions from "./components/Transactions";

function App({ TransactionsData }: { TransactionsData: ApiResponse[] }) {
  return (
    <section className="font-Degular h-full text-black flex relative app-container">
      <SideBar />

      <div className="flex flex-col flex-1">
        <NavBar />
        <Balance />
      </div>
      <Transactions TransactionsData={TransactionsData} />
    </section>
  );
}

export default App;
