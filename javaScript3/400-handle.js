/*let EventUtil = {
    addHandler: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, handler);
        } else {
            element['on' + type] = handler;
        }
    },
    removeHandler: function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent('on' + type, handler);
        } else {
            element['on' + type] = null;
        }
    },
    getEvent: function (event) {
        return event ? event : window.event;
    },
    getTarget: function (event) {
        return event.target || event.srcElement;
    },
    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    stopPropagation: function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },
    getRelatedTarget: function (e) {
        if (e.relatedTarget) {
            return e.relatedTarget;
        } else if (e.toElement) {
            return e.toElement;
        } else if (e.fromElement) {
            return e.fromElement;
        } else {
            return null;
        }
    },
    getButton: function (e) {
        if (document.implementation.hasFeature('MouseEvents', '2.0')) {
            return e.button;
        } else {
            switch(e.button) {
                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                    return 0;
                case 2:
                case 6:
                    return 2;
                case 4:
                    return 1;
            }
        }
    },
    getWheelDelta: function (e) {
        if (e.wheelDelta) {
            return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta);
        } else {
            return -event.detail * 40;
        }

    },
    getCharCode: function (e) {
        if (typeof e.charCode === 'number') {
            return e.charCode;
        } else {
            return e.keyCode;
        }
    },
    getClipboardText: function (e) {
        let clipboardData = e.clipboardData || window.clipboardData;
        return clipboardData.getData('text');
    },
    setClipboardText: function (e, value) {
        if (e.clipboardData) {
            return e.clipboardData.setData('text/plain', value);
        } else if (window.clipboardData) {
            return window.clipboardData.setData('text', value);
        }
    }
}*/

/*const convertDuration = time => {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time - minutes * 60);
  minutes = String(minutes).length < 2 ? String(minutes).padStart(2,'0'): minutes;
  seconds = String(seconds).length < 2 ? String(seconds).padStart(2,'0'): seconds;
  return minutes + ":" + seconds;
};

convertDuration(308); // 05:08
convertDuration(6000); // 100:00*/

/*function arrIndexExchange(array,x,y) {
  /!*
  * 解析：
  * x-1,1, 删除索引 X 的值
  * y-1,1,array[x-1]， 删除索引 Y 的值，插入X的值
  * ...array, 扩展加入到 X 的位置
  * *!/
  let a = array.splice(x-1, 1, ...array.splice(y-1, 1,array[x-1]));
  return array;
}

let arr = [1,2,3,4];
console.log(arrIndexExchange(arr,3,4));*/















