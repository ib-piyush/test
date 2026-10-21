
// @ts-nocheck
const page = () => {
    let arr = [2, 4, 7, 8]
    let k = 2

    function customMap(arr, mul) {
        const newArray = []
        for (let index = 0; index < arr.length; index++) {
            newArray.push(mul(arr[index]))

        }
        return newArray
    }
    function mul(i) {
        return i * 2
    }

    console.log(customMap(arr, mul));

    let arr2 = [1, 2, 3, 4, 5, 6, 7]

    function filters(arr, condition) {
        let newArray = []
        for (let i = 0; i < arr.length; i++) {
            if (condition(arr[i])) {
                newArray.push(arr[i])
            }

        }
        return newArray
    }
    function condition(i) {
        if (i % 2 === 0) {
            return true

        } else {
            return false
        }

    }
    console.log(filters(arr2, condition), 'ggg');

    function reducers(arr, sum) {
        let acc = 0;
        for (let i = 0; i < arr.length; i++) {
            acc = sum(arr[i], acc)
        }
        return acc
    }
    function sum(value, acc) {
        return acc += value
    }
    console.log(reducers(arr, sum), 'gggn');

    const arr1 = [3, 7, 1, 7, 9, 1, 7, 4, 3]

    function swindow(arr) {
        let k = 3
        let windowSum = 0
        let maxSum = 0

        for (let i = 0; i < k; i++) {
            windowSum += arr[i]
        }
        maxSum = windowSum
        for (let index = 3; index < arr.length; index++) {
            windowSum += arr[index]
            windowSum -= arr[index - k]
            maxSum = Math.max(windowSum, maxSum)

        }
        return maxSum
    }
    console.log(swindow(arr1), 'hgghx');

    //merge two array after removing duplicates

    const arrA = [1, 2, 3];
    const arrB = [3, 4, 5];

    const uniqueMerged = [... new Set([...arrA, ...arrB])]
    console.log(uniqueMerged);

    //merge two array after removing duplicates without 
    function merge(a, b) {
        const seen = new Set()
        for (let i = 0; i < a.length; i++) {
            if (!seen.has(a[i])) {
                seen.add(a[i])

            }

        }
        for (let i = 0; i < b.length; i++) {
            if (!seen.has(b[i])) {
                seen.add(b[i])

            }

        }
        return [...seen]
    }
    console.log(merge(arrA, arrB));

    // counter using closure
    function counter() {
        let count = 0
        return {
            increment: function () {
                count++
                return count
            },
            decrement: function () {
                count--
                return count

            }

        }

    }

    let log = counter()
    let log2 = counter()
    console.log(log.increment());
    console.log(log.decrement());
    console.log(log.decrement());

    console.log(log2.decrement());

    //frequency count 

    let arr3 = [1, 2, 3, 3, 4, 6, 8, 2]
    function frequency(arr) {
        const map = new Map()
        for (let i = 0; i < arr.length; i++) {
            if (map.has(arr[i])) {
                map.set(arr[i], (map.get(arr[i]) || 0) + 1)
            } else {
                map.set(arr[i], 1)
            }
        }
        return [...map.values()]

    }
    console.log(frequency(arr3));

    //string zigzag conversion
    function s(string, numOfRows) {
        if (numOfRows === 1 || s.length <= numOfRows) {
            return s
        }
        let rows = new Array(numOfRows).fill("")
        let currentRow = 0
        let down = false
        for (let i = 0; i < s.length; i++) {
            rows[currentRow] += s[i]
            if (currentRow === 0 || currentRow === numRows - 1) {
                goingDown = !goingDown;
            }
            currentRow += goingDown ? 1 : -1;
        }
        return rows.join("");

    }

    // remove duplicates

    let arr5 = [1, 3, 3, 4, 7, 8, 9]

    function removeDuplicateCustom(arr) {
        let seen = {}
        let newArray = []

        for (let i = 0; i < arr.length; i++) {
            let currentItem = arr[i]
            if (!seen[currentItem]) {
                seen[currentItem] = true
                newArray.push(arr[i])

            }

        }
        return newArray

    }
    console.log(removeDuplicateCustom(arr5));


    //palindrome

    let st = "racecar"
    function palindrome(s) {
        let left = 0
        let right = s.length - 1
        while (left <= right) {
            if (s[left] === s[right]) {
                left++
                right--

            } else {
                return false
            }

        }
        return true
    }
    console.log(palindrome(st));

    //anagram

    let st1 = "listen"
    let st2 = "silent"

    function anagramCheck(st1, st2) {
        if (st1.length !== st2.length) return false;
        let map = new Map()
        for (let i = 0; i < st1.length; i++) {
            map.set(st1[i], (map.get(st1[i]) || 0) + 1)
        }
        for (let i = 0; i < st2.length; i++) {
            let char = st2[i]
            if (!map.has(char) || map.get(char) === 0) {
                return false
            }
            map.set(char, map.get(char) - 1)

        }
        return true


    }
    console.log(anagramCheck(st1, st2));

    //first non repeating character in string

    let st3 = "eeetcode"

    function nonRep(st3) {
        const map = new Map()
        for (let i = 0; i < st3.length; i++) {
            let char = st3[i]
            map.set(char, (map.get(char) || 0) + 1)
        }
        for (let i = 0; i < st3.length; i++) {
            if (map.get(st3[i]) === 1) {
                return st3[i]
            }

        }

        return -1
    }
    console.log(nonRep(st3));


    //flatten nested array with flat and without flat
    const matrix = [
        [1, 2, 3],  // Row 0
        [4, 5, 6],  // Row 1
        [7, 8, 9]   // Row 2
    ];

    // console.log(matrix.flat());

    function flatten(arr) {
        let newArr = []
        for (let i = 0; i < arr.length; i++) {
            let currentArr = arr[i]
            if (Array.isArray(currentArr)) {
                let flattenSub = flatten(currentArr)
                for (let j = 0; j < flattenSub.length; j++) {
                    newArr.push(flattenSub[j])

                }

            } else {
                newArr.push(currentArr);
            }


        }
        return newArr

    }
    console.log(flatten(matrix));



    // flatten obj 
    const user = {
        id: 1,
        personal: {
            name: "Alex",
            address: {
                city: "New York",
                zip: 10001
            }
        }
    };

    const newUser = structuredClone(user)
    console.log(newUser);

    // two sum

    function twoSum(arr, target) {
        const map = new Map()
        for (let i = 0; i < arr.length; i++) {
            let currentNum = arr[i]
            let complement = target - currentNum
            if (map.has(complement)) {
                return [map.get(complement), i]

            } else {
                map.set(currentNum, i)
            }

        }
        return [];

    }
    console.log(twoSum(arr5, 9), 'jj');

    //3sum

    const arr7 = [4, -1, 7, 4, 5, 4, 2, 1]

    function threeSum(arr, target) {
        arr = arr.sort((a, b) => a - b)
        const result = []
        for (let i = 0; i < arr.length - 2; i++) {
            if (i > 0 && arr[i] === [arr - 1]) {
                continue
            }
            let first = arr[i]
            let left = i + 1
            let right = arr.length - 1
            while (left < right) {
                if (arr[left] + arr[right] === target - (first)) {
                    result.push([first, arr[left], arr[right]])
                    left++
                    right--

                    while (left < right && arr[left] === arr[left + 1]) {
                        left++
                    }
                    while (left < right && arr[right] === arr[right - 1]) {
                        right--
                    }

                } else if (arr[left] + arr[right] > target - (first)) {
                    right--
                } else {
                    left++
                }


            }
        }
        return result
    }

    console.log(threeSum(arr7, 7), 'hhcvv');

    //reverse a tring

    function reverse() {
        let str = "abcdef"
        let chars = str.split("")
        let left = 0
        let right = chars.length - 1
        while (left < right) {
            [chars[left], chars[right]] = [chars[right], chars[left]]
            left++
            right--
        }
        return chars.join("")


    }
    console.log(reverse());

    //reverse word

    function reverseWord() {
        let sentence = "  i am piyush "
        let newSentence = sentence.trim().replace(/\s+/g, " ").split(" ")
        let left = 0
        let right = newSentence.length - 1
        while (left < right) {
            [newSentence[left], newSentence[right]] = [newSentence[right], newSentence[left]]
            left++
            right--

        }
        return newSentence.join(" ")

    }

    console.log(reverseWord());

    //reverse each word in sentence

    function reverseEachWord() {
        let sentence = "  i am piyush "
        let newSentence = sentence.trim().replace(/\s+/g, " ").split(" ")
        let result = []
        for (let i = 0; i < newSentence.length; i++) {
            let word = newSentence[i].split('')
            let left = 0
            let right = word.length - 1
            while (left < right) {
                [word[left], word[right]] = [word[right], word[left]]
                left++
                right--
            }

            result.push(word.join(''))


        }
        return result.join(" ")

    }
    console.log(reverseEachWord());



    //reverse each word of senetrence and the entire sentece

    function reverseEachWordAndSen() {
        let sentence = "  i am piyush "
        let newSentence = sentence.trim().replace(/\s+/g, " ").split(" ")
        let result = new Array(newSentence.length)
        for (let i = 0; i < newSentence.length; i++) {
            let word = newSentence[i].split('')
            let left = 0
            let right = word.length - 1
            while (left < right) {
                [word[left], word[right]] = [word[right], word[left]]
                left++
                right--
            }

            let reverseIndex = newSentence.length - 1 - i;
            result[reverseIndex] = word.join('');


        }
        return result.join(" ")

    }

    console.log(reverseEachWordAndSen());

}
export default page;