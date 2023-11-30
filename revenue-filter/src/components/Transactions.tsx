import cancel from "../assets/icons/cancel.svg";
import download from "../assets/icons/download.svg";
// import sent from "../assets/icons/sent.svg";
// import received from "../assets/icons/received.svg";
// import receipt from "../assets/icons/receipt_long.svg";
import expand from "../assets/icons/expand_more.svg";

import { useEffect, useState } from "react";
import { apiClient } from "../core/api";
import { ApiResponse } from "../core/types";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Transactions = () => {
  const [transactionsData, setTransactionsData] = useState<ApiResponse[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [selectedDays, setSelectedDays] = useState<number>(7);
  const [filteredTransactions, setFilteredTransactions] = useState<
    ApiResponse[]
  >([]);
  const [openFilter, setOpenFilter] = useState(false);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await apiClient.get("/transactions");
        const responseData = response.data;

        setTransactionsData(responseData);
        setTotal(responseData.length); // Set total number of transactions
      } catch (error) {
        console.error(error);
      }
    }
    // setTotal(filteredTransactions.length);
    fetchTransactions();
  }, [selectedDays, total]);

  return (
    <section className="mt-6 w-full px-8 md:px-16 min-h-[400px] self-center  relative">
      <div className="flex justify-between  w-full">
        <div className="text-left  w-1/2">
          <h1 className="Degular text-base md:text-xl font-extrabold">
            {total} Transactions
          </h1>
          <p className="DegularThin font-light text-gray-500 text-xs md:text-sm">
            Your Transactions for the last {selectedDays} days
          </p>
        </div>
        <aside className="flex">
          <button
            onClick={() => {
              setOpenFilter(true);
            }}
            className="text-center border flex items-center justify-center bg-gray-200 p-2 rounded-full text-xs md:text-sm"
          >
            Filter <img src={expand} alt="expand-button" />
          </button>

          <button className="border flex  items-center justify-center bg-gray-200 p-2 rounded-full text-xs md:text-sm">
            Export List <img src={download} alt="more-button" />
          </button>
        </aside>
      </div>
      {openFilter && (
        <TransactionFilter
          transactionsData={transactionsData}
          setOpenFilter={setOpenFilter}
          setSelectedDays={setSelectedDays}
          setTotal={setTotal}
          setFilteredTransactions={setFilteredTransactions}
        />
      )}
      {filteredTransactions.length > 0 ? (
        <div className="mt-4">
          {filteredTransactions.map((transaction, index) => (
            <TransactionCard key={index} transaction={transaction} />
          ))}
        </div>
      ) : (
        transactionsData.length > 0 && (
          <div className="mt-4">
            {transactionsData.map((transaction, index) => (
              <TransactionCard key={index} transaction={transaction} />
            ))}
          </div>
        )
      )}

      {/* {filteredTransactions.length === 0 && (
        <div>
          <img src={receipt} alt="" />
          <h3>No transactions available</h3>
          <p>Change your filters or add new transactions</p>
        </div>
      )} */}
    </section>
  );
};
const TransactionFilter: React.FC<{
  setOpenFilter: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedDays: React.Dispatch<React.SetStateAction<number>>;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  setFilteredTransactions: React.Dispatch<React.SetStateAction<ApiResponse[]>>;
  transactionsData: any[];
}> = ({
  setOpenFilter,
  setSelectedDays,
  transactionsData,
  setFilteredTransactions,
  setTotal,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [transactionType, setTransactionType] = useState<string[]>([]);
  const [transactionStatus, setTransactionStatus] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isStatusOpen, setIsStatusOpen] = useState<boolean>(false);

  const handleApplyFilter = () => {
    const filtered = transactionsData.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      const isWithinDateRange =
        (!startDate || transactionDate >= startDate) &&
        (!endDate || transactionDate <= endDate);

      return isWithinDateRange;
    });

    if (startDate && endDate) {
      // Calculate the difference in days between startDate and endDate
      const diffInTime = endDate.getTime() - startDate.getTime();
      const diffInDays = diffInTime / (1000 * 3600 * 24);

      // Set the number of selected days
      setSelectedDays(diffInDays);
    } else {
      // If startDate or endDate is not set, consider all days
      setSelectedDays(transactionsData.length);
    }

    // Set filtered transactions of ApiResponse[] type
    setFilteredTransactions(filtered);
    setTotal(transactionsData.length);
    setOpenFilter(!setOpenFilter);
  };

  const handleClearFilter = () => {
    const clearStatePromises = [
      setEndDate(null),
      setStartDate(null),
      setTransactionType([]),
      setTransactionStatus([]),
      setFilteredTransactions([]),
    ];

    // Execute all state-setting functions and then call setOpenFilter
    Promise.all(clearStatePromises)
      .then(() => {
        setOpenFilter(!setOpenFilter);
      })
      .catch((error) => {
        console.error("Error clearing filters:", error);
      });
  };

  const handleTransactionTypeChange = (value: string) => {
    if (transactionType.includes(value)) {
      setTransactionType(transactionType.filter((type) => type !== value));
    } else {
      setTransactionType([...transactionType, value]);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const toggleDropdown2 = () => {
    setIsStatusOpen(!isStatusOpen);
  };

  const handleTransactionStatusChange = (selectedStatus: string) => {
    if (transactionStatus.includes(selectedStatus)) {
      setTransactionStatus(
        transactionStatus.filter((status) => status !== selectedStatus)
      );
    } else {
      setTransactionStatus([...transactionStatus, selectedStatus]);
    }
  };

  return (
    <div className=" w-full h-full z-10 bg-gray-300 bg-opacity-80 absolute top-0 right-0">
      <div className="border w-full md:w-[350px] h-full float-right bg-white rounded-lg relative">
        <div className="flex items-center justify-between px-4 my-4">
          <h2 className="font-bold text-lg">Filter</h2>
          <img
            onClick={() => {
              setOpenFilter(false);
            }}
            src={cancel}
            alt="cancel-btn"
            className="hover:cursor-pointer"
          />
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center text-xs gap-1 my-2">
            <button className="border p-1 px-2 rounded-full">Today</button>
            <button className="border p-1 px-2 rounded-full">
              Last 7 days
            </button>
            <button className="border p-1 px-2 rounded-full">This month</button>
            <button className="border p-1 px-2 rounded-full">
              Last 3 months
            </button>
          </div>
          <div className="mb-4 flex flex-col items-center justify-center w-full">
            <label
              htmlFor="startDate"
              className="self-start px-4 mb-2 text-xs font-bold"
            >
              Date Range
            </label>
            <div className="flex gap-2 w-4/5 items-center px-2 justify-center">
              <DatePicker
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
                id="startDate"
                className="bg-gray-100 border rounded-lg p-1 w-[150px]"
              />
              <DatePicker
                selected={endDate}
                onChange={(date: Date) => setEndDate(date)}
                id="endDate"
                className="bg-gray-100 border rounded-lg p-1 w-[150px]"
              />
            </div>
          </div>

          <div className="mb-4 w-full text-left px-4">
            <label htmlFor="transactionType" className="mb-2 text-xs font-bold">
              Transaction Type
            </label>
            <div className="border rounded-lg w-full bg-gray-100 relative ">
              <div
                onClick={toggleDropdown}
                className="selected-items overflow-hidden  p-2 text-sm "
              >
                {transactionType.length === 0 ? (
                  <span className="placeholder">Select Transaction Type</span>
                ) : (
                  transactionType.map((type, index) => (
                    <span
                      key={index}
                      className="selected-item whitespace-nowrap overflow-hidden"
                    >
                      {type},
                    </span>
                  ))
                )}
              </div>
              {isOpen && (
                <div className="w-full bg-white flex flex-col items-start rounded-lg px-2 shadow-lg text-sm font-bold">
                  <label className="flex gap-3 items-center justify-center">
                    <input
                      type="checkbox"
                      value="Store Transactions"
                      checked={transactionType.includes("Store Transactions")}
                      onChange={() =>
                        handleTransactionTypeChange("Store Transactions")
                      }
                      className="color-black"
                    />
                    Store transactions
                  </label>
                  <label className="flex gap-3 items-center justify-center">
                    <input
                      type="checkbox"
                      value="Get Tipped"
                      checked={transactionType.includes("Get Tipped")}
                      onChange={() => handleTransactionTypeChange("Get Tipped")}
                      className="color-black"
                    />
                    Get Tipped
                  </label>
                  <label className="flex gap-3 items-center justify-center">
                    <input
                      type="checkbox"
                      value="Withdrawals"
                      checked={transactionType.includes("Withdrawals")}
                      onChange={() =>
                        handleTransactionTypeChange("Withdrawals")
                      }
                      className="color-black"
                    />
                    Withdrawals
                  </label>

                  <label className="flex gap-3 items-center justify-center">
                    <input
                      type="checkbox"
                      value="Chargebacks"
                      checked={transactionType.includes("Chargebacks")}
                      onChange={() =>
                        handleTransactionTypeChange("Chargebacks")
                      }
                      className="color-black"
                    />
                    Chargebacks
                  </label>

                  <label className="flex gap-3 items-center justify-center">
                    <input
                      type="checkbox"
                      value="Cashbacks"
                      checked={transactionType.includes("Cashbacks")}
                      onChange={() => handleTransactionTypeChange("Cashbacks")}
                      className="color-black"
                    />
                    Cashbacks
                  </label>

                  <label className="flex gap-3 items-center justify-center">
                    <input
                      type="checkbox"
                      value="Refer & Earn"
                      checked={transactionType.includes("Refer & Earn")}
                      onChange={() =>
                        handleTransactionTypeChange("Refer & Earn")
                      }
                      className="color-black"
                    />
                    Refer & Earn
                  </label>
                </div>
              )}
            </div>
          </div>
          <div className="mb-4 w-full text-left px-4">
            <label
              htmlFor="transactionStatus"
              className="mr-2 text-xs font-bold"
            >
              Transaction Status
            </label>
            <div className="border rounded-lg w-full bg-gray-100 ">
              <div
                onClick={toggleDropdown2}
                className="selected-items w-full overflow-hidden p-2 text-sm "
              >
                {transactionStatus.length === 0 ? (
                  <span className="placeholder">Select Transaction Status</span>
                ) : (
                  transactionStatus.map((status, index) => (
                    <span
                      key={index}
                      className="selected-item whitespace-nowrap overflow-hidden "
                    >
                      {status},
                    </span>
                  ))
                )}
              </div>
              {isStatusOpen && (
                <div className="w-full bg-white flex flex-col items-start rounded-lg px-2 text-sm font-bold">
                  <label className="flex gap-3 items-center justify-center">
                    <input
                      type="checkbox"
                      value="successful"
                      checked={transactionStatus.includes("Successful")}
                      onChange={() => {
                        handleTransactionStatusChange("Successful");
                      }}
                      className="color-black"
                    />
                    Successful
                  </label>
                  <label className="flex gap-3 items-center justify-center">
                    <input
                      type="checkbox"
                      value="pending"
                      checked={transactionStatus.includes("Pending")}
                      onChange={() => {
                        handleTransactionStatusChange("Pending");
                      }}
                      className="color-black"
                    />
                    Pending
                  </label>
                  <label className="flex gap-3 items-center justify-center">
                    <input
                      type="checkbox"
                      value="failed"
                      checked={transactionStatus.includes("Failed")}
                      onChange={() => {
                        handleTransactionStatusChange("Failed");
                      }}
                      className="color-black"
                    />
                    Failed
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-4 w-full items-center justify-center px-4  absolute bottom-2">
          <button
            className="bg-white w-1/2 text-black font-bold py-2 px-4 rounded-full border"
            onClick={handleClearFilter}
          >
            Clear
          </button>
          <button
            className="bg-black w-1/2 text-white font-bold py-2 px-4 rounded-full"
            onClick={handleApplyFilter}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};
const TransactionCard: React.FC<{ transaction: ApiResponse }> = ({
  transaction,
}) => {
  useEffect(() => {}, [transaction]);

  return (
    <div className="w-full flex justify-between items-center text-left">
      <div>
        <p className="text-sm">{transaction.metadata?.product_name}</p>
        <p className="text-xs text-gray-400">{transaction.metadata?.name}</p>
      </div>
      <div className="text-right">
        <p className="font-bold">USD {transaction.amount}</p>
        <p className="text-xs text-gray-400">{transaction.date}</p>
      </div>
    </div>
  );
};

export default Transactions;
