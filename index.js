"use strict";

import cron from "node-cron";
import fastify  from "fastify";
import { promises as fs } from 'fs';
import puppeteer from "puppeteer";

const app = fastify();

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
async function read (file) {
    try {
        const data = await fs.readFile(file);
        return await JSON.parse(data);
    } 
    catch (error) {
        console.log(error)
    }
}

async function write (file, data) {
    try {
        await fs.writeFile(file, JSON.stringify(data, null, 2));
        console.log("Fichier écrit");
    } 
    catch (error) {
        console.log(error)
    }
}


let cronTimestamp;
let jsonTimestamp;
let pharmacies = [];

pharmacies = read('pharmasgarde.json');

cron.schedule("0 4 * * *", function() {
    console.log("---------------------");
    console.log("TACHE CRON EN COURS");

    get3237().then(text => {
        
        write('pharmasgarde.json', text);
        cronTimestamp = new Date (Date.now());
    });
});

async function getPharmas () {
    
    const ù = await pharmacies;
    jsonTimestamp = new Date(ù.timestamp.raw);
    
    //console.log("cronTimestamp : ", cronTimestamp, 'jsonTimestamp :', jsonTimestamp)
    if (cronTimestamp && cronTimestamp > jsonTimestamp) {
        console.log("plus récent")
        pharmacies = read('pharmasgarde.json');
    }
    return pharmacies;
}

app.get("/pharma", async () => {
    return {
      Message: await getPharmas()
    }
  })
  

app.listen(3128);