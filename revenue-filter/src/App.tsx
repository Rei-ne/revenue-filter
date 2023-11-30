import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";
// import { ApiResponse } from "./core/types";

import "./App.css";
import Balance from "./components/Balance";
import Transactions from "./components/Transactions";

function App() {
  return (
    <section className="font-Degular h-full text-black flex relative app-container">
      <SideBar />
      <div className="flex flex-col flex-1">
        <NavBar />
        <Balance />
        <Transactions />
      </div>
    </section>
  );
}

export default App;
