// @ts-nocheck

import { log } from "console";

const Page = () => {
    let sen = "hi I am Piyush Kumar"

    function reuse(params: any) {
        const map = new Map()
        const modified = params.trim().replaceAll(" ", "").toLowerCase();
        for (const char of modified) {
            map.set(char, (map.get(char) || 0) + 1)
        }
        for (const char of modified) {
            if (map.get(char) === 1) {
                return char;

            }
        }
        return null
    }
    function reuse2(params: any) {
        const map2 = new Map()
        const modified = params.trim().replaceAll(" ", "").toLowerCase();
        for (const char of modified) {
            if (map2.has(char)) {
                return char
            }
            map2.set(char, 1)
        }
        return null;
    }

    console.log(reuse2(sen));
    console.log(reuse(sen));
    return (
        <>
        </>
    )
}

export default Page;