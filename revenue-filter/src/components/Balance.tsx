import info from "../assets/icons/info.svg";
import { useEffect, useState } from "react";
import { apiClient } from "../core/api";

const BalanceList: React.FC<{ balancesData: BalanceItem[] }> = ({
  balancesData,
}) => {
  const filteredBalances = balancesData.slice(1);

  return (
    <div className="w-[300px] absolute right-12 mr-6 h-[400px] border-black mt-3">
      {filteredBalances.length > 0 ? (
        filteredBalances.map((balance, id) => (
          <div
            key={id}
            className="flex items-center justify-between p-4 relative"
          >
            <div className="text-left py-1">
              <p className="text-sm font-Degular font-normal">
                {balance.title}
              </p>
              <p className="text-2xl font-DegularBold">
                USD {balance.amount.toFixed(2)}
              </p>
            </div>
            <img
              className="absolute top-4 right-2"
              src={info}
              alt={`info-icon-${id}`}
            />
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
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
        console.log(responseData);

        // Mapping response data to custom titles and ids
        const mappedBalances: BalanceItem[] = [
          { title: "Balance", amount: responseData.balance },
          { title: "Ledger Balance", amount: responseData.ledger_balance },
          { title: "Total Payout", amount: responseData.total_payout },
          { title: "Total Revenue", amount: responseData.total_revenue },
          { title: "Pending Payout", amount: responseData.pending_payout },
        ];

        setBalancesData(mappedBalances);
        setBalance(response.data.balance);
      } catch (error) {
        console.error(error);
      }
    }
    getBalance();
  }, []);

  return (
    <section className="flex h-[400px] mt-6 relative">
      <div className="p-8  w-1/2 h-1/2 relative flex flex-col items-start ">
        <p className="text-sm font-DegularThin">Available Balance</p>
        <div className="w-1/2 h-16 flex absolute right-0 items-center justify-start mr-2">
          <button className=" bg-black w-1/2 rounded-full px-8 py-4 text-xs text-white ">
            Withdraw
          </button>
        </div>
        {balance ? (
          <h2 className="DegularBold text-3xl font-extrabold">USD {balance}</h2>
        ) : (
          <p> Loading</p>
        )}
      </div>
      <div className="h-[300px] border w-[750px] absolute bottom-0">
        <h2>CHART</h2>
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
