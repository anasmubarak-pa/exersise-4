function wordPermutations(word)
{
    let return_list = []
    let letters = word.split('')
    for(let i=0;i<word.length;i++)
    {
        let newlist = word.replace(letters[i],'')
        console.log('newlist',newlist)
        for(let j=0;j<word.length;j++)
        {
            // console.log('j',j)
            let rlist = newlist.split('')
            // console.log('rlist',rlist)
            rlist.splice(j,0,word[i])
            console.log(i,rlist)
            return_list.push(rlist.reduce((a,b)=>a+b))
        }
    }
    return new Set(return_list)
}

console.log(wordPermutations('abc'))
//abcd