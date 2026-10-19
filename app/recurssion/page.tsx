// @ts-nocheck
const page = () => {
    //fact
    function countdown(n: any) {

        if (n === 1) {
            return 1
        }
        return n * countdown(n - 1)

    }
    console.log(countdown(500));

    //fibonaci

    const memo: any = {}
    function fibbo(n: any) {
        if (n in memo) {
            return memo[n];
        }
        if (n <= 1) return n;
        memo[n] = fibbo(n - 1) + fibbo(n - 2)
        return memo[n]

    }
    console.log(fibbo(6));
    //flatten array

    const arr5 = [1, [2, 3], [4, [5, 6]], 7]
    const farr = []
    function flatten(arr) {
        for (let index = 0; index < arr.length; index++) {
            if (Array.isArray(arr[index])) {
                flatten(arr[index])

            } else {
                farr.push(arr[index])

            }

        }
        return farr


    }
    console.log(flatten(arr5), 'jj');

    //anagram 
    const arr7 = ["eat", "tea", "tan", "ate", "nat", "bat"]
    function anagram(arr) {
        const map = new Map()
        for (const i of arr) {
            const key = i.split('').sort().join('')
            if (!map.has(key)) {
                map.set(key, [])
            }
            map.get(key).push(i)
        }
        return [...map.values()]
    }
    console.log(anagram(arr7));
    //flatten obj
    const obj = {
        user: {
            name: "Piyush",
            address: {
                city: "Kolkata",
                pin: 700001
            }
        },
        role: "Frontend"
    }
    const newObj = {}

    function flattenObj(obj, parent = '') {

        for (const key in obj) {
            const value = obj[key]
            const fullkey = parent === '' ? key : `${parent}.${key}`
            if (typeof value === 'object') {
                flattenObj(value, fullkey)

            } else {
                newObj[fullkey] = value
            }

        }
        return newObj


    }
    console.log(flattenObj(obj, ''));
    const obj1 = {
        user: {
            name: "Piyush",
            address: {
                city: "Kolkata"
            }
        }
    }
    function clone(obj) {
        const newObj = {}
        for (const key in obj) {
            const value = obj[key]
            if (typeof value === 'object') {
                newObj[key] = clone(value)

            } else {
                newObj[key] = value

            }

        }
        return newObj
    }
    const copy = clone(obj1)

    console.log(copy);

    const str = 'abcd'
    function permute(str) {
        const newArr = []
        if (str.length === 0) {
            return [str]
        }
        for (let i = 0; i < str.length; i++) {
            let current = str[i]
            let remaining = str.slice(0, i) + str.slice(i + 1)
            let newpermute = permute(remaining)
            for (let newP of newpermute) {
                newArr.push(current + newP)
            }

        }
        return newArr


    }

    console.log(permute(str));

    const even = [1, 2, 4, 5, 6, 8]
    function even1(arr) {
        const newEven = []
        for (let i = arr.length - 1; i >= 0; i--) {

            newEven.push(arr[i])
            if (arr[i] % 2 === 0) {
                newEven.push(arr[i])
            }
        }
        console.log(newEven);

        return newEven.reverse()
    }
    console.log(even1(even), 'hh');

    const arrEven = [1, 2, 3, 4, 5]
    function looping(arr) {
        let evenNumberCount = 0
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] % 2 === 0) {
                evenNumberCount++

            }
        }
        let OldLength = arr.length
        arr.length += evenNumberCount
        let i = OldLength - 1
        let j = arr.length - 1

        while (i >= 0) {
            if (arr[i] % 2 === 0) {
                arr[j] = arr[i]
                j--
                arr[j] = arr[i]
                j--

            } else {
                arr[j] = arr[i]
                j--
            }

            i--
        }
        return arr

    }
    console.log(looping(arrEven));

    const str6 = "india is my countrt"
    function capitalize(str) {
        let newArr = str.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join("");
        return newArr

    }
    console.log(capitalize(str6));

    function dealy() {
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                return console.log(i);

            }, i * 1000)


        }

    }
    dealy()
    const arrfind = [11, 12, 14, 15, 16]
    function missing(arr) {
        let start = arr[0]

        for (let i = 0; i < arr.length; i++) {
            const expected = start + i
            if (arr[i] !== expected) {
                return expected;
            }
        }


    }
    console.log(missing(arrfind), 'jjjx');

    //duplicate zero

    const arrZ = [1, 0, 9, 8, 0, 7, 6]
    function duplicateZero(arr) {
        let zeroCount = 0
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === 0) {
                zeroCount++
            }
        }
        let orginalLength = arr.length
        let virtualLength = arr.length + zeroCount
        let i = orginalLength - 1
        let j = virtualLength - 1
        while (i >= 0) {
            if (arr[i] === 0) {
                if (j < orginalLength) {
                    arr[j] = arr[i]
                    j--
                }
                if (j < orginalLength) {
                    arr[j] = arr[i]
                    j--
                }
            } else {
                if (j < orginalLength) {
                    arr[j] = arr[i]
                    j--
                }
            }

            i--

        }

        return arr

    }
    console.log(duplicateZero(arrZ));
    //moving zero to end unstable

    const zeroend = [1, 0, 3, 0, 5, 0]
    function movingZero(arr) {
        let i = arr.length - 1
        let j = arr.length - 1

        while (i >= 0) {
            if (arr[i] === 0) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
                j--

            }
            i--
        }
        return arr
    }
    console.log(movingZero(zeroend), 'hhh');

    //moving zero to end stable

    const zeroEnd = [1, 0, 3, 0, 5, 0]
    function moveZero(arr) {
        let write = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== 0) {
                arr[write] = arr[i]
                write++
            }

        }
        while (write < arr.length) {
            arr[write] = 0
            write++
        }

        return arr
    }
    console.log(moveZero(zeroEnd), 'jjjv')

    const arrD = [1, 1, 1, 2, 2, 3]
    function removeDuplicate(arr) {
        let write = 1
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] !== arr[i - 1]) {
                arr[write] = arr[i]
                write++
            }
        }
        console.log(arr);

    }
    removeDuplicate(arrD)
    const arrDouble = [1, 1, 1, 2, 2, 3]
    function removeDoubleDuplicate(arr) {
        let write = 2
        for (let i = 2; i < arr.length; i++) {
            if (arr[i] !== arr[write - 2]) {
                arr[write] = arr[i]
                write++
            }
        }
        console.log(arr);

    }
    removeDoubleDuplicate(arrDouble)
    let dArr = [
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 3],
        [1, 1, 0],
    ]

    function zerorc(array) {
        const rows = new Set()
        const cols = new Set()
        for (let i = 0; i < array.length; i++) {

            for (let j = 0; j < array[i].length; j++) {
                if (array[i][j] === 0) {
                    rows.add(i)
                    cols.add(j)
                }

            }
        }
        for (let x = 0; x < array.length; x++) {
            for (let y = 0; y < array[x].length; y++) {
                if (rows.has(x) || cols.has(y)) {
                    array[x][y] = 0
                }


            }

        }




        return array
    }
    console.log(zerorc(dArr))

    //longest consecutive sequence

    const arrL = [100, 4, 200, 1, 3, 2]
    function maxc(array) {
        const set = new Set(array)
        let max = 0
        for (let i of array) {
            if (!set.has(i - 1)) {
                let len = 1
                let current = i
                while (set.has(current + 1)) {
                    current++
                    len++

                }
                max = Math.max(len, max)
            }


        }
        return max
    }
    console.log(maxc(arrL));
    //maximum frequency number

    const arrF = [1, 2, 3, 2, 4, 1, 2, 3, 3, 3, 3, 2]
    function maxf(arr) {
        let maxCount = 0
        let maxFrequency = arr[0]
        for (let i = 0; i < arr.length; i++) {

            let count = 0
            for (let j = 1; j < arr.length; j++) {
                if (arr[j] === arr[i]) {
                    count++

                }

            }
            if (count > maxCount) {
                maxCount = count
                maxFrequency = arr[i]
            }

        }
        return maxFrequency
    }
    console.log(maxf(arrF));
    //optimized
    function maxf2(arr) {
        arr.sort((a, b) => a - b)

        let currentCount = 1
        let maxCount = 0
        let maxNumber = arr[0]
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] === arr[i - 1]) {
                currentCount++
                if (currentCount > maxCount) {
                    maxNumber = arr[i]
                }
                maxCount = Math.max(maxCount, currentCount)

            } else {

                currentCount = 1
            }

        }
        return maxNumber
    }

    console.log(maxf2(arrF), 'jjj b');
    //nonrwsorhm

    // const arrnr = [1, 2, 3, 2, 4, 1, 2, 5, 3, 3, 3, 3, 2]
    // function nonr(arr) {
    //     // arr.sort((a,b)=>a-b)
    //     // console.log(arr);
    //     let count = 0
    //     let last = 0
   
    //     for (let i = 0; i < arr.length; i++) {
    //         for (let j = 0; j < arr.length; j++) {
    //             if (arr[j] === arr[i]) {
    //                 count++
    //             }

    //         }
    //         if (count === 1) {

    //             if (limit === 1) {
    //                 return arr[i]
    //             }
    //             limit++
    //         }
    //         count = 0


    //     }

    // }
    // console.log(nonr(arrnr), 'hgjgfj');


}



export default page                                               