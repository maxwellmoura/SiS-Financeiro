import { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const { getTotalByCategory } = useFinance();
  const [statusMsg, setStatusMsg] = useState("");
  const totals = getTotalByCategory();

  const data = Object.entries(totals).map(([categoria, total]) => ({
    name: categoria,
    value: Number(total.toFixed(2)),
  }));

  const COLORS = [
    "#1976d2",
    "#9c27b0",
    "#ff9800",
    "#4caf50",
    "#e91e63",
    "#009688",
    "#3f51b5",
    "#ff5722",
  ];

  const handleExportPdf = () => {
    if (data.length === 0) {
      setStatusMsg("Sem dados para exportar.");
      return;
    }

    const win = window.open("", "_blank");
    if (!win) {
      setStatusMsg("Pop-up bloqueado pelo navegador.");
      return;
    }

    const now = new Date();
    const totalGeral = data.reduce((sum, item) => sum + item.value, 0);

    const rows = data
      .map(
        (item, idx) => `
          <tr>
            <td>${idx + 1}</td>
            <td>${item.name}</td>
            <td style="text-align:right;">R$ ${item.value.toFixed(2)}</td>
          </tr>`
      )
      .join("");

    const html = `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Relatorio Financeiro</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; color: #111; }
          h1 { margin: 0 0 6px; font-size: 18px; }
          p { margin: 4px 0 10px; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          th, td { border: 1px solid #d9d9d9; padding: 8px; font-size: 13px; }
          th { background: #f0f4ff; text-align: left; }
          tfoot td { font-weight: 700; }
        </style>
      </head>
      <body>
        <h1>Relatorio Financeiro</h1>
        <p>Gerado em ${now.toLocaleString()}</p>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Categoria</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
          <tfoot>
            <tr>
              <td colspan="2">Total</td>
              <td style="text-align:right;">R$ ${totalGeral.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </body>
    </html>`;

    win.document.write(html);
    win.document.close();
    win.focus();
    win.print();
    win.close();
    setStatusMsg("Relatorio enviado para impressao/PDF.");
  };

  return (
    <div className="page">
      <h2>Dashboard - Distribuicao de Gastos por Categoria</h2>
      <p>
        Este grafico representa a soma de <strong>Valor</strong>
      </p>

      <div className="report-export">
        <div>
          <h3>Exportar relatorio</h3>
          <p>Gera um PDF/Impressao com os totais por categoria.</p>
        </div>
        <div className="report-actions">
          <button onClick={handleExportPdf}>
            <span className="button_top">Exportar relatorio (PDF)</span>
          </button>
        </div>
      </div>
      {statusMsg && <p className="report-status">{statusMsg}</p>}

      {data.length === 0 ? (
        <p>Carregando dados...</p>
      ) : (
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
