function matrixTranspose(matrix)
{
    let rtmatrix=[]
    for(let column=0;column<matrix[1].length;column++)
    {
        let tmatrix=[]
        for(let row=0;row<matrix.length;row++)
        {
            console.log(matrix[row][column])
            tmatrix.push(matrix[row][column])
        }
        rtmatrix.push(tmatrix)
    }
    return rtmatrix
}

console.log(matrixTranspose([ [2, 9, 0], 
         [7, 1, 5] ]))