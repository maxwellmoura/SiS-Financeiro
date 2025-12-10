
# 📊 Controle Financeiro Pessoal (React + LocalStorage)

Este projeto é um **sistema completo de controle financeiro pessoal**, desenvolvido em **React + Vite**, com armazenamento 100% local via **LocalStorage**, permitindo cadastrar categorias, meses e lançamentos, além de gerar dashboards e relatórios automaticamente.

---

## 🚀 Tecnologias Utilizadas
- **React.js (Vite)**
- **JavaScript**
- **HTML5 + CSS3**
- **LocalStorage**
- **Context API (para gerenciamento global de estado)**

---

## 📁 Estrutura Geral do Projeto

```
src/
 ├── components/
 │    ├── Layout.jsx
 │    ├── PieChart.jsx
 │    ├── CategoryTable.jsx
 │    ├── MonthSelector.jsx
 │
 ├── context/
 │    └── FinanceContext.jsx
 │
 ├── pages/
 │    ├── Dashboard.jsx
 │    ├── Categories.jsx
 │    ├── Months.jsx
 │    ├── ManageCategories.jsx
 │    ├── ManageMonths.jsx
 │    ├── Lancamentos.jsx
 │
 ├── utils/
 │    └── format.js
 │
 ├── data/
 │    └── bd.json (opcional)
```

---

## 🧠 Funcionalidades

### ✔ Categorias (CRUD)
- Adicionar novas categorias  
- Editar categorias existentes  
- Excluir categorias (caso não tenham lançamentos vinculados)

### ✔ Meses (CRUD)
- Criar meses com ano + número do mês  
- Remover meses  
- Vincular lançamentos automaticamente ao mês criado

### ✔ Lançamentos (CRUD)
- Informar valores por:
  - **Quinzena 01**
  - **Quinzena 15**
  - **Caixinha**
  - **Pagos**
- O sistema calcula automaticamente o **total da categoria** naquele mês.

### ✔ Dashboard
- Exibe gráfico de pizza com a distribuição de gastos por categoria.
- Cálculo automático baseado em todos os lançamentos.

### ✔ Visão Mensal
- Filtragem por ano e mês
- Exibição detalhada dos gastos do período

### ✔ Exportação e Importação (Backup)
- Exporta todo o banco (meses, categorias, lançamentos)
- Permite restaurar backup completo via upload

---

## 🛠 Como Executar o Projeto

### 1. Instale as dependências:
```
npm install
```

### 2. Execute o servidor de desenvolvimento:
```
npm run dev
```

### 3. Acesse no navegador:
```
http://localhost:5173
```

---

## 💾 Persistência dos Dados
Todo o banco é salvo no `LocalStorage`:

- Meses  
- Categorias  
- Lançamentos  

Chave utilizada:
```
finance-db-v1
```

---

## 📦 Exportar / Importar Banco de Dados

### Exportar:
- Botão disponível na área administrativa
- Gera um arquivo `.pdf` com todo o banco

---

## 🎯 Objetivo do Projeto
O propósito deste sistema é organizar e acompanhar despesas pessoais mês a mês, mantendo simplicidade e alta performance — sem necessidade de backend.

---

## 📝 Próximas Melhorias (Sugestões)
- Autenticação (usuário local)
- Gráfico de evolução mensal
- Modo claro/escuro
- Exportação para Excel
- API opcional com Node.js

---

## 👨‍💻 Autor
Projeto desenvolvido para estudo e uso pessoal de controle financeiro.

---

## 📎 Licença
Uso livre para fins educacionais e pessoais.

---

