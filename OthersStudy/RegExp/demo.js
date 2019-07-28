 {
   let regexp = /\B(?=(\d{3})+\b)/g;
   let str = '012345678 12345321';
   let result = str.replace(regexp, ',');
  //  console.log(result);
 }
{
  function format(num) {
    return num.toFixed(2).replace(/\B(?=(\d{3})+\b)/g,',').replace(/^/,  '$ ');
  }
  // console.log(format(1888));
}
{
  // 密码长度6-12位,数字,小写字母或大写字母组成
  let regExp = /^[0-9A-Za-z]{6,12}$/;

  // 匹配密码长度6-12位,数字,小写字母或大写字母组成,
  // 必须包含数字, .匹配任何字符,0个或多个,至少一个数字
  let regExp1 = /(?=.*[0-9])^[0-9A-Za-z]{6,12}$/;
  // console.log(regExp1.testa('s12a22'));

   // 匹配密码长度6-12位,数字,小写字母或大写字母组成,
  // 必须包含数字,小写字母, .匹配任何字符,0个或多个
  let regExp2 = /(?=.*[0-9])(?=.*[a-z])^[0-9A-Za-z]{6,12}$/;
  // console.log(regExp2.test('55121a11211'));


  // let pattern = /((?=.*[0-9])(?=.*[a-z])|(?=.*[0-9])(?=.*[A-Z])|(?=.*[a-z])(?=.*[A-Z]))^[A-Z0-9a-z]{6,12}$/;
  let pattern = /(?!^[0-9]{6,12}$)(?!^[a-z]{6,12}$)(?!^[A-Z]{6,12}$)^[0-9A-Za-z]{6,12}$/;

  // console.log(pattern.test("1234567")); // false 全是数字
  // console.log(pattern.test("abcdef")); // false 全是小写字母
  // console.log(pattern.test("ABCDEFGH")); // false 全是大写字母
  // console.log(pattern.test("ab23C")); // false 不足6位
  // console.log(pattern.test("ABCDEF234")); // true 大写字母和数字
  // console.log(pattern.test("abcdEF234")); // true 三者都有
}
{
  let str = 'Hello Happy World!';
  /*console.log(str.replace('e', '1')); // "lo Happy World!"
  console.log(str.slice(6, 11)); // "Happy"
  console.log(str);*/
}
 {
   let str = 'Hello Happy World!';
   let pat = /\s/g;
   /*console.log(str.search(pat));
   console.log(str.match(pat));
   console.log(str.replace(pat,'#'));
   console.log(str.split(pat).reverse().join(' '));*/
 }
