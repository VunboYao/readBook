{
  // 千分位格式化
  const formatMoney = money => {
    /**
     * (?!^)不能匹配开头
     * (\d{3})+至少出现过一次
     */
    return money.replace(new RegExp(`(?!^)(?=(\d{3})+${money.includes('.') ? '\\.' : '$'})`, 'g'), ',')
  }
}

{
  // 匹配16进制颜色
  let regex = /#([\da-fA-F]{6}|[\da-fA-F]{3})/g
  let string = '#44BBAd #F123DF #eee #fff'
  // console.log(string.match(regex))
}


{
  // 匹配时间
  let regex = /^([01]\d|2[0-3]):[0-5]\d$/
  // console.log(regex.test('23:59'))
  // console.log(regex.test("02:02"))
}


{
  function camelize(str) {
    return str.replace(/[_-\s]+(.)?/g, (match, c) => {
      return c ? c.toUpperCase() : ''
    })
  }

  console.log(camelize('-mon-transform'));
}


{
  function dasherize(str) {
    return str.replace(/([A-Z])/g, '-$1').replace(/[-_\s]+/g, '-').toLowerCase()
  }

  console.log(dasherize('MonTransform'));
}


{
  let regex = /<([^>]+)>[\d\D]*<\/\1>/
  var string1 = "<title>regular expression</title>";
  var string2 = "<p>laoyao bye bye</p>";
  var string3 = "<title>wrong!</p>";
  console.log( regex.test(string1) ); // true
  console.log( regex.test(string2) ); // true
  console.log( regex.test(string3) ); // false
}
