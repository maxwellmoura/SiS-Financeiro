import { useState } from "react";
import { useFinance } from "../context/FinanceContext";

export default function Lancamentos() {
  const { db, addGasto, deleteGasto, getGastosByMesId, toggleGastoPago } = useFinance();

  const [mesId, setMesId] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [quinzena01, setQuinzena01] = useState("");
  const [quinzena15, setQuinzena15] = useState("");
  const [caixinha, setCaixinha] = useState("");
  const [pagos, setPagos] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    const mid = Number(mesId);
    const cid = Number(categoriaId);
    if (!mid || !cid) return;
    addGasto(mid, cid, { quinzena01, quinzena15, caixinha, pagos });
    setQuinzena01("");
    setQuinzena15("");
    setCaixinha("");
    setPagos(false);
  };

  const gastosMes =
    mesId !== "" ? getGastosByMesId(Number(mesId)) : [];

  const totalMes = gastosMes.reduce((sum, g) => sum + g.valor, 0);

  return (
    <div className="page">
      <h2>Lançamentos Mensais</h2>

      <form onSubmit={handleAdd} className="month-selector">
        <div className="field">
          <label>Mês</label>
          <select
            value={mesId}
            onChange={(e) => setMesId(e.target.value)}
          >
            <option value="">Selecione...</option>
            {db.meses
              .slice()
              .sort((a, b) => (a.ano - b.ano) || (a.mes - b.mes))
              .map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
          </select>
        </div>

        <div className="field">
          <label>Categoria</label>
          <select
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
          >
            <option value="">Selecione...</option>
            {db.categorias
              .slice()
              .sort((a, b) => a.nome.localeCompare(b.nome))
              .map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
              ))}
          </select>
        </div>

        <div className="field">
          <label>Quinzena 01</label>
          <input
            type="number"
            value={quinzena01}
            onChange={(e) => setQuinzena01(e.target.value)}
            step="0.01"
          />
        </div>

        <div className="field">
          <label>Quinzena 15</label>
          <input
            type="number"
            value={quinzena15}
            onChange={(e) => setQuinzena15(e.target.value)}
            step="0.01"
          />
        </div>

        <div className="field">
          <label>Caixinha</label>
          <input
            type="number"
            value={caixinha}
            onChange={(e) => setCaixinha(e.target.value)}
            step="0.01"
          />
        </div>

        <div className="field">
          <label>Pago?</label>
          <input
            type="checkbox"
            checked={pagos}
            onChange={(e) => setPagos(e.target.checked)}
          />
        </div>

        <div className="field">
          <label>&nbsp;</label>
          <button type="submit" disabled={!mesId || !categoriaId}>
            <span className="button_top">Adicionar lançamento</span>
          </button>
        </div>
      </form>

      {mesId && (
        <>
          <h3>
            Lançamentos do mês selecionado — Total:{" "}
            <strong>R$ {totalMes.toFixed(2)}</strong>
          </h3>

          <table className="table-basic">
            <thead>
              <tr>
                <th>Categoria</th>
                <th>Q. 01</th>
                <th>Q. 15</th>
                <th>Caixinha</th>
                <th>Pago?</th>
                <th>Total</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {gastosMes.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center" }}>
                    Nenhum lançamento para este mês.
                  </td>
                </tr>
              )}

              {gastosMes.map((g) => (
                <tr key={g.id}>
                  <td>{g.categoriaNome}</td>
                  <td>{g.quinzena01.toFixed(2)}</td>
                  <td>{g.quinzena15.toFixed(2)}</td>
                  <td>{g.caixinha.toFixed(2)}</td>
                  <td style={{ textAlign: "center" }}>
                    <input
                      type="checkbox"
                      checked={g.pagos}
                      onChange={() => toggleGastoPago(g.id)}
                    />
                  </td>
                  <td>{g.valor.toFixed(2)}</td>
                <td>
                  <button onClick={() => deleteGasto(g.id)}>
                    <span className="button_top">Excluir</span>
                  </button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
