// @ts-nocheck
export default function page() {

    const str = 'abccbdafx'
    let left = 0;
    let Max = 0;
    const nums = [2, 1, 5, 1, 3, 2]
    const k = 3
    let sum = 0

    function check(str) {
        const map = new Map()
        for (let right = 0; right < str.length; right++) {
            while (map.has(str[right])) {
                map.delete(str[left])
                left++;
            }
            map.set(str[right])
            Max = Math.max(Max, right - left + 1)
        }
        return Max

    }
    console.log(check(str))
    function maxSum(arr, k) {
        for (let i = 0; i < k; i++) {
            sum += arr[i]
        }
        let maxx = sum
        for (let j = k; j < arr.length; j++) {
            sum += arr[j]
            sum -= arr[j - k]
            maxx = Math.max(maxx, sum)
        }
        return maxx
    }
    console.log(maxSum(nums, k), 'bbb')
    //longest ones
    const arr2 = [1, 0, 1, 1, 0, 1]
    let cc = 0
    let cons = 1
    let maxc = 0

    function longest(arr, k) {
        for (let i = 0; i < arr2.length; i++) {
            if (arr2[i] === k) {
                cc++;
                maxc = Math.max(maxc, cc);
            }
            if (arr2[i] !== k) {
                cc = 0;
            }
        }
        return maxc;
    }

    //Longest Subarray With Sum ≤ K


    console.log(longest(arr2, cons), 'bb')
    let arr3 = [1, 2, 8, 0, 1, 2, 1, 4]
    let k1 = 4

    function longestSum(arr, k) {
        let left = 0
        let sum = 0
        let maxLen = 0
        for (let right = 0; right < arr.length; right++) {
            sum += arr[right]
            while (sum > k) {
                sum -= arr[left]
                left++
            }
            maxLen = Math.max(maxLen, right - left + 1)
        }
        return maxLen
    }

    console.log(longestSum(arr3, k1), 'b')

    //moves all zero
    const arr4 = [0, 1, 0, 3, 12]
    let left4 = 0
    function moveZero(arr) {
        for (let right = 0; right < arr.length; right++) {
            if (arr[right] !== 0) {
                [arr[left4], arr[right]] = [arr[right], arr[left4]]
                left4++
            }
        }
        return arr
    }
    console.log(moveZero(arr4, 'hhh'));

    //unique element
    const arr5 = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
    let left5 = 0
    let uniqueCount = 0
    function ret(arr) {
        for (let right = 1; right < arr.length; right++) {
            if (arr[right] !== arr[left5]) {
                left5++
                arr[left5] = arr[right]

            }

        }

        return uniqueCount = left5 + 1;
    }
    console.log(ret(arr5), 'jhj');

    //max profit
    const arr6 = [7, 1, 5, 3, 9, 4]
    function profit(arr) {
        let buy = 0
        let MaxProfit = 0
        let currentProfit = 0
        for (let sell = 1; sell < arr.length; sell++) {
            if (arr[buy] > arr[sell]) {
                buy = sell
            }
            currentProfit = arr[sell] - arr[buy]
            MaxProfit = Math.max(MaxProfit, currentProfit)

        }
        return MaxProfit
    }
    console.log(profit(arr6), "jjv");

    //max volume 
    const arr7 = [49, 8, 89, 2, 5, 4, 8, 9, 7]
    function maxvolume(arr) {
        let left = 0;
        let currentVolume = 0;
        let maxVolume = 0;
        let width = 0;
        let minHeight = 0
        let right = arr.length - 1

        while (left < right) {
            width = right - left
            minHeight = Math.min(arr[left], arr[right])
            currentVolume = width * minHeight
            maxVolume = Math.max(currentVolume, maxVolume)
            if (arr[left] < arr[right]) {
                left++;
            } else {
                right--;
            }
        }
        return maxVolume
    }
    console.log(maxvolume(arr7), "jmv");

    //Longest Repeating Character Replacement

    const arr8 = "ABAABBA"
    let left8 = 0
    let maxCount = 0
    let k7 = 2
    let maxfrequency = 0
    const countMap = new Map()
    let windowsize = 0

    function longestRepeating(arr, k) {

        for (let right = 0; right < arr.length; right++) {
            countMap.set(arr[right],
                (countMap.get(arr[right]) || 0) + 1)
            maxfrequency = Math.max(maxfrequency, countMap.get(arr[right]))
            windowsize = right - left8 + 1;
            while (windowsize - maxfrequency > k) {
                countMap.set(arr[left8], countMap.get(arr[left8]) - 1)
                left8++
                windowsize = right - left8 + 1;

            }
            maxCount = Math.max(windowsize, maxCount)
        }
        return maxCount
    }
    console.log(longestRepeating(arr8, k7), "jlmv");



}
