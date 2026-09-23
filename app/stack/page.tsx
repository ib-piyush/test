const page = () => {

    function bracket() {
        const str = "([{}])"
        const stack = []
        let top = ''
        for (const char of str) {
            top = stack[stack.length - 1]

            if (
                char === '(' || char === '[' || char === '{') {
                stack.push(char)
            } else {
               if (
                 (char === ')' && top !== '(') ||
                    (char === ']' && top !== '[') ||
                    (char === '}' && top !== '{')
               ) {
                return false
                
               }
               stack.pop()
            }
        }

        if (stack.length === 0) {
            return true
            
        } else {
            return false
        }



    }
    console.log(bracket());
    
    return (
        <></>
    )

}
export default page;