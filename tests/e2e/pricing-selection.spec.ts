import { expect, test } from "@playwright/test";

test("preselects Monitoring when its plan CTA opens the consultation form", async ({
  page,
}) => {
  await page.goto("/#planes");

  await page.getByRole("button", { name: "Activar Monitoring" }).click();

  const dialog = page.getByRole("dialog", { name: "Agenda tu consulta" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByLabel("Tipo de consulta")).toHaveValue("Monitoring");
});

test("preselects an additional service when requesting it", async ({ page }) => {
  await page.goto("/#planes");

  await page
    .getByRole("button", { name: "Solicitar Presentación Fiscal Anual" })
    .click();

  const dialog = page.getByRole("dialog", { name: "Agenda tu consulta" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByLabel("Tipo de consulta")).toHaveValue(
    "Presentación Fiscal Anual"
  );
});

test("reveals the complete pricing section on a mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const pricing = page.locator("#planes");
  await pricing.scrollIntoViewIfNeeded();

  await expect
    .poll(async () => Number(await pricing.evaluate((element) => getComputedStyle(element).opacity)))
    .toBeGreaterThan(0.9);
});

test("explains that Banking and Payments is a discounted two-service bundle", async ({
  page,
}) => {
  await page.goto("/#planes");

  const bundle = page
    .getByRole("article")
    .filter({ has: page.getByRole("heading", { name: "Banking + Payments" }) });

  await expect(
    bundle.getByText("Cuenta bancaria", { exact: true })
  ).toBeVisible();
  await expect(
    bundle.getByText("Procesador de pagos", { exact: true })
  ).toBeVisible();
  await expect(bundle.getByText("$298", { exact: true })).toBeVisible();
  await expect(bundle.getByText("$249", { exact: true })).toBeVisible();
  await expect(bundle.getByText("Ahorras $49", { exact: true })).toBeVisible();
  await expect(
    bundle.getByRole("button", { name: "Solicitar servicios" })
  ).toBeVisible();
});
