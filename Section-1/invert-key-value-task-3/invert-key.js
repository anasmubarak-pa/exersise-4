function invertKey(obj)
{
    let return_obj = {}
    let keys = Object.keys(obj)
    let values = Object.values(obj)
    for(let i=0;i<keys.length;i++)
    {
        return_obj[values[i]] = keys[i]
    }

    return return_obj
}

console.log(invertKey({ a: 1, b: 2 }))