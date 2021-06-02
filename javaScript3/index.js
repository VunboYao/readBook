/* for (var i = 0; i <= 5; i++) {
  ;(function(j) {
    setTimeout(() => {
      console.log(j)
    }, 0)
  })(i)
}
 */
for (var i = 0; i <= 5; i++) {
  setTimeout((J) => {
    console.log(J)
  }, 0, i)
}
