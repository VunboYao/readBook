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

  let regex = /(\d{4})-(\d{2})-(\d{2})/
  let string = "2017-06-12";

  regex.test(string) // 正常操作即可，例如
  // regex.exec(string)
  // string.match(regex)

  console.log(RegExp.$1)
  console.log(RegExp.$2)
  console.log(RegExp.$3)
}

