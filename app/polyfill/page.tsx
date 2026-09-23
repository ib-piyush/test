// @ts-nocheck
function page() {
    const arr = [1, 7, 8, 9, 3]
    function foreach(arr, callback) {
        for (let index = 0; index < arr.length; index++) {
            callback(arr[index])
        }
    }
    function callback(num) {
        console.log(num)

    }

    foreach(arr, callback)

    const person ={
        name:"piyush",
        greet(){
            console.log(this.name)
        }
    }
    
    person.greet()
    const person2={
        name:'kumar'
    }
    person.greet.call(person2)
    return (
        <div>
        </div>
    )
}

export default page