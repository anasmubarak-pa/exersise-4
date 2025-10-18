function maximumProduct(numberlist)
{
    let maxlist = []
    for(i = 0;i<3;i++)
    {
        maxlist.push(Math.max(...numberlist))
        for(let j=0; j<numberlist.length;j++)
        {
            if(numberlist[j]==maxlist[i])
            {
                numberlist.splice(j,1)
                break
            }
        }
    }
    return maxlist.reduce((a,b)=>a*b)
}

console.log(maximumProduct([1, 2, 3, 4]))
console.log(maximumProduct([-4, -3, -2, -1, 0]))
console.log(maximumProduct([-1, -2, -3, -4, -5]))