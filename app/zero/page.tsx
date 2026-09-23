// @ts-nocheck
export default function Page() {
    let size = 3;
    let arr = [12, 0, 8,7, 0, 9, 0];
    // max sum of consecutive window
    function find(k, arr) {
        let sum = 0;
        for (let i = 0; i < k; i++) {
            sum += arr[i]
        }
        let max = sum;
        for (let i = k; i < arr.length; i++) {
            sum += arr[i]
            sum -= arr[i - k]
            max = Math.max(max, sum)
        }
        return max

    }
    console.log(find(size, arr));

    // move all zero to end

    function moveToend(param) {
        let write = 0;
        for (let read = 0; read < param.length; read++) {
            if (param[read] !== 0) {
                [param[write],param[read]] = [param[read],param[write]] 
            write ++
            }
            
        }
        return param

    }
    console.log(moveToend(arr));
    return (
        <>
        </>
    )
}
