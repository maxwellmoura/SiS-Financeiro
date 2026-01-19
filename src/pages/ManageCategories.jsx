import { useState } from "react";
import { useFinance } from "../context/FinanceContext";

export default function ManageCategories() {
  const { db, addCategoria, updateCategoria, deleteCategoria } = useFinance();

  const [nome, setNome] = useState("");
  const [editId, setEditId] = useState(null);
  const [editNome, setEditNome] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    addCategoria(nome);
    setNome("");
  };

  const startEdit = (cat) => {
    setEditId(cat.id);
    setEditNome(cat.nome);
  };

  const saveEdit = () => {
    updateCategoria(editId, editNome);
    setEditId(null);
    setEditNome("");
  };

  return (
    <div className="page">
      <h2>Gerenciar Categorias</h2>

      <form onSubmit={handleAdd} className="month-selector">
        <div className="field">
          <label>Nova categoria</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <button type="submit">
          <span className="button_top">Adicionar</span>
        </button>
      </form>

      <h3>Categorias cadastradas</h3>

      <table className="table-basic">
        <thead>
          <tr>
            <th>Categoria</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {db.categorias.map((c) => (
            <tr key={c.id}>
              <td>
                <strong>{c.id}</strong>{" "}
                {editId === c.id ? (
                  <input
                    value={editNome}
                    onChange={(e) => setEditNome(e.target.value)}
                  />
                ) : (
                  c.nome
                )}
              </td>

              <td>
                {editId === c.id ? (
                  <>
                    <button onClick={saveEdit}>
                      <span className="button_top">Salvar</span>
                    </button>
                    <button onClick={() => setEditId(null)}>
                      <span className="button_top">Cancelar</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEdit(c)}>
                      <span className="button_top">Editar</span>
                    </button>
                    <button onClick={() => deleteCategoria(c.id)}>
                      <span className="button_top">Excluir</span>
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}