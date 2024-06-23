const puppeteer = require('puppeteer');

const url = 'https://www.ea.com/pt-br/ea-sports-fc/ultimate-team/web-app/';
const memo = __dirname + '/eafc';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const Clicar = async (page, selector) => {
    await page.waitForSelector(selector, { timeout: 60000 });
    await page.hover(selector);
    await sleep(3000);
    await page.click(selector);
};
const ClicarXPath = async (page, xpath) => {
    const handle = await page.$x(xpath);
    await handle[0].hover();
    await sleep(5000);
    await handle[0].click();
};
const realizarBusca = async (page) => {
    // Transferência
    await Clicar(page, 'button.ut-tab-bar-item.icon-transfer');
    // Mercado
    await Clicar(page, '.tile .tileContent');
    // Consumíveis
    await ClicarXPath(page, '//button[contains(text(), "Consumíveis")]');
    // Estilos Entrosam.
    await ClicarXPath(page, '//span[contains(text(), "Estilos Entrosam.")]');
    // Contratos
    await ClicarXPath(page, '//li[contains(text(), "Contratos")]');
    // Qualidade
    await ClicarXPath(page, '//span[contains(text(), "Qualidade")]');
    // Ouro
    await ClicarXPath(page, '//li[contains(text(), "Ouro")]');
};

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        userDataDir: memo,
        args: ['--disable-http2'],
    });

    const page = await browser.newPage();

    try {
        await page.goto(url);
        await realizarBusca(page);
    } catch (error) {
        console.error('Erro durante a automação:', error);
    } finally {
        
       //  await browser.close();
    }
})();
