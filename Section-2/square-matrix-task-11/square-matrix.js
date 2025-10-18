function squareMatrix(size)
{
    let v=1
    for(let i=1;i<=size;i++)
    {
        let rowarray = []
        for(let j=1;j<=size;j++)
        {
            rowarray.push(v)
            v++
        }
        console.log(...rowarray)
    }
}

squareMatrix(3)