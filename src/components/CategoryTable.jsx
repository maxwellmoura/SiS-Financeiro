// src/components/CategoryTable.jsx
export default function CategoryTable({ rows }) {
  return (
    <table className="table-basic">
      <thead>
        <tr>
          <th>Categoria</th>
          <th>Quinzena 01</th>
          <th>Quinzena 15</th>
          <th>Caixinha</th>
          <th>Pagos</th>
          <th>Total (Valor)</th>
        </tr>
      </thead>

      <tbody>
        {rows.length === 0 && (
          <tr>
            <td colSpan={6} style={{ textAlign: "center" }}>
              Nenhum dado encontrado.
            </td>
          </tr>
        )}

        {rows.map((item, index) => (
          <tr key={`${item.categoria || item.categoriaNome}-${index}`}>
            <td>{item.categoriaNome || item.categoria || "Sem categoria"}</td>
            <td>{item.quinzena01.toFixed(2)}</td>
            <td>{item.quinzena15.toFixed(2)}</td>
            <td>{item.caixinha.toFixed(2)}</td>
            <td>{item.pagos ? "Sim" : "Não"}</td>
            <td>{item.valor.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
