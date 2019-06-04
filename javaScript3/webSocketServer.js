// const $ = document.querySelectorAll.bind(document)
const $ = function (arg) {
    return document.querySelectorAll(arg)
}
console.log($('.box'));

