// @ts-nocheck

const Page = () => {
    const word = 'rat'
    const word2 = 'tar '
    const arr = ["eat","tea","tan","ate","nat","bat"]

    const anagram = (param, param2) => {
        param = param.trim().replaceAll(" ",'')
        param2 = param2.trim().replaceAll(" ",'')
        if (param.length !== param2.length) {
            return false
        } 
        const map = new Map();
            for (const char of param) {
                map.set(char, (map.get(char) || 0) + 1)
            }
            for (const char of param2) {
                map.set(char, (map.get(char)||0) - 1)
                if (map.get(char) < 0 ) {
                    return false
                }
                
            }
            return true
       
    }
    // console.log(anagram(word, word2),'jjj')
    const groupAnagram = (param)=>{ 
        const map = new Map();
        for(const word of param){
            const key = word.split("").sort().join('');
            if (!map.has(key)) {
                map.set(key,[])
            }
            map.get(key).push(word)
        }
        return [...map.values()]
        
    }
  
    console.log(  groupAnagram(arr));
    
    return (
        <>
        </>
    )

}



export default Page;