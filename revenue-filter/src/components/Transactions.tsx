import cancel from "../assets/icons/cancel.svg";
import download from "../assets/icons/download.svg";
import sent from "../assets/icons/sent.svg";
import received from "../assets/icons/received.svg";
import expand from "../assets/icons/expand_more.svg";

import { useEffect, useState } from "react";
import { apiClient } from "../core/api";
import { ApiResponse } from "../core/types";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Transactions: React.FC<{ TransactionsData: ApiResponse[] }> = ({
  TransactionsData,
}) => {
  const [transactionsData, setTransactionsData] = useState<ApiResponse[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [selectedDays, setSelectedDays] = useState<number>(7);

  const [openFilter, setOpenFilter] = useState(false);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await apiClient.get("/transactions");
        const responseData = response.data;
        console.log(responseData);

        setTransactionsData(responseData);
        setTotal(responseData.length); // Set total number of transactions
      } catch (error) {
        console.error(error);
      }
    }
    fetchTransactions();
  }, []);

  return (
    <section className="border mt-6 w-full px-16  self-center">
      <div className="flex justify-between">
        <div className="text-left">
          <h1 className="DegularBold text-xl font-extrabold">
            {total} Transactions
          </h1>
          <p className="text-sm">
            Your Transactions for the last {selectedDays} days
          </p>
        </div>
        <aside className="flex">
          <div className="">
            <button
              onClick={() => {
                setOpenFilter(true);
              }}
              className="text-center border flex bg-gray-100 p-2 rounded-full text-sm"
            >
              Filter <img src={expand} alt="expand-button" />
            </button>
            {openFilter && (
              <TransactionFilter
                TransactionsData={TransactionsData}
                setOpenFilter={setOpenFilter}
              />
            )}
          </div>
          <div>
            <button className="border flex bg-gray-100 p-2 rounded-full text-sm">
              Export List <img src={download} alt="more-button" />
            </button>
          </div>
        </aside>
      </div>

      {transactionsData.map((transaction, index) => (
        <TransactionCard key={index} transaction={transaction} />
      ))}
    </section>
  );
};
const TransactionFilter: React.FC<{
  TransactionsData: ApiResponse[];
  setOpenFilter: React.Dispatch<React.SetStateAction<boolean>>; // Prop to update openFilter state
}> = ({ TransactionsData, setOpenFilter }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [transactionType, setTransactionType] = useState<string>("");
  const [transactionStatus, setTransactionStatus] = useState<string>("");

  const handleApplyFilter = () => {};

  const handleTransactionTypeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Handle transaction type changes
  };

  const handleTransactionStatusChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Handle transaction status changes
  };
  return (
    <div>
      <div>
        <h2>Filter</h2>
        <img
          onClick={() => {
            setOpenFilter(false);
          }}
          src={cancel}
          alt=""
        />
      </div>
      <div className="flex flex-col items-center">
        <div className="mb-4">
          <label htmlFor="startDate" className="mr-2">
            Start Date:
          </label>
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
            id="startDate"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="endDate" className="mr-2">
            End Date:
          </label>
          <DatePicker
            selected={endDate}
            onChange={(date: Date) => setEndDate(date)}
            id="endDate"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="transactionType" className="mr-2">
            Transaction Type:
          </label>
          <div>
            <label>
              <input
                type="checkbox"
                value="payment"
                checked={transactionType.includes("payment")}
                onChange={handleTransactionTypeChange}
              />
              Store transactions
            </label>
            <label>
              <input
                type="checkbox"
                value="withdrawals"
                checked={transactionType.includes("withdrawal")}
                onChange={handleTransactionTypeChange}
              />
              withdrawals
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="transactionStatus" className="mr-2">
            Transaction Status:
          </label>
          <div>
            <label>
              <input
                type="checkbox"
                value="successful"
                checked={transactionStatus.includes("successful")}
                onChange={handleTransactionStatusChange}
              />
              Successful
            </label>
            <label>
              <input
                type="checkbox"
                value="pending"
                checked={transactionStatus.includes("pending")}
                onChange={handleTransactionStatusChange}
              />
              Pending
            </label>
            <label>
              <input
                type="checkbox"
                value="failed"
                checked={transactionStatus.includes("failed")}
                onChange={handleTransactionStatusChange}
              />
              Failed
            </label>
          </div>
        </div>
        <button
          className="bg-black hover:bg-black text-white font-bold py-2 px-4 rounded"
          onClick={handleApplyFilter}
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
};
const TransactionCard: React.FC<{ transaction: ApiResponse }> = ({
  transaction,
}) => {
  useEffect(() => {}, [transaction]);
  return (
    <div>
      <p>{transaction.metadata?.product_name}</p>
      <p>{transaction.metadata?.name}</p>
      <p>{transaction.amount}</p>
      <p>{transaction.date}</p>
    </div>
  );
};

export default Transactions;
