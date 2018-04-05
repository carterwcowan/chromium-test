'use strict';
// imports 
const puppeteer = require('puppeteer');
const creds =  require('./creds');

// selectors + constants
const URL = 'https://www.footlocker.com/product/model:236754/sku:CP9250/adidas-ultra-boost-mens/navy/grey/';
// LOGIN ID's
const LOGIN_ID = '#header_account_access';
const LOGIN_WRAPPER = '#login_container';
const LOGIN_EMAIL_SLCT = '#login_email';
const LOGIN_PW_SLCT = '#login_password';
const LOGIN_ENTER = '.button cta_button'

// SHOP + PRODUCTS 
const SIZE_DROPDOWN = '#pdp_size_select_mask';
const SIZE = '#size_selection_list > a[value="10.0"]';
const ATC = '#pdp_addtocart_button';

async function run() {
    const BROWSER = await puppeteer.launch({ headless: false });
    const PAGE = await BROWSER.newPage();

    //navigate
    await PAGE.goto(URL);
    await PAGE.screenshot({ path: 'img/product.png' });
    //select size
    await PAGE.click(SIZE_DROPDOWN);
    await PAGE.screenshot({ path: 'img/size-chart.png' });
    await PAGE.click(SIZE)
    await PAGE.screenshot({ path: 'img/size-selected.png' });
    // add to cart
    await PAGE.click(ATC);
    await PAGE.waitForSelector('#miniAddToCartWrapper');
    await PAGE.screenshot({ path: 'img/carted.png' });
    // go to cart
    

    await BROWSER.close();
};


run();