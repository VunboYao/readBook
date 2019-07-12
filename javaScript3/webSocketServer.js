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
  console.log(string.match(regExp));
}
