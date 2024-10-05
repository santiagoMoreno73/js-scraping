const { chromium } = require("playwright");

const stores = [
  {
    vendor: "Alkosto",
    url: "https://www.alkosto.com/consola-xbox-series-x-1tb-control-inalambrico/p/889842640755",
    checkName: async ({ page }) => {
        const content = await page.textContent('.new-container__header__title');
        return content;
    },
    checkStock: async ({ page }) => {
      const content = await page.textContent('[aria-label="Agregar al carrito"]');
      return hasStock = content.includes("Agregar al carrito") ? true : false;
    },
    checkPrice: async({page}) => {
      const content = await page.textContent('#js-original_price');
      console.log(content)
      return content;
    }
  },
  {
    vendor: "Ktronix",
    url: "https://www.ktronix.com/consola-xbox-series-x-1-control-inalambrico-paquete-juego-digital-diablo-iv/p/196388125760",
    checkName: async ({ page }) => {
        const content = await page.textContent('.new-container__header__title');
        return content;
    },
    checkStock: async ({ page }) => {
      const content = await page.textContent('[aria-label="Agregar al carrito"]');
      return content.includes("Agregar al carrito") ? true : false;
    },
    checkPrice: async({ page }) => {
      const content = await page.textContent('#js-original_price');
      console.log(content)
      return content;
    }
  },
  {
    vendor: "Falabella",
    url: "https://www.falabella.com.co/falabella-co/product/9461744/Consola-Xbox-Series-S-512-GB/9461744",
    checkName: async ({ page }) => {
        const content = await page.textContent('.product-name');
        return content;
    },
    checkStock: async ({ page }) => {
      const content = await page.textContent('#add-to-cart-button');
      return content.includes("Agregar al Carro") ? true : false;
    },
    checkPrice: async({ page }) => {
      const content = await page.textContent('.prices-0');
      console.log(content)
      return content   
    }
  },
];

;(async () => {
  const browser = await chromium.launch({ headless: false });

  for (const store of stores) {
    const { vendor, url, checkName, checkStock, checkPrice } = store;
    
    const page = await browser.newPage();
    await page.goto(url);

    const hasStock = await checkStock({ page });
    const price = await checkPrice({ page });
    const name = await checkName({ page });
    // screenshots
    await page.screenshot({ path: "xbox.png" });

    console.log(`Producto: ${name}, Precio: ${price}, Tienda: ${vendor} - ${hasStock ? 'Si tiene stock' : 'No tiene stock'}`);

    page.close();
  }

  await browser.close();
})()

// ;(async () => {
//   const browser = await chromium.launch();
//   const page = await browser.newPage();
//   await page.goto("https://www.xbox.com/es-CO/consoles/xbox-series-x");
//   await page.screenshot({ path: "xbox.png" });
//   await browser.close();
// })();
