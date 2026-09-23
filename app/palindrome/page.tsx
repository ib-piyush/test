// @ts-nocheck
const Function = () =>{

  let sent = "A man a plan a canal Panama"
  palindrome(sent)
  function palindrome(props){
    let revSen=''
    props = props.toLowerCase().replaceAll(" ","")
    for (let i = props.length-1; i >=0; i--) {
      revSen += props[i]
    }
    if (revSen == props) {
        console.log('true');
        return
    }
    console.log('false')
  }
  return (
    <div>

    </div>
  );
}

export default Function;

