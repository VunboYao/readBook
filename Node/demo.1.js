/*
const cheerio = require("cheerio");
let $ = cheerio.load(".mbgmes-con-index");
let url = "https://m.5173.com/";
const http = require("https");
const fs = require("fs");
const koa = require('koa')
const Router = require('koa-router')
const app = new koa();
let router = new Router();
app.use(async ctx => {
    await getD().then(data => {
        ctx.body = data;
    });
});
app.listen(3000, () => {
    console.log('3000 at port')
})
function getD() {
    return new Promise((resolve, reject) => {
        let data = "";
         http.get(url, res => {
            let html = "";
            res.on("data", data => {
                html += data;
            });
            res.on("end", () => {
                data = $(html)
                        .find(".mbl-title")
                        .text()
                        .trim() + '\n';
                if (data !== "") {
                    resolve(data);
                } else {
                    reject(data);
                }
            });
        });
    })
}
*/

const Koa = require("koa");
const superagent = require("superagent");
const cheerio = require("cheerio");
const app = new Koa();
const items = [];

app.use(async function(ctx, next) {
    if (ctx.request.path == "/" && ctx.request.method == "GET") {
        ctx.body = await new Promise((resolve, reject) => {
            superagent.get('http://m.7881.com/gloryKingAllSkin.html')
                .end(function(err, _res) {
                    if (err) {
                        reject(err);
                    }
                    const $ = cheerio.load(_res.text);

                    $('.skin-list a').each(function(idx, element) {
                        var $element = $(element);
                        items.push({
                            "thumb_url": $element.find('img').attr('src'),
                            "short_name": $element.find('h2').text(),
                            "price": $element.find('.left').text(),
                            "sales_tip": $element.find('h5').text()
                        });
                    })
                    resolve(items);
                })
        })
    } else {
        next();
    }
})

app.listen(8090);
