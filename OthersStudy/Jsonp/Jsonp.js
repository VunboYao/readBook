function Jsonp(options) {
  options = options || {}

  let url = options.url;
  if (options.jsonp) {
    url += `?${options.jsonp}=`;
  }else {
    url += "?callback="
  }

  let callback = ('jQuery' + Math.random()).replace('.', '');
  if (options.jsonpCallback) {
    callback = options.jsonpCallback;
    url += options.jsonpCallback;
  } else {
    url += callback;
  }

  if (options.data) {
    let str = obj2str(options.data);
    url += '&' + str;
  }

  console.log(url);
  let oScript = document.createElement('script');
  oScript.src = url;
  document.body.appendChild(oScript);

  window[callback] = function (data) {
    document.body.removeChild(oScript);
    options.success(data);
  }
}

function obj2str(obj) {
  obj.t = (Math.random() + '').replace('.', '');
  let arr = []
  for (let key in obj) {
    arr.push(key + '=' + encodeURIComponent(obj[key]));
  }
  let str = arr.join("&");
  return str;
}
