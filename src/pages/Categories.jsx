import { useFinance } from "../context/FinanceContext";

export default function Categories() {
  const { getTotalByCategory } = useFinance();
  const totals = getTotalByCategory();

  const rows = Object.entries(totals).map(([categoria, total]) => ({
    categoria,
    total,
  }));

  return (
    <div className="page">
      <h2>Total por Categoria (Todos os Meses)</h2>
      
      <table className="table-basic">
        <thead>
          <tr>
            <th>Categoria</th>
            <th>Total (R$)</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td colSpan={2} style={{ textAlign: "center" }}>
                Nenhum dado encontrado.
              </td>
            </tr>
          )}

          {rows.map((row) => (
            <tr key={row.categoria}>
              <td>{row.categoria}</td>
              <td>{row.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}