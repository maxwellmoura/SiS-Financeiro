import { useState } from "react";
import { useFinance } from "../context/FinanceContext";

export default function ManageMonths() {
  const { db, addMes, removeMes } = useFinance();

  const [ano, setAno] = useState("");
  const [mes, setMes] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    addMes(Number(ano), Number(mes));
    setAno("");
    setMes("");
  };

  return (
    <div className="page">
      <h2>Gerenciar Meses</h2>

      <form onSubmit={handleAdd} className="month-selector">
        <input
          type="number"
          placeholder="Ano"
          value={ano}
          onChange={(e) => setAno(e.target.value)}
        />
        <input
          type="number"
          placeholder="Mês (1-12)"
          value={mes}
          onChange={(e) => setMes(e.target.value)}
        />
        <button type="submit">
          <span className="button_top">Adicionar</span>
        </button>
      </form>

      <h3>Meses cadastrados</h3>

      <table className="table-basic">
        <thead>
          <tr>
            <th>ID</th>
            <th>Mês</th>
            <th>Ano</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {db.meses.map((m) => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.label}</td>
              <td>{m.ano}</td>
              <td>
                <button onClick={() => removeMes(m.id)}>
                  <span className="button_top">Excluir</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
