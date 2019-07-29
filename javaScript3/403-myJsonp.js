function myJsonp(options = {}) {
  let url = options.url;
  // 1.1 check Jsonp Key
  if (options.jsonp) {
    url += '?' + options.jsonp + '='
  } else {
    url += '?callback=';
  }

  // 1.2 Jsonp Name
  let callBackName = ('jQuery' + Math.random()).replace('.', '');
  if (options.jsonpCallback) {
    callBackName = options.jsonpCallback;
    url += options.jsonpCallback;
  } else {
    url += callBackName;
  }

  // 1.3 Jsonp Data
  if (options.data) {
    let str = obj2str(options.data);
    url += '&' + str;
  }

  // 2.Get Cross Data
  let oScript = document.createElement('script');
  oScript.src = url;
  document.body.appendChild(oScript);

  // 3.Define callBack()
  window[callBackName] = function (data) {
    // return data
    options.success(data);
    // removeScriptTag
    document.body.removeChild(oScript);
  }
}

function obj2str(obj) {
  // random str => cache
  obj.t = (Math.random() + '').replace('.', '');
  let arr = [];
  for (let key in obj) {
    arr.push(key + '=' + encodeURIComponent(obj[key]));
  }
  let str = arr.join('&');
  return str;
}
