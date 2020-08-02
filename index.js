"use strict";

const cron = require("node-cron");
const fastify  = require("fastify");
const fs = require("fs");
const puppeteer = require("puppeteer");

const app = fastify();

let cronTimestamp;
let jsonTimestamp;

let pharmacies = JSON.parse(fs.readFileSync('pharmasgarde.json', 'utf8'));

cron.schedule("*/1 * * * *", function() {
    console.log("---------------------");
    console.log("Running Cron Job");

    get3237().then(text => {
        let data = JSON.stringify(text, null, 2);
        
        fs.writeFile('pharmasgarde.json', data, function (err) {
            if (err) return console.log(err);
            console.log('Fichier écrit');
        });

        cronTimestamp = new Date (Date.now());

    });
});

async function get3237 () {
    
    const browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox", "--lang=fr-FR"],
    });


    const page = await browser.newPage();

    await page.goto("http://www.3237.fr/");
    await page.waitFor('input[name=cp]');
    await page.type('input[name=cp]', '95150');
    await page.click('input[type="submit"]');
    await page.waitForSelector('body > table:nth-child(1) > tbody > tr > td > table > tbody > tr:nth-child(1) > td:nth-child(1) > table:nth-child(4) > tbody > tr > td > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(2) > table:nth-child(2) > tbody > tr:nth-child(1) > td.font8pt > font > input[type=radio]');
    await page.click('body > table:nth-child(1) > tbody > tr > td > table > tbody > tr:nth-child(1) > td:nth-child(1) > table:nth-child(4) > tbody > tr > td > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(2) > table:nth-child(2) > tbody > tr:nth-child(1) > td.font8pt > font > input[type=radio]');
    await page.click('input[type="submit"]');
    await page.waitForSelector('body > table:nth-child(1) > tbody > tr > td > table > tbody > tr:nth-child(1) > td:nth-child(1) > div > table:nth-child(4) > tbody > tr > td > table:nth-child(2) > tbody > tr > td > table > tbody > tr:nth-child(1) > td > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(1) > td.font9pt > b > font');
    
    const text = await page.evaluate(() => {
    
        const pharmas = [];
        pharmas.push(
        {
            name : document.querySelector('body > table:nth-child(1) > tbody > tr > td > table > tbody > tr:nth-child(1) > td:nth-child(1) > div > table:nth-child(4) > tbody > tr > td > table:nth-child(2) > tbody > tr > td > table > tbody > tr:nth-child(1) > td > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(1) > td.font9pt > b > font').textContent.trim(),
            adresse : document.querySelector('body > table:nth-child(1) > tbody > tr > td > table > tbody > tr:nth-child(1) > td:nth-child(1) > div > table:nth-child(4) > tbody > tr > td > table:nth-child(2) > tbody > tr > td > table > tbody > tr:nth-child(1) > td > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > font').textContent.trim(),
            horaire : document.querySelector('body > table:nth-child(1) > tbody > tr > td > table > tbody > tr:nth-child(1) > td:nth-child(1) > div > table:nth-child(4) > tbody > tr > td > table:nth-child(2) > tbody > tr > td > table > tbody > tr:nth-child(1) > td > table:nth-child(1) > tbody > tr > td > p > font').textContent.trim()

        });
        pharmas.push(
        {
            name : document.querySelector('body > table:nth-child(1) > tbody > tr > td > table > tbody > tr:nth-child(1) > td:nth-child(1) > div > table:nth-child(4) > tbody > tr > td > table:nth-child(2) > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(1) > td.font9pt > b > font').textContent.trim(),
            adresse : document.querySelector('body > table:nth-child(1) > tbody > tr > td > table > tbody > tr:nth-child(1) > td:nth-child(1) > div > table:nth-child(4) > tbody > tr > td > table:nth-child(2) > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > font').textContent.trim(),
            horaire : document.querySelector('body > table:nth-child(1) > tbody > tr > td > table > tbody > tr:nth-child(1) > td:nth-child(1) > div > table:nth-child(4) > tbody > tr > td > table:nth-child(2) > tbody > tr > td > table > tbody > tr:nth-child(2) > td > table:nth-child(1) > tbody > tr > td > p > font').textContent.trim()

        });
        pharmas.push(
        {
            name : document.querySelector('body > table:nth-child(1) > tbody > tr > td > table > tbody > tr:nth-child(1) > td:nth-child(1) > div > table:nth-child(4) > tbody > tr > td > table:nth-child(2) > tbody > tr > td > table > tbody > tr:nth-child(3) > td > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(1) > td.font9pt > b > font').textContent.trim(),
            adresse : document.querySelector('body > table:nth-child(1) > tbody > tr > td > table > tbody > tr:nth-child(1) > td:nth-child(1) > div > table:nth-child(4) > tbody > tr > td > table:nth-child(2) > tbody > tr > td > table > tbody > tr:nth-child(3) > td > table:nth-child(2) > tbody > tr:nth-child(2) > td:nth-child(2) > table > tbody > tr:nth-child(2) > td > font').textContent.trim(),
            horaire : document.querySelector('body > table:nth-child(1) > tbody > tr > td > table > tbody > tr:nth-child(1) > td:nth-child(1) > div > table:nth-child(4) > tbody > tr > td > table:nth-child(2) > tbody > tr > td > table > tbody > tr:nth-child(3) > td > table:nth-child(1) > tbody > tr > td > p > font').textContent.trim()
    
        });
        return {timestamp : {string : new Date(Date.now()).toLocaleString('fr-FR'), raw: Date.now()}, pharmacies : pharmas};

    });
    await page.close();
    await browser.close();
    return text;
}



fs.readFile('pharmasgarde.json', 'utf8', function (err, data) {
    if (err) throw err;
    pharmacies =  JSON.parse(data);
});

function getPharmas () {
    
    jsonTimestamp = new Date(pharmacies.timestamp.raw);
    if (cronTimestamp && cronTimestamp < jsonTimestamp) {
        console.log("plus récent")
        pharmacies = JSON.parse(fs.readFileSync('pharmasgarde.json', 'utf8'));
    }
    return pharmacies;
}



app.get("/pharma", async () => {
    return {
      Message: getPharmas()
    }
  })

app.listen(3128);