function wordpyramid(word)
{
    for(let i=1;i<(word.length*2);i++)
    {
        i<=word.length?console.log(word.slice(0,i)):console.log(word.slice(i-word.length,word.length))
    }
}

wordpyramid('CAT')