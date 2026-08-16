import { expect, test } from "@playwright/test";

const siteUrl = "https://craghilladvisory.com";

test("publishes indexable metadata for the home page", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/LLC en Estados Unidos/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    siteUrl
  );
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    "content",
    siteUrl
  );
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute(
    "content",
    "es_US"
  );
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    /index/
  );
  await expect(page.locator('link[rel="icon"]')).toHaveAttribute(
    "href",
    /icon.*\.jpg/
  );

  const organization = page.locator(
    'script[type="application/ld+json"]'
  );
  const jsonLd = JSON.parse((await organization.textContent()) ?? "{}");

  expect(jsonLd["@type"]).toBe("Organization");
  expect(jsonLd.url).toBe(`${siteUrl}/`);
  expect(jsonLd.email).toBe("soporte@craghilladvisory.com");
  expect(jsonLd.telephone).toBe("+1-505-207-2705");
});

test("publishes robots and sitemap routes", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBeTruthy();
  await expect(robots.text()).resolves.toContain(
    `Sitemap: ${siteUrl}/sitemap.xml`
  );

  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBeTruthy();
  const xml = await sitemap.text();
  expect(xml).toContain(`<loc>${siteUrl}/</loc>`);
  expect(xml).toContain("<priority>1</priority>");
});
