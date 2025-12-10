import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "finance-db-v1";

const FinanceContext = createContext();

function createInitialDb() {
  const categoriasIniciais = [
    "LAZER",
    "CARTÃO",
    "TATUAGEM",
    "PRESENTES",
    "JOGOS",
    "COMIDA",
    "SAÍDAS",
    "TRANSPORTE",
    "GASOLINA",
    "IPVA + LICEN",
    "SEGURO",
    "MANUTENÇÃO",
    "SAÚDE",
    "KICKBOXER",
    "JIU-JITSU",
    "FARMÁCIA",
    "PSICÓLOGO",
    "FUTURO",
    "EDUCAÇÃO",
    "VIAGEM",
    "BELEZA (corte/barba)",
    "ROUPAS/CALÇADOS",
    "PERFUMARIA (banho/barba)",
  ];

  return {
    meses: [],
    categorias: categoriasIniciais.map((nome, idx) => ({
      id: idx + 1,
      nome,
    })),
    gastos: [],
  };
}

function loadDbFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createInitialDb();
    const parsed = JSON.parse(raw);

    return {
      meses: parsed.meses || [],
      categorias: parsed.categorias || [],
      gastos: parsed.gastos || [],
    };
  } catch {
    return createInitialDb();
  }
}

function saveDbToStorage(db) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}

export function FinanceProvider({ children }) {
  const [db, setDb] = useState(() => loadDbFromStorage());

  useEffect(() => {
    saveDbToStorage(db);
  }, [db]);

  const getNextId = (items) =>
    items.length === 0 ? 1 : Math.max(...items.map((i) => i.id)) + 1;

  // -----------------------------
  //        MESES (CRUD)
  // -----------------------------

  const addMes = (ano, mes) => {
    const exists = db.meses.some((m) => m.ano === ano && m.mes === mes);
    if (exists) return;

    const id = getNextId(db.meses);

    const nomes = {
      1: "Janeiro",
      2: "Fevereiro",
      3: "Março",
      4: "Abril",
      5: "Maio",
      6: "Junho",
      7: "Julho",
      8: "Agosto",
      9: "Setembro",
      10: "Outubro",
      11: "Novembro",
      12: "Dezembro",
    };

    const novo = {
      id,
      ano,
      mes,
      label: `${nomes[mes]}/${ano}`,
    };

    setDb((prev) => ({
      ...prev,
      meses: [...prev.meses, novo],
    }));
  };

  const removeMes = (id) => {
    setDb((prev) => ({
      ...prev,
      meses: prev.meses.filter((m) => m.id !== id),
      gastos: prev.gastos.filter((g) => g.mesId !== id),
    }));
  };

  const getYears = () => {
    return Array.from(new Set(db.meses.map((m) => m.ano))).sort(
      (a, b) => a - b
    );
  };

  const getMonthsByYear = (year) => {
    return db.meses
      .filter((m) => m.ano === year)
      .map((m) => m.mes)
      .sort((a, b) => a - b);
  };

  const getMonthLabel = (num) => {
    const nomes = {
      1: "Janeiro",
      2: "Fevereiro",
      3: "Março",
      4: "Abril",
      5: "Maio",
      6: "Junho",
      7: "Julho",
      8: "Agosto",
      9: "Setembro",
      10: "Outubro",
      11: "Novembro",
      12: "Dezembro",
    };
    return nomes[num];
  };

  const findMesByAnoMes = (ano, mes) =>
    db.meses.find((m) => m.ano === ano && m.mes === mes) || null;


  const addCategoria = (nome) => {
    const nomeTrim = nome.trim();
    if (!nomeTrim) return;

    const exists = db.categorias.some(
      (c) => c.nome.toLowerCase() === nomeTrim.toLowerCase()
    );
    if (exists) return;

    const id = getNextId(db.categorias);
    const nova = { id, nome: nomeTrim };

    setDb((prev) => ({
      ...prev,
      categorias: [...prev.categorias, nova],
    }));
  };

  const updateCategoria = (id, novoNome) => {
    const nomeTrim = novoNome.trim();
    if (!nomeTrim) return;

    setDb((prev) => ({
      ...prev,
      categorias: prev.categorias.map((c) =>
        c.id === id ? { ...c, nome: nomeTrim } : c
      ),
    }));
  };

  const deleteCategoria = (id) => {
    const hasGastos = db.gastos.some((g) => g.categoriaId === id);

    if (hasGastos) {
      alert("Não é possível excluir esta categoria, pois existem gastos vinculados.");
      return;
    }

    setDb((prev) => ({
      ...prev,
      categorias: prev.categorias.filter((c) => c.id !== id),
    }));
  };


  const addGasto = (mesId, categoriaId, campos) => {
    const id = getNextId(db.gastos);

    const q1 = Number(campos.quinzena01) || 0;
    const q15 = Number(campos.quinzena15) || 0;
    const cx = Number(campos.caixinha) || 0;
    const pagoFlag = Boolean(campos.pagos);

    const novo = {
      id,
      mesId,
      categoriaId,
      quinzena01: q1,
      quinzena15: q15,
      caixinha: cx,
      pagos: pagoFlag,
      valor: q1 + q15 + cx,
    };

    setDb((prev) => ({
      ...prev,
      gastos: [...prev.gastos, novo],
    }));
  };

  const deleteGasto = (id) => {
    setDb((prev) => ({
      ...prev,
      gastos: prev.gastos.filter((g) => g.id !== id),
    }));
  };

  const toggleGastoPago = (id) => {
    setDb((prev) => ({
      ...prev,
      gastos: prev.gastos.map((g) =>
        g.id === id ? { ...g, pagos: !Boolean(g.pagos) } : g
      ),
    }));
  };

  const getGastosByMesId = (mesId) =>
    db.gastos
      .filter((g) => g.mesId === mesId)
      .map((g) => {
        const cat = db.categorias.find((c) => c.id === g.categoriaId);
        const valorCalc =
          typeof g.valor === "number"
            ? g.valor
            : (Number(g.quinzena01) || 0) +
              (Number(g.quinzena15) || 0) +
              (Number(g.caixinha) || 0);

        return {
          ...g,
          categoriaNome: cat ? cat.nome : "Sem categoria",
          pagos: Boolean(g.pagos),
          valor: valorCalc,
        };
      });

  const getByMonth = (ano, mes) => {
    const m = findMesByAnoMes(ano, mes);
    if (!m) return [];
    return getGastosByMesId(m.id);
  };

  const getTotalByCategory = () => {
    const totals = {};

    db.gastos.forEach((g) => {
      const cat = db.categorias.find((c) => c.id === g.categoriaId);
      const nome = cat?.nome || "Sem categoria";

      totals[nome] = (totals[nome] || 0) + g.valor;
    });

    return totals;
  };

 
  const exportDb = () => JSON.stringify(db, null, 2);

  const importDb = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      setDb({
        meses: parsed.meses || [],
        categorias: parsed.categorias || [],
        gastos: parsed.gastos || [],
      });
    } catch (e) {
      alert("JSON inválido!");
    }
  };

  return (
    <FinanceContext.Provider
      value={{
        db,
        addMes,
        removeMes,
        getYears,
        getMonthsByYear,
        getMonthLabel,
        findMesByAnoMes,

        addCategoria,
        updateCategoria,
        deleteCategoria,

        addGasto,
        deleteGasto,
        toggleGastoPago,
        getGastosByMesId,
        getByMonth,

        getTotalByCategory,
        exportDb,
        importDb,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export const useFinance = () => useContext(FinanceContext);
