import { expect, test } from "@playwright/test";

const bannedInternalCopy = [
  "Tarjetas que aparecen",
  "modelo 3D improvisado",
  "La competencia vende",
  "Puedes comunicarlo",
  "La pagina no promete",
];

test.describe("landing page", () => {
  test("renders the stronger offer and live price content", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Aprende Microneedling Facial + BBLips en 12 lecciones online — desde 10 USD",
      }),
    ).toBeVisible();

    await expect(page.getByText("No perder el descuento del 60% — Inscribirme ahora")).toBeVisible();
    await expect(page.getByText("Aprende el paso a paso antes de invertir en equipos o atender modelos")).toBeVisible();
    await expect(page.getByText(/COP/).first()).toBeVisible();

    for (const phrase of bannedInternalCopy) {
      await expect(page.getByText(phrase)).toHaveCount(0);
    }
  });

  test("keeps the mobile hero compact and actionable", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Mobile-only layout check");

    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("link", { name: "No perder el descuento del 60% — Inscribirme ahora" })).toBeVisible();

    const horizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    expect(horizontalOverflow).toBe(false);

    const heroBox = await page.locator(".hero-section").boundingBox();
    expect(heroBox?.height ?? 0).toBeLessThan(1500);
  });
});
