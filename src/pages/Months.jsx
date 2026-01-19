// src/pages/Months.jsx
import { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import MonthSelector from "../components/MonthSelector";
import CategoryTable from "../components/CategoryTable";

export default function Months() {
  const { getByMonth, getMonthLabel } = useFinance();
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);

  const rows = year && month ? getByMonth(year, month) : [];

  const totalMes = rows.reduce((sum, item) => sum + item.valor, 0);

  return (
    <div className="page">
      <h2>Visão Mensal</h2>
      <p>Selecione um ano e um mês para ver os gastos detalhados.</p>

      <MonthSelector
        year={year}
        month={month}
        onChangeYear={setYear}
        onChangeMonth={setMonth}
      />

      {year && month && (
        <>
          <h3>
            {getMonthLabel(month)} / {year}
          </h3>
          <p>
            Total do mês: <strong>R$ {totalMes.toFixed(2)}</strong>
          </p>
        </>
      )}

      <CategoryTable rows={rows} />
    </div>
  );
}
