import { test, expect } from "@playwright/test";

test("fluxo principal: navegacao, cadastros e lancamentos", async ({ page }) => {
  await page.goto("/");

  // Redireciona para o dashboard
  await expect(page).toHaveURL(/dashboard/);
  await expect(page.getByRole("heading", { name: /Dashboard/i })).toBeVisible();

  // Gerenciar meses - cria mes base para o fluxo
  await page.locator('a[href="/gerenciar-meses"]').click();
  await expect(page.getByRole("heading", { name: /Gerenciar Meses/i })).toBeVisible();

  await page.getByPlaceholder(/Ano/i).fill("2025");
  await page.getByPlaceholder(/1-12/).fill("1");
  await page.getByRole("button", { name: /Adicionar/i }).click();
  await expect(page.getByText(/Janeiro\/2025/)).toBeVisible();

  // Gerenciar categorias - cria categoria de teste
  await page.locator('a[href="/gerenciar-categorias"]').click();
  await expect(page.getByRole("heading", { name: /Gerenciar Categorias/i })).toBeVisible();

  const categoriaNome = `Categoria E2E ${Date.now()}`;
  await page.locator('form input[type="text"]').first().fill(categoriaNome);
  await page.getByRole("button", { name: /Adicionar/i }).click();
  await expect(page.getByText(categoriaNome)).toBeVisible();

  // Lancamentos - adiciona um gasto e valida tabela
  await page.locator('a[href="/lancamentos"]').click();
  await expect(page.getByRole("heading", { name: /Lan/i })).toBeVisible();

  const lancSelects = page.locator("select");
  await lancSelects.nth(0).selectOption({ label: "Janeiro/2025" });
  await lancSelects.nth(1).selectOption({ label: categoriaNome });

  const valores = page.getByRole("spinbutton");
  await valores.nth(0).fill("100");
  await valores.nth(1).fill("50");
  await valores.nth(2).fill("25");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: /Adicionar/i }).click();

  const rowLancamento = page.getByRole("row", { name: new RegExp(categoriaNome) });
  await expect(rowLancamento).toBeVisible();
  await expect(rowLancamento.getByText("175.00")).toBeVisible();

  // Tela de categorias (totais agregados)
  await page.locator('a[href="/categorias"]').click();
  await expect(page.getByRole("heading", { name: /Total por Categoria/i })).toBeVisible();
  await expect(page.getByText(categoriaNome)).toBeVisible();
  await expect(page.getByText("175.00")).toBeVisible();

  // Visao mensal com selector
  await page.locator('a[href="/meses"]').click();
  await expect(page).toHaveURL(/\/meses$/);
  await expect(page.getByRole("heading", { name: /Vis/i })).toBeVisible();

  const selectors = page.locator("select");
  await selectors.nth(0).selectOption("2025");
  await selectors.nth(1).selectOption("1");

  const rowMes = page.getByRole("row", { name: new RegExp(categoriaNome) });
  await expect(rowMes).toBeVisible();
  await expect(rowMes.getByText("175.00")).toBeVisible();
});
