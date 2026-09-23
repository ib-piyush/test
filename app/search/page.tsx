import { cursorTo } from "readline";
import { log } from "util";

const Page = () => {

    //binary search 

    const arr = [1, 2, 3, 5, 7, 9]
    function bSearch(target: number, arr: any) {
        let low = 0
        let high = arr.length - 1

        while (low <= high) {
            let mid = Math.floor((low + high) / 2)
            if (arr[mid] === target) {
                return mid

            } else if (arr[mid] > target) {
                high = mid - 1
            } else {
                low = mid + 1
            }


        }
        return -1
    }

    console.log(bSearch(7, arr));

    //first occurance
    const arr1 = [1, 2, 2, 2, 2, 3, 5, 7, 9]

    function firstOccurance(target: number, arr: any) {
        let low = 0
        let high = arr.length - 1
        let result = -1
        while (low <= high) {
            let mid = Math.floor((low + high) / 2)
            if (arr[mid] === target) {
                result = mid
                high = mid - 1
            } else if (arr[mid] > target) {
                high = mid - 1
            } else {
                low = mid + 1
            }


        }
        return result

    }
    //last occurance
    const arr2 = [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 5, 7, 9]

    function lastOccurance(target: number, arr: any) {
        let low = 0
        let high = arr.length - 1
        let result = -1
        while (low <= high) {
            let mid = Math.floor((low + high) / 2)
            if (arr[mid] === target) {
                result = mid
                low = mid + 1
            }
            else if (arr[mid] > target) {
                high = mid - 1
            } else {
                low = mid + 1
            }

        }
        return result
    }

    // total occurrance

    function total(target: number, arr: any) {
        let count = lastOccurance(target, arr) - firstOccurance(target, arr) + 1
        return count
    }
    console.log(total(2, arr2));

    //right placement
    const arr3 = [1, 2, 4, 5, 6, 8, 9]
    function rightPlacement(target: number, arr: any) {
        let low = 0
        let high = arr.length - 1

        while (low <= high) {
            let mid = Math.floor((low + high) / 2)
            if (arr[mid] === target) {
                return mid

            }
            else if (arr[mid] > target) {
                high = mid - 1

            } else {
                low = mid + 1
            }
        }

        return low
    }

    console.log(rightPlacement(3, arr3));
    //floor and ceil
    const arr4 = [1, 2, 4, 5, 7, 8, 9]
    function floors(target: number, arr: any) {
        let low = 0
        let high = arr.length - 1
        let floor = -1
        while (low <= high) {
            let mid = Math.floor((low + high) / 2)
            if (arr[mid] === target) {
                return arr[mid]
            } else if (arr[mid] < target) {
                floor = arr[mid]
                low = mid + 1
            } else {
                high = mid - 1
            }

        }
        return floor
    }

    function ceil(target: number, arr: any) {
        let low = 0
        let high = arr.length - 1
        let ceil = -1
        while (low <= high) {
            let mid = Math.floor((low + high) / 2)
            if (arr[mid] === target) {
                return arr[mid]
            } else if (arr[mid] > target) {
                ceil = arr[mid]
                high = mid - 1
            } else {
                low = mid + 1
            }

        }
        return ceil
    }
    function floorCeil(target: number, arr: any) {
        return {
            floor: floors(target, arr),
            ceil: ceil(target, arr)
        }

    }
    console.log(floorCeil(6, arr4));

    //upper bound and lower bound
    const arr5 = [1, 2, 2, 3, 5, 7, 9]
    function lowerBound(target: number, arr: number[]) {
        let low = 0
        let high = arr.length - 1

        while (low <= high) {
            let mid = Math.floor((low + high) / 2)
            if (arr[mid] >= target) {

                high = mid - 1
            } else {
                low = mid + 1
            }

        }
        return low
    }
    function upperBound(target: number, arr: number[]) {
        let low = 0
        let high = arr.length - 1
        while (low <= high) {
            let mid = Math.floor((low + high) / 2)
            if (arr[mid] > target) {
                high = mid - 1

            } else {
                low = mid + 1
            }

        }
        return low

    }
    function upperLowerBound(target: number, arr: number[]) {
        return {
            upperBound: upperBound(target, arr),
            lowerBound: lowerBound(target, arr)
        }
    }
    console.log(upperLowerBound(2, arr5));

    // searching in rotated array

    const arr6 = [4, 5, 6, 7, 0, 1, 2]

    function roated(target: number, arr: number[]) {
        let low = 0
        let high = arr.length - 1
        while (low <= high) {
            let mid = Math.floor((low + high) / 2)
            if (arr[mid] === target) {
                return mid
            }
            else if (target <= arr[mid] && target >= arr[low]) {
                high = mid - 1

            } else {
                low = mid + 1
            }

        }

        return -1
    }
    console.log(roated(2, arr6));
    function roated2(target: number, arr: number[]) {
        let low = 0
        let high = arr.length - 1
        while (low <= high) {
            let mid = Math.floor((low + high) / 2)
            if (arr[mid] === target) {
                return mid
            }
            if (arr[mid] >= arr[low]) {
                if (target < arr[mid] && target >= arr[low]) {
                    high = mid - 1
                } else {
                    low = mid + 1
                }
            } else {
                if (target > arr[mid] && target <= arr[high]) {
                    low = mid + 1
                } else {
                    high = mid - 1
                }
            }

        }

        return -1
    }
    console.log(roated2(6, arr6));

    //seraching minimum in rotated array

    const arr7 = [5, 6, 7, 0, 2, 3, 4]

    function minimumInrotated(arr: number[]) {

        let low = 0
        let high = arr.length - 1
        while (low < high) {
            let mid = Math.floor((low + high) / 2)

            if (arr[low] <= arr[high]) {
                return arr[low]
            }
            if (arr[mid] > arr[high]) {
                low = mid + 1

            } else {
                high = mid
            }


        }
    }
    console.log(minimumInrotated(arr7));

    //mountain peak

    const arr8 = [6, 7, 4, 6, 3]

    function peak(arr: number[]) {
        let low = 0
        let high = arr.length - 1
        while (low < high) {
            let mid = Math.floor((low + high) / 2)
            if (arr[mid] >= arr[mid + 1]) {
                high = mid
            } else {
                low = mid + 1
            }
        }
        return low
    }
    console.log(peak(arr8));

    const matrix = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [10, 11, 14]
    ];
    function searchMatrix(matrix: number[][], target: number) {
        if (matrix.length === 0 || matrix[0].length === 0) {
            return false;
        }

        const rows = matrix.length;
        const cols = matrix[0].length;
        let low = 0;
        let high = rows - 1
        while (low <= high) {
            let mid = Math.floor((low + high) / 2)
            let firstIndex = matrix[mid][0]
            let lastIndex = matrix[mid][cols - 1]
            if (target >= firstIndex && target <= lastIndex) {
                let low2 = 0
                let high2 = cols - 1
                while (low2 <= high2) {
                    let mid2 = Math.floor((low2 + high2) / 2)
                    let midValue = matrix[mid][mid2]
                    if (midValue === target) {
                        return true
                    } else if (midValue > target) {
                        high2 = mid2 - 1
                    } else {
                        low2 = mid2 + 1
                    }
                }
                return false
            } else if (target < firstIndex) {
                high = mid - 1
            } else {
                low = mid + 1
            }

        }
        return false

    }
    console.log(searchMatrix(matrix, 33));

    //banana koko

    const arr9 = [1, 3, 6, 9, 11]
    function helper(arr: number[], h: number, s: number) {
        let sum = 0
        for (let i = 0; i < arr.length; i++) {
            sum += Math.ceil(arr[i] / s)
        }
        if (sum <= h) {
            return true

        } else {
            return false
        }

    }
    function binaryBanana(arr: number[], h: number) {
        let low = 1
        let high = arr[arr.length - 1]
        let answer = -1
        while (low <= high) {
            let mid = Math.floor((low + high) / 2)

            let result = helper(arr, h, mid)

            if (result) {
                answer = mid
                high = mid - 1
            } else {
                low = mid + 1
            }

        }
        return answer
    }
    console.log(binaryBanana(arr9, 8));

    //Ship Packages Within D Days
    const weights = [3, 2, 7, 4]

    function helpers(arr: number[], days: number, mid: number) {

        let day = 1
        let currentWeight = 0
        for (let i = 0; i < arr.length; i++) {
            if (currentWeight + arr[i] <= mid) {
                currentWeight += arr[i]
            } else {
                day++
                currentWeight = arr[i]
            }

        }
        return day <= days
    }

    function ship(arr: number[], days: number) {
        let low = Math.max(...arr)
        let high = arr.reduce((sum, arr) => sum + arr, 0)
        let answer = -1
        while (low <= high) {
            let mid = Math.floor((low + high) / 2)
            let result = helpers(arr, days, mid)
            if (result) {
                answer = mid
                high = mid - 1
            } else {
                low = mid + 1
            }

        }
        return answer
    }

    console.log(ship(weights, 1), 'jjhbkjhg');

    //pages allocation
    const arr10 = [12, 34, 67, 90]

    function helperss(lib: number[], stud: number, mid: number) {
        let student = 1
        let currentSum = 0
        for (let i = 0; i < lib.length; i++) {
            if (currentSum + lib[i] <= mid) {
                currentSum = currentSum + lib[i]

            } else {
                student++
                currentSum = lib[i]
            }

        }
        return student <= stud



    }
    function books(lib: number[], stud: number) {
        let low = Math.max(...lib)
        let high = lib.reduce((sum, lib) => sum + lib, 0)
        let answer = -1
        while (low <= high) {
            let mid = Math.floor((low + high) / 2)
            let result = helperss(lib, stud, mid)
            if (result) {
                answer = mid
                high = mid - 1
            } else {
                low = mid + 1
            }
        }
        return answer
    }
    console.log(books(arr10, 2));
    //cow
    const stalls = [1, 2, 4, 8, 9]

    function help(arr: number[], cow: number, mid: number) {
        let cowCount = 1
        let lastPosition = arr[0]
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] - lastPosition >= mid) {
                cowCount++
                lastPosition = arr[i]
            }

        }
        return cowCount >= cow

    }

    function stall(arr: number[], cow: number) {
        let low = 1
        let high = arr[arr.length - 1] - arr[0]
        let answer = -1

        while (low <= high) {
            let mid = Math.floor((low + high) / 2)
            let result = help(arr, cow, mid)
            if (result) {
                answer = mid
                low = mid + 1
            } else {
                high = mid - 1

            }
        }
        return answer

    }
    console.log(stall(stalls, 3), 'hhh');

    //Split Array Largest Sum

    const nums = [7, 2, 5, 10, 8]

    function helper5(arr:number[],k:number,mid:number) {
        let currentCount = 1
        let sum = arr[0]
        for (let i = 1; i < arr.length; i++) {
            if (sum + arr[i]<= mid) {
               sum += arr[i]
                
            }else{
                currentCount ++
                sum = arr[i]
            }
            
        }
        return currentCount <= k

        
    }
    function splitArray(arr:number[],k:number) {
        let low = Math.max(...arr)
        let high = arr.reduce((sum,arr)=>sum+arr,0)
        let answer = -1
        while (low<=high) {
            let mid = Math.floor((low + high)/2)
            let result = helper5(arr,k,mid)
            if (result) {
                answer = mid
                high = mid - 1
                
            }else{
                low = mid +1
            }
            
        }
        return answer
    }

    console.log(splitArray(nums,3));
    


    return (
        <div>
        </div>
    );
};

export default Page;