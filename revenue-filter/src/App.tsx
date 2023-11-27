import { useEffect, useState } from "react";
import { apiClient } from "./core/api";
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";

import "./App.css";

function App() {
  const [balance, setBalance] = useState("");

  useEffect(() => {
    async function getBalance() {
      try {
        const response = await apiClient.get("/wallet");
        setBalance(response.data.balance);
      } catch (error) {
        console.error(error);
      }
    }
    getBalance();
  });

  return (
    <section className="font-Degular h-full text-black flex relative">
      <SideBar />

      <div className="flex flex-col flex-1">
        <NavBar />
        <div className="p-8">
          <p className="text-xl font-DegularThin">Available Balance</p>
          <h1></h1>
          <button>Withdraw</button>
          {balance ? <h2>USD {balance} </h2> : <p> loading</p>}
        </div>
      </div>
    </section>
  );
}

export default App;
