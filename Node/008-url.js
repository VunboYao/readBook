const url = require('url');

const obj = url.parse('https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=aa&oq=54&rsv_pq=ed445b1e0030c9b2&rsv_t=71cewQQCAulay7bFVukeSN1luqOCRoN0zTaHTosX%2FD3H2MD6tTSXJOtQMbc&rqlang=cn&rsv_enter=1&inputT=1624&rsv_sug3=9&rsv_sug1=7&rsv_sug7=101&rsv_sug2=0&rsv_sug4=2221',true);

console.log(obj);
