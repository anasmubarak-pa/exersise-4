function flattenArray(ip_array,return_array=[])
{
    for(let i=0;i<ip_array.length;i++)
    {
        console.log(ip_array[i],typeof ip_array[i])
        if((typeof ip_array[i])!='number')
        {
            console.log('array')
            let rt = flattenArray(ip_array[i],return_array)
            return_array.concat(rt)
        }
        else
        {
            return_array.push(ip_array[i])
        }
        
    }
    return return_array
}

console.log(flattenArray([1, [2, [3, [4]], 5]]))