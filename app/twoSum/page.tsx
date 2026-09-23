// @ts-nocheck
const Page = () => {
    const nums = [3, 1];
    const target = 2;

    function twoSum(nums, target) {
        const map = new Map();

        for (let i = 0; i < nums.length; i++) {
            const current = nums[i];
            const needed = target - current
            // const needed = current - target
            if (map.has(needed)) {
                return [map.get(needed), i]

            }
            map.set(current, i)
        }

        return null
    }
    const result = twoSum(nums, target)
    console.log(result, 'kk');

    function diff(nums, target) {
        const map = new Map();

        for (let i = 0; i < nums.length; i++) {
            const current = nums[i];
            if (map.has(current - target)) {
                return [map.get(current - target), i]

            }
            if (map.has(current + target)) {
                return [map.get(current + target), i]
            }
            map.set(current, i)
        }

        return null
    }

    return <></>;
};

export default Page;