{
    //1. all：布尔全等判断
    const all = (arr, fn = Boolean) => arr.every(fn);
    const test = all([4, 2, 3], x => x > 1); // true
    //console.log(test);
}

{
    //2. allEqual：检查数组各项相等
    const allEqual = arr => arr.every(val => val === arr[0]);
    const test = allEqual([1, 2, 3, 4]);
    //console.log(test);
}

{
    //3. approximatelyEqual：约等于
    const approximatelyEqual = (v1, v2, epsilon = 0.001) =>
        Math.abs(v1 - v2) < epsilon;
    const test = approximatelyEqual(Math.PI / 2.0, 1.5708);
    //console.log(test);
}

{
    //4. arrayToCSV：数组转CSV格式（带空格的字符串）
    const arrayToCSV = (arr, delimiter = ",") =>
        arr.map(v => v.map(x => `"${x}"`).join(delimiter)).join("\n");
    const test = arrayToCSV([
        ["a", "b"],
        ["c", "d"]
    ]);
    //console.log(test);
}

{
    //5. arrayToHtmlList：数组转li列表
    const arrayToHtmlList = (arr, listID) =>
        (el => (
            (el = document.querySelector("#" + listID)),
            (el.innerHTML += arr.map(item => `<li>${item}</li>`).join(""))
        ))();
    //arrayToHtmlList(['item 1', 'item 2'], 'myListID');
}

{
    //6. average：平均数
    const average = (...arr) =>
        arr.reduce((acc, val) => acc + val, 0) / arr.length;
    const test = average(...[1, 8, 3]);
    //console.log(test)
}

{
    //7. averageBy：数组对象属性平均数
    const averageBy = (arr, fn) =>
        arr
        .map(typeof fn === "function" ? fn : val => val[fn])
        .reduce((acc, val) => acc + val, 0) / arr.length;
    const test = averageBy(
        [{
                n: 4,
                a: 2
            },
            {
                n: 2,
                a: 5
            },
            {
                n: 8,
                a: 3
            },
            {
                n: 6,
                a: 8
            }
        ],
        "a"
    );
    //console.log(test);
}

{
    //8. bifurcate：拆分断言后的数组
    const bifurcate = (arr, filter) =>
        arr.reduce((acc, val, i) => (acc[filter[i] ? 0 : 1].push(val), acc), [
            [],
            []
        ]);
    bifurcate(["beep", "boop", "foo", "bar"], [true, true, false, true]);
    // [ ['beep', 'boop', 'bar'], ['foo'] ]
}

{
    //9. castArray：其它类型转数组
    const castArray = val => (Array.isArray(val) ? val : [val]);
    castArray("foo"); // ['foo']
    castArray([1]); // [1]
    castArray(1); // [1]
}

{
    //10. compact：去除数组中的无效/无用值
    const compact = arr => arr.filter(Boolean);
    compact([0, 1, false, 2, "", 3, "a", "e" * 23, NaN, "s", 34]);
    // [ 1, 2, 3, 'a', 's', 34 ]
}

{
    //11. countOccurrences：检测数值出现次数
    const countOccurrences = (arr, val) =>
        arr.reduce((a, c) => (c === val ? a + 1 : a), 0);
    const test = countOccurrences([1, 2, 3, 4, 5, 1, 6, 2, 1], 2);
    //console.log(test);
}

{
    //12. deepFlatten：递归扁平化数组
    const deepFlatten = arr => [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));
    const test = deepFlatten([1, [2],
        [
            [3], 4
        ], 5
    ]); // [1,2,3,4,5]
}

{
    //13. difference：寻找差异（并返回第一个数组独有的）
    const difference = (a, b) => {
        const s = new Set(b);
        return a.filter(x => !s.has(x));
    };
    const test = difference([1, 2, 3], [1, 2, 4]);
    // console.log(test);
}

{
    //14. differenceBy：先执行再寻找差异
    const differenceBy = (a, b, fn) => {
        const s = new Set(b.map(fn));
        return a.filter(x => !s.has(fn(x)));
    };

    differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor); // [1.2]
    differenceBy([{
        x: 2
    }, {
        x: 1
    }], [{
        x: 1
    }], v => v.x); // [ { x: 2 } ]
}

{
    //15. dropWhile：删除不符合条件的值
    const dropWhile = (arr, func) => {
        while (arr.length > 0 && !func(arr[0])) arr = arr.slice(1);
        return arr;
    };

    dropWhile([1, 2, 3, 4], n => n >= 3); // [3,4]
}

{
    //16. flatten：指定深度扁平化数组
    const flatten = (arr, depth = 1) =>
        arr.reduce(
            (a, v) =>
            a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v),
            []
        );

    flatten([1, [2], 3, 4]); // [1, 2, 3, 4]
    flatten([1, [2, [3, [4, 5], 6], 7], 8], 2); // [1, 2, 3, [4, 5], 6, 7, 8]
}

{
    //17. indexOfAll：返回数组中某值的所有索引
    const indexOfAll = (arr, val) =>
        arr.reduce((acc, v, i) => (v === val ? [...acc, i] : acc), []);
    const test = indexOfAll([1, 2, 3, 1, 2, 3], 3);
    //console.log(test);
}

{
    //18. intersection：两数组的交集
    const intersection = (a, b) => {
        const s = new Set(b);
        return a.filter(x => s.has(x));
    };

    intersection([1, 2, 3], [4, 3, 2]); // [2, 3]
}

{
    //19. intersectionWith：两数组都符合条件的交集
    const intersectionBy = (a, b, fn) => {
        const s = new Set(b.map(fn));
        return a.filter(x => s.has(fn(x)));
    };
    intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor); // [2.1]
}

{
    //20. intersectionWith：先比较后返回交集
    const intersectionWith = (a, b, comp) =>
        a.filter(x => b.findIndex(y => comp(x, y)) !== -1);
    intersectionWith(
        [1, 1.2, 1.5, 3, 0],
        [1.9, 3, 0, 3.9],
        (a, b) => Math.round(a) === Math.round(b)
    ); // [1.5, 3, 0]
}

{
    //21. minN：返回指定长度的升序数组
    const minN = (arr, n = 1) => [...arr].sort((a, b) => a - b).slice(0, n);
    minN([1, 2, 3]); // [1]
    minN([1, 2, 3], 2); // [1,2]
}

{
    //22. negate：根据条件反向筛选
    const negate = func => (...args) => !func(...args);
    [1, 2, 3, 4, 5, 6].filter(negate(n => n % 2 === 0)); // [ 1, 3, 5 ]
}

{
    //23. randomIntArrayInRange：生成两数之间指定长度的随机数组
    const randomIntArrayInRange = (min, max, n = 1) =>
        Array.from({
                length: n
            },
            () => Math.floor(Math.random() * (max - min + 1)) + min
        );
    randomIntArrayInRange(12, 35, 10); // [ 34, 14, 27, 17, 30, 27, 20, 26, 21, 14 ]
}

{
    //24. sample：在指定数组中获取随机数
    const sample = arr => arr[Math.floor(Math.random() * arr.length)];
    sample([3, 7, 9, 11]); // 9
}

{
    //25. sampleSize：在指定数组中获取指定长度的随机数
    const sampleSize = ([...arr], n = 1) => {
        let m = arr.length;
        while (m) {
            const i = Math.floor(Math.random() * m--);
            [arr[m], arr[i]] = [arr[i], arr[m]];
        }
        return arr.slice(0, n);
    };

    sampleSize([1, 2, 3], 2); // [3,1]
    sampleSize([1, 2, 3], 4); // [2,3,1]
}

{
    //26. shuffle：“洗牌” 数组
    const shuffle = ([...arr]) => {
        let m = arr.length;
        while (m) {
            const i = Math.floor(Math.random() * m--);
            [arr[m], arr[i]] = [arr[i], arr[m]];
        }
        return arr;
    };
    const foo = [1, 2, 3];
    shuffle(foo); // [2, 3, 1], foo = [1, 2, 3]
}

{
    //27. nest：根据parent_id生成树结构（阿里一面真题）
    const nest = (items, id = null, link = "parent_id") =>
        items
        .filter(item => item[link] === id)
        .map(item => ({
            ...item,
            children: nest(items, item.id)
        }));
    const comments = [{
            id: 1,
            parent_id: null
        },
        {
            id: 2,
            parent_id: null
        },
        {
            id: 3,
            parent_id: 1
        },
        {
            id: 4,
            parent_id: 2
        },
        {
            id: 5,
            parent_id: 4
        }
    ];
    const test = nest(comments);
    //console.log(test);
}

{
    const arr = [{
            name: "1",
            meuns: [{
                name: "1-1"
            }, {
                name: "1-2"
            }]
        },
        {
            name: "2",
            meuns: [{
                    name: "2-1",
                    meuns: [{
                        name: "2-1-1"
                    }, {
                        name: "2-1-2"
                    }]
                },
                {
                    name: "2-2"
                },
                {
                    name: "2-3"
                }
            ]
        }
    ];
    const fliterShuffle = (data) => {
        let arr = []
        data.forEach(item => {
            let map = {
                class1: item.name
            }
            if (item.meuns) {
                map.class2 = item.meuns
                item.meuns.forEach(eitem => {
                    if (eitem.meuns) {
                        map.class3 = eitem.meuns
                    }
                })

            }
            if (!map.class3) map.class3 = []
            arr.push(map)
        })
        console.log(arr)
    }
    fliterShuffle(arr)
}

{
    //28 类数组转数组
    let arr = Array.prototype.slice.call(arguments)
    //或者 let arr = [].slice.call(arguments) / Array.from(arguments);
}

{
    //29 切割数组
    let result = [];
    let data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let chunk = 4; //每3个分一组
    for (let i = 0, j = data.length; i < j; i += chunk) {
        result.push(data.slice(i, i + chunk));
    }
    //console.log(result);
}