{
  // 2018-05-20
  let regExp = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12]\d|3[01])$/g;
  // console.log(regExp.test('2018-05-20'));
}
{
  let regExp = /^[a-zA-Z]:\\([^\\:*<>|"?\r\n]+\\)*([^\\:*<>|"?\r\n/]+)?$/;
  // console.log(regExp.test('C:\\EFI'));
}
{
  let regExp = /id=".*?"/g;
  let string = `<div id="container" class="main"></div>`;
  // console.log(string.match(regExp));
}
{
  let string = '123456789 12345678';
  let regExp = /\B(?=(\d{3})+\b)/g;
  // console.log(string.replace(regExp, ','));
}
{
  function format(number) {
    return number.toFixed(2).replace(/\B(?=(\d{3})+\b)/g, ',').replace(/^/, '$$ ');
  }

  // console.log(format(1888));
}
{
  let regExp = /(?=.*[0-9])(?=.*[a-z])^[0-9a-zA-Z]{6,12}$/;
}
