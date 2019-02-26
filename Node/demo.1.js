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
