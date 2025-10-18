function camelSnake(word)
{
    for(let i=0;i<word.length;i++)
    {
        if(word[i].charCodeAt(0)<90)
        {
            word = word.slice(0,i).concat('-').concat(word[i].toLowerCase()).concat(word.slice(i+1,word.length))
        }
    }
    return word
}

console.log(camelSnake('myFunction'))