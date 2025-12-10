// src/components/MonthSelector.jsx
import { useFinance } from "../context/FinanceContext";

export default function MonthSelector({ year, month, onChangeYear, onChangeMonth }) {
  const { getYears, getMonthsByYear, getMonthLabel } = useFinance();

  const years = getYears();
  const months = year ? getMonthsByYear(year) : [];

  return (
    <div className="month-selector">
      <div className="field">
        <label>Ano</label>
        <select
          value={year || ""}
          onChange={(e) => onChangeYear(Number(e.target.value) || null)}
        >
          <option value="">Selecione...</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label>Mês</label>
        <select
          value={month || ""}
          onChange={(e) => onChangeMonth(Number(e.target.value) || null)}
          disabled={!year}
        >
          <option value="">Selecione...</option>
          {months.map((m) => (
            <option key={m} value={m}>
              {getMonthLabel(m)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
