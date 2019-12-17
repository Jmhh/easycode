{
  //防抖函数 指触发事件后在一定时间内函数只能执行一次，如果这段时间内又触发了事件，则会重新计算函数执行时间。
  const debounce = (callback, wait = 3000) => {
    //非立即执行版
    let timer;
    return function() {
      let ctx = this;
      let args = arguments;
      if (timer) clearTimeout(timer);

      timer = setTimeout(() => {
        callback.apply(ctx, args);
      }, wait);
    };
  };

  const debounceNow = (callback, wait = 3000) => {
    //立即执行版
    let timer;
    return function() {
      let ctx = this;
      let args = arguments;
      if (timer) clearTimeout(timer);

      let callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, wait);

      if (callNow) {
        callback.apply(ctx, args);
      }
    };
  };
}

{
  //函数节流 当持续触发事件时，保证一定时间段内只调用一次事件处理函数
  const throttle = (func, wait) => {
    //时间戳版
    let previous = 0;
    return function() {
      let now = Date.now();
      let context = this;
      let args = arguments;
      if (now - previous > wait) {
        func.apply(context, args);
        previous = now;
      }
    };
  };

  const throttleTime = (func, wait) => {
    //定时器版
    let timeout;
    return function() {
      let context = this;
      let args = arguments;
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null;
          func.apply(context, args);
        }, wait);
      }
    };
  };
}

{
  //冒泡排序
  const swap = (arr, indexA, indexB) =>
    ([arr[indexA], arr[indexB]] = [arr[indexB], arr[indexA]]);
  const bubbleSort = arr => {
    for (let i = arr.length - 1; i > 0; i--) {
      for (let j = 0; j < i; j++) {
        if (arr[j] > arr[j + 1]) {
          swap(arr, j, j + 1);
        }
      }
    }
    return arr;
  };
  const test = bubbleSort([91, 60, 96, 7, 31, 77, 81, 24]);
  //console.log(test);
}

{
  //选择排序
  const swap = (arr, indexA, indexB) =>
    ([arr[indexA], arr[indexB]] = [arr[indexB], arr[indexA]]);
  const bubbleSort = arr => {
    for (let i = 0, len = arr.length; i < len - 1; i++) {
      let minIndex = i;

      for (let j = i + 1; j < len; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }
      if (i !== minIndex) {
        swap(arr, i, minIndex);
      }
    }

    return arr;
  };
  const test = bubbleSort([91, 60, 96, 7, 31, 77, 81, 24]);
  console.log(test);
}

{
  //1. attempt：捕获函数运行异常
  const attempt = (fn, ...args) => {
    try {
      return fn(...args);
    } catch (e) {
      return e instanceof Error ? e : new Error(e);
    }
  };
  var elements = attempt(function(selector) {
    return document.querySelectorAll(selector);
  }, ">_>");
  if (elements instanceof Error) elements = []; // elements = []
}

{
  //2. defer：推迟执行
  const defer = (fn, ...args) => setTimeout(fn, 1, ...args);
  //defer(console.log, "a"), console.log("b"); // logs 'b' then 'a'
}

{
  //3. runPromisesInSeries：运行多个Promises
  const runPromisesInSeries = ps =>
    ps.reduce((p, next) => p.then(next), Promise.resolve());
  const delay = d => new Promise(r => setTimeout(r, d));
  runPromisesInSeries([() => delay(1000), () => delay(2000)]);
  //依次执行每个Promises ，总共需要3秒钟才能完成
}

{
  //4. timeTaken：计算函数执行时间
  const timeTaken = callback => {
    console.time("timeTaken");
    const r = callback();
    console.timeEnd("timeTaken");
    return r;
  };
  //timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms
}

{
  //5. createEventHub：简单的发布/订阅模式
  const createEventHub = () => ({
    hub: Object.create(null),
    emit(event, data) {
      (this.hub[event] || []).forEach(handler => handler(data));
    },
    on(event, handler) {
      if (!this.hub[event]) this.hub[event] = [];
      this.hub[event].push(handler);
    },
    off(event, handler) {
      const i = (this.hub[event] || []).findIndex(h => h === handler);
      if (i > -1) this.hub[event].splice(i, 1);
      if (this.hub[event].length === 0) delete this.hub[event];
    }
  });
}

{
  //6. memoize：缓存函数
  const memoize = fn => {
    const cache = new Map();
    const cached = function(val) {
      return cache.has(val)
        ? cache.get(val)
        : cache.set(val, fn.call(this, val)) && cache.get(val);
    };
    cached.cache = cache;
    return cached;
  };
}

{
  //7. once：只调用一次的函数
  const once = fn => {
    let called = false;
    return function() {
      if (!called) {
        called = true;
        fn.apply(this, arguments);
      }
    };
  };
}

{
  //8. flattenObject：以键的路径扁平化对象
  const flattenObject = (obj, prefix = "") =>
    Object.keys(obj).reduce((acc, k) => {
      const pre = prefix.length ? prefix + "." : "";
      if (typeof obj[k] === "object")
        Object.assign(acc, flattenObject(obj[k], pre + k));
      else acc[pre + k] = obj[k];
      return acc;
    }, {});

  flattenObject({ a: { b: { c: 1 } }, d: 1 }); // { 'a.b.c': 1, d: 1 }
}

{
  //9. unflattenObject：以键的路径展开对象
  const unflattenObject = obj =>
    Object.keys(obj).reduce((acc, k) => {
      if (k.indexOf(".") !== -1) {
        const keys = k.split(".");
        Object.assign(
          acc,
          JSON.parse(
            "{" +
              keys
                .map((v, i) => (i !== keys.length - 1 ? `"${v}":{` : `"${v}":`))
                .join("") +
              obj[k] +
              "}".repeat(keys.length)
          )
        );
      } else acc[k] = obj[k];
      return acc;
    }, {});

  unflattenObject({ "a.b.c": 1, d: 1 }); // { a: { b: { c: 1 } }, d: 1 }
}
