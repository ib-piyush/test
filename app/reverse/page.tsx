// @ts-nocheck


const Test = () => {

  let letter = 'hello world';
  let reversed2 = '';
  let reversedSentenceByword = '';
  reuse(letter)

  function reuse(props) {
    if (props == null) {
      console.log('null')
      return
    }
    if (props == '') {
      console.log('empty')
      return
    }


    let trimmedProps = props.trim()

    trimmedProps = trimmedProps.split(" ")
    console.log(trimmedProps.length);

  let finalReversedsentence ='';
    for (let i = 0; i < trimmedProps.length ; i++) {
      let reversedWord = "";
    
      for (let j = trimmedProps[i].length-1 ; j >=0; j--) {
        reversedWord +=trimmedProps[i][j]
      }
      finalReversedsentence += reversedWord + " "
    }

    // reversing words order
    letter = letter.split(" ")
    console.log(letter.length,letter,'hhh')
    for(let i = letter.length-1;i>=0;i--){
    reversedSentenceByword += letter[i]+" "

    }
      console.log(finalReversedsentence);
      console.log(reversedSentenceByword);
  }

  

  

  return (
    <div>
      <p>{letter}</p>
    </div>
  );
};

export default Test;