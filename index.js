const puppeteer = require('puppeteer');

(async () => {
    let movieUrl = ('https://www.imdb.com/title/tt0111161/?ref_=nv_sr_srsg_0');

    let browser = await puppeteer.launch({ headless : false});
    let page = await browser.newPage();

    await page.goto(movieUrl, { waitUntil: 'networkidle2'});

    //save to a variable
    let data = await page.evaluate(() => {

        
    let title = document.querySelector('div[class="title_wrapper"] > h1').innerText;

    let rating = document.querySelector('span[itemprop="ratingValue"]').innerText;

    let ratingCount = document.querySelector('span[itemprop="ratingCount"]').innerText;
        
    //returning object
        return {
            title,
            rating,
            ratingCount
        }

});

console.log(data);

// debugger;

await browser.close();

})();


// const puppeteer = require('puppeteer'); // v 1.1.0
// const { URL } = require('url');
// const fse = require('fs-extra'); // v 5.0.0
// const path = require('path');


// async function start(urlToFetch, pathName) {
//   /* 1 */
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//    await page.setRequestInterception(true);
//   /* 2 */
//   page.on('response', async (response) => {

//     try {
//       const status = response.status;

//       page.on("console", (log)=>{
//         console.log(log.text());
//       });
//       const url = new URL(response.url());

//       console.log(interceptedRequest.url(), url, status);
//       if(interceptedRequest.url().endsWith('/api')){
//           interceptedRequest.respond({
//               status: 422,
//               body: "FAKE"
//           })
//       } else interceptedRequest.continue();

//       let filePath = path.resolve(`./output/` + pathName + '/' + `${url.pathname}`);
//       if (path.extname(url.pathname).trim() === '') {
//         filePath = `${filePath}/index.html`;
//       }

//         await fse.outputFile(filePath, await response.buffer());
      

//     } catch (err) {
//         console.log('Redirect from', response.url(), 'to', response.headers()['location']);

//       console.log(err, response.status)
//     }
//   });



//   /* 3 */
//   await page.goto(urlToFetch, {
//     waitUntil: 'networkidle2'
//   });

//   /* 4 */
//   setTimeout(async () => {
//     await browser.close();
//   }, 60000 * 4);
// }

// start('https://www.lamayor.org/', 'www');
// start('https://sdg.lamayor.org/', 'sdg');
// start('https://sdgdata.lamayor.org/', 'sdgdata');
