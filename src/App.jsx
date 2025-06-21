import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState(0);
  const [currentSelection, setCurrentSelection] = useState("expense");
  const [profitLoss, setProfitLoss] = useState(0);
  const [revenueExpenseList, setRevenueExpenseList] = useState([]);
  const handleInputValue = (e) => {
    const value = e.target.value;
    setInputValue(+value);
  };
  const handleSelection = (e) => {
    const value = e.target.value;
    setCurrentSelection(value);
  };
  const handleAdd = () => {
    if (currentSelection === "revenue") {
      const revenue = {
        type: "revenue",
        amount: inputValue,
      };
      setRevenueExpenseList([...revenueExpenseList, revenue]);

      return;
    }
    const expense = {
      type: "expense",
      amount: inputValue,
    };
    setRevenueExpenseList([...revenueExpenseList, expense]);
  };
  const handleDeletion = (index) => {
    const filteredArray = revenueExpenseList.filter((eachElement, _ind) => {
      return index != _ind;
    });
    setRevenueExpenseList(filteredArray);
  };
  useEffect(() => {
    const revenueArray = revenueExpenseList.filter((eachElement) => {
      return eachElement.type == "revenue";
    });
    const AddedRevenue = revenueArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue.amount,
      0
    );
    const expenseArray = revenueExpenseList.filter((eachElement) => {
      return eachElement.type == "expense";
    });
    const SubstractedExpense = expenseArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue.amount,
      0
    );
    const finalResultProfitOrLoss = +AddedRevenue - +SubstractedExpense;
    setProfitLoss(finalResultProfitOrLoss);
  }, [revenueExpenseList]);
  return (
    <div className="h-screen  flex justify-center items-center bg-amber-400">
      <div>
        <div className="flex gap-1.5">
          <input
            type="number"
            value={inputValue}
            onChange={handleInputValue}
            className="bg-amber-700"
          />
          <select onChange={(e) => handleSelection(e)} value={currentSelection}>
            <option value="expense">expense</option>
            <option value="revenue">revenue</option>
          </select>
          <button className="bg-amber-50" onClick={handleAdd}>
            Add
          </button>
        </div>
        <div>
          <ul>
            {revenueExpenseList.map((eachExpenseRevenue, index) => {
              return (
                <li>
                  {eachExpenseRevenue.amount}-
                  {eachExpenseRevenue.type === "expense"
                    ? "expense"
                    : "revenue"}
                  <button onClick={() => handleDeletion(index)}>DELETE</button>
                </li>
              );
            })}
          </ul>
          <span>{profitLoss}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
