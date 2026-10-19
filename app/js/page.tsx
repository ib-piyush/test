
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

    let arr3 = [1,2,3,3,4,6,8,2]
    function frequency(arr) {
        const map = new Map()
        for(let i = 0;i<arr.length;i++){
            if (map.has(arr[i])){
                map.set(arr[i],(map.get(arr[i]) ||0) +1)
            }else{
                map.set(arr[i],1)
            }
        }
        return [...map.values()]
        
    }
    console.log(frequency(arr3));
    




}
export default page;