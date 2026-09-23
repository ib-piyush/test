

// @ts-nocheck
const page = () => {
    let arr = [2, 4, 7, 8]
    let k = 2

    function tmap(arr, mul) {


        let tarray = []
        for (let index = 0; index < arr.length; index++) {
            tarray.push(mul(arr[index]))

        }
        return tarray

    }
    function multiply(value) {
        let newValue = value * 2
        return newValue


    }
    console.log(tmap(arr, multiply));

    function filters(arr, fil) {
        let tarray = []
        for (let index = 0; index < arr.length; index++) {


            if (fil(arr[index])) {
                tarray.push(arr[index])
            }

        }
        return tarray


    }
    function condition(value) {
        if (value % 2 === 0) {
            return true

        } else {
            return false
        }

    }
    console.log(filters(arr, condition), 'ggg');

    function reducers(arr, sum) {
        let acc = 0
        for (let index = 0; index < arr.length; index++) {
            acc = sum(arr[index], acc)

        }
        return acc
    }
    function sum(value, acc) {

        return value + acc

    }
    console.log(reducers(arr, sum), 'ggg');

    const arr1 = [3, 7, 1, 7, 9, 1, 7, 4, 3]
    let maxSums = 0
    let k2 = 3;
    let windowSum = 0
    let left = 0

    function maxSum() {
        for (let index = 0; index < k2; index++) {
            windowSum += arr1[index]
        }
         maxSums = windowSum
        for (let index = k2; index < arr1.length; index++) {
            windowSum += arr1[index]
            windowSum -= arr1[index-k2]
            maxSums = Math.max(windowSum,maxSums)
           
        }
        return maxSums

    }
    console.log(maxSum(), 'hh');


}
export default page;