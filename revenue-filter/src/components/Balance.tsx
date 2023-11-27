import info from "../assets/icons/info.svg";
import { useEffect, useState } from "react";
import { apiClient } from "../core/api";

const BalanceList: React.FC<{ balancesData: BalanceItem[] }> = ({
  balancesData,
}) => {
  return (
    <div className="w-1/2 ">
      {balancesData.map((balance, id) => (
        <div key={id} className="flex items-center justify-between border p-4">
          <div>
            <p className="text-lg font-semibold">{balance.title}</p>
            <p className="text-xl font-bold">USD {balance.amount}</p>
          </div>
          <img src={info} alt={`info-icon-${id}`} />
        </div>
      ))}
    </div>
  );
};

const Balance = () => {
  const [balancesData, setBalancesData] = useState<BalanceItem[]>([]);
  const [balance, setBalance] = useState("");

  useEffect(() => {
    async function getBalance() {
      try {
        const response = await apiClient.get("/wallet");
        const responseData = response.data;

        // Mapping response data to BalanceItem structure
        const mappedBalances: BalanceItem[] = Object.keys(responseData).map(
          (key) => ({
            title: key,
            amount: responseData[key],
          })
        );

        setBalancesData(mappedBalances);
        setBalance(response.data.balance);
      } catch (error) {
        console.error(error);
      }
    }
    getBalance();
  });

  return (
    <section className="flex h-[400px]">
      <div className="p-8 border w-1/2 h-1/2 relative flex flex-col items-start">
        <p className="text-sm font-DegularThin">Available Balance</p>
        <button className="absolute bg-black rounded-full px-8 py-3 text-xs text-white">
          Withdra
        </button>
        {balance ? (
          <h2 className="DegularBold text-2xl font-extrabold">
            {" "}
            USD {balance}{" "}
          </h2>
        ) : (
          <p> loading</p>
        )}
      </div>
      <BalanceList balancesData={balancesData} />
    </section>
  );
};

type BalanceItem = {
  title: string;
  amount: number;
};

export default Balance;
