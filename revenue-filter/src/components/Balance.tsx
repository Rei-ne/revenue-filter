import info from "../assets/icons/info.svg";
import { useEffect, useState } from "react";
import { apiClient } from "../core/api";

const BalanceList: React.FC<{ balancesData: BalanceItem[] }> = ({
  balancesData,
}) => {
  const filteredBalances = balancesData.slice(1);
  // list of balances
  return (
    <div className="w-3/5 md:w-1/5 md:absolute md:right-10 md:mr-6 h-fit md:h-[360px] mt-3 flex items-center justify-center flex-col py-6">
      {filteredBalances.length > 0 ? (
        filteredBalances.map((balance, id) => (
          <div
            key={id}
            className="flex items-center justify-between py-4 relative w-full"
          >
            <div className="text-left py-1">
              <p className="text-xs md:text-sm font-Degular font-normal">
                {balance.title}
              </p>
              <p className="text-lg md:text-2xl font-DegularBold">
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
    <section className="flex flex-col md:flex-row h-[400px] mt-6 md:mt-2 relative w-full">
      <div className="p-8 w-full md:w-1/2 lg:w-3/5 md:h-1/2 relative flex flex-col items-center md:items-start">
        <div className="flex flex-col items-center text-left justify-center md:h-full w-full md:pl-4  md:ml-20 md:flex-row md:items-start ">
          <div>
            <p className="text-sm font-DegularThin ">Available Balance</p>
            {balance ? (
              <h2 className="DegularBold text-xl md:text-2xl  font-extrabold">
                USD {balance}
              </h2>
            ) : (
              <p> Loading</p>
            )}
          </div>
          <div className="w-full md:w-1/2 lg:w-1/2 h-16 flex  items-center justify-center  mr-2">
            <button className="bg-black w-fit rounded-full px-6 md:px-8 py-4 text-xs text-white ">
              Withdraw
            </button>
          </div>
        </div>
      </div>
      <div className="md:h-1/2 border w-full md:w-2/3 md:absolute md:bottom-0 ">
        <h2>CHART</h2>
      </div>
      <div className="w-full flex items-center justify-center">
        <BalanceList balancesData={balancesData} />
      </div>
    </section>
  );
};

type BalanceItem = {
  title: string;
  amount: number;
};

export default Balance;
