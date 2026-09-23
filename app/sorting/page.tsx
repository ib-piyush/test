// @ts-nocheck

import { log } from "node:console";
import Function from "../palindrome/page";

const page = () => {

    //bubble sort

    const arrb = [5, 9, 7, 3, 2, 1]
    function bubble(arr) {

        for (let i = 0; i < arr.length; i++) {
            for (let j = 1; j < arr.length - i; j++) {
                if (arr[j] < arr[j - 1]) {
                    [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]]

                }

            }


        }

        return arr
    }
    console.log(bubble(arrb), 'b');

    //selection sort 
    const arrs = [5, 9, 7, 3, 2, 1]

    function selection(arr) {
        for (let i = 0; i < arr.length; i++) {
            let minIndex = i
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j
                }
            }
            if (minIndex !== i) {
                [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];

            }
        }
        return arr
    }
    console.log(selection(arrs), 's');

    const arri = [5, 9, 7, 3, 2, 1]
    function insertion(arr) {
        for (let i = 1; i < arr.length; i++) {
            let current = arr[i]
            let j = i - 1

            while (j >= 0 && arr[j] > current) {
                arr[j + 1] = arr[j]
                j--
            }
            arr[j + 1] = current


        }
        return arr
    }
    console.log(insertion(arri), 'i');

    const arrm = [8, 3, 5, 4, 7, 6, 1, 2]

    function mergeSort(arr) {
        if (arr.length < 2) {
            return arr

        }
        let mid = Math.floor(arr.length / 2)
        let left = mergeSort(arr.slice(0, mid))
        let right = mergeSort(arr.slice(mid))

        return merge(left, right)
    }

    function merge(left, right) {
        let result = []
        let i = 0, j = 0
        while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) {
                result.push(left[i])
                i++
            } else {
                result.push(right[j])
                j++
            }

        }
        while (i < left.length) {
            result.push(left[i])
            i++
        } while (j < right.length) {
            result.push(right[j])
            j++
        }
        return result


    }

    console.log(mergeSort(arrm), 'jm');

    const arrq = [8, 3, 5, 4, 7, 6, 1, 2]

    function quickSort(arr: number[], low: number, high: number) {
        if (low < high) {
            const pivotIndex = partion(arr, low, high)
            quickSort(arr, low, pivotIndex - 1)
            quickSort(arr, pivotIndex + 1, high)

        }
        return arr

    }
    function partion(arr: number[], low: number, high: number) {
        let pivot = arr[high]
        let i = low - 1
        for (let j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++
                [arr[i], arr[j]] = [arr[j], arr[i]]
            }


        }
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
        return i + 1

    }

    console.log(quickSort(arrq, 0, arrq.length - 1), 'jq')

    //practice 
    //dutch flag

    const arr = [1, 0, 2, 0, 1, 0]
    function dutch(arr: number[]) {
        let mid = 0
        let low = 0
        let high = arr.length - 1
        while (mid <= high) {
            if (arr[mid] === 0) {
                [arr[low], arr[mid]] = [arr[mid], arr[low]]
                low++
                mid++
            } else if (arr[mid] === 1) {
                mid++
            } else {
                [arr[high], arr[mid]] = [arr[mid], arr[high]]
                high--
            }

        }
        return arr

    }
    console.log(dutch(arr), 'd');

    //group anagram

    const strs = ["eat", "tea", "tan", "ate", "nat", "bat"];

    function anagram(str: string[]) {
        const map = new Map<string, string[]>()
        for (const w of str) {
            const key = w.split('').sort().join('')
            if (map.has(key)) {
                map.get(key)!.push(w)
            } else {
                map.set(key, [w])
            }
        }
        return Array.from(map.values())
    }
    console.log(anagram(strs));

    //interval

    // const intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]
    // function interval(arr: number[][]) {
    //     arr.sort((a, b) => a[0] = b[0])
    //     let result: number[][] = []
    //     result.push[0]
    //     for (let i = 1; i < arr.length; i++) {
    //         let current = arr[i]
    //         let last = result[result.length - 1]
    //         if (current[0] < last[1]) {
    //             last[1] = Math.max(current[1], last[1])

    //         } else {
    //             result.push(current)
    //         }


    //     }
    //     return arr;
    // }
    // console.log(interval(intervals));

    const intervaly = [
        [1, 2],
        [2, 3],
        [3, 4],
        [1, 3]
    ]
    function intervalx(arr: number[][]) {
        arr.sort((a, b) => a[1] - b[1])
        let removed = 0
        let lastEnd = arr[0][1]
        for (let i = 1; i < arr.length; i++) {
            let start = arr[i][0]
            if (lastEnd > start) {
                removed++

            } else {
                lastEnd = arr[i][1]
            }

        }
        return removed;

    }
    console.log(intervalx(intervaly));

    const greed = [5, 1, 4, 2, 6];
    const cookies = [1, 3, 2, 2, 4];

    function findContentChildren(greed: number[], cookies: number[]) {
        greed.sort((a, b) => a - b)
        cookies.sort((a, b) => a - b)

        let i = 0
        let j = 0
        while (i < greed.length && j < cookies.length) {
            if (greed[i] <= cookies[j]) {
                i++
                j++
            } else {
                j++
            }

        }
        return i


    }
    console.log(findContentChildren(greed, cookies), 'k');

    //kth largest element
    const largest = [5, 1, 4, 2, 6];
    function kth(arr: number[], k: number) {
        arr.sort((a, b) => a - b)
        console.log(arr);

        let result = arr[arr.length - k]

        console.log(result);

        return result;

    }
    console.log(kth(largest, 2), 'kj');

    //kth largest element using pivot sort
    const largestx = [5, 1, 4, 2, 6];
    function partionxx(arr, low, high) {
        let i = low - 1
        let pivot = arr[high]
        for (let j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++
                [arr[i], arr[j]] = [arr[j], arr[i]]
            }
        }
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]

        return i + 1


    }
    function kthx(arr: number[], low: number, high: number, k: number) {

        let pivotIndex = partionxx(arr, low, high)
        console.log(pivotIndex, 'jh');

        if (pivotIndex === arr.length - k) {
            return arr[pivotIndex]
        } else if (pivotIndex < arr.length - k) {
            return kthx(arr, pivotIndex + 1, high, k)
        } else {
            return kthx(arr, low, pivotIndex - 1, k)
        }
    }



    console.log(kthx(largestx, 0, largestx.length - 1, 3));

    const st = "tree"

    function arrangeString(str: string) {
        const map = new Map()
        for (const char of str) {
            map.set(char, (map.get(char) || 0) + 1)
        }
        const sortedEnteries = Array.from(map.entries()).sort((a, b) => b[1] - a[1])
        let result = ''
        for (const [char, count] of sortedEnteries) {
            result += char.repeat(count)

        }
        return result

    }
    console.log(arrangeString(st));

    const nums = [3, 30, 34, 5, 9];

    function largestNumber(arr: number[]) {
        const str = arr.map(n => n.toString())
        str.sort((a, b) => (b + a).localeCompare(a + b))
        if (str[0] === '0') {
            return '0'
        }
        return str.join('')
    }
    console.log(largestNumber(nums));

    //inversion count
    const arrinv = [1, 20, 6, 4, 5]
    function inversionCount(arr: number[]) {
        let count = 0
    }
    console.log(inversionCount(arrinv));

}
function countInversions(arr: number[]) {
    function mergeSort(arr:number []):number {
        if (arr.length <=1) {
            return 0
        }
        const mid = Math.floor(arr.length/2)
        const left = arr.slice(0,mid)
        const right = arr.slice(mid)
        let count = 0

        count += mergeSort(left)
        count += mergeSort(right)

        let i = 0
        let j = 0
        let k = 0

        while (i<left.length && j<right.length) {
            if (left[i]<=right[j]) {
                arr[k] = left[i]
                i++
            } else {
                arr[k] = right[j]
                                j++  
                count +=left.length -i

            }
            k++
        }
        while (i < left.length) {
            arr[k]=left[i]
            i++
            k++
            
        }
         while (j < right.length) {
            arr[k]=right[j]
            j++
            k++
            
        }
        return count
        
    }
    return mergeSort(arr)

}

console.log(countInversions([5, 3, 4, 1]),"ugug")
export default page;
