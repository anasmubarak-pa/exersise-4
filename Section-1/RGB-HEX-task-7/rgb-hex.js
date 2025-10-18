function convertHex(value)
{
    let look_up = {10:'A',11:'B',12:'C',13:'D',14:'E',15:'F'}
    let hexval = ''
    while(value>0)
    {
        if(look_up[value]!=undefined)
        {
            // console.log('look up hit for',value,look_up[value])
            hexval+=look_up[value]
        }
        else if(look_up[value%16]!=undefined)
        {
            // console.log('look up hit for',value%16,look_up[value%16])
            hexval+=look_up[value%16]
        }
        else
        {
            hexval+=value%16
        }
        // console.log('hexval',value%16)
        value = Math.floor(value/16)
        // console.log(value)
    }
    if(hexval=='')
    {
        hexval='0'
    }
    return hexval.split('').reverse().reduce((a,b)=>a+b)
}


function rgbHex(value_array)
{
    let return_hex = '#'
    value_array.forEach(element => {
        if(convertHex(element).length==1)
        {
            return_hex+='0'+convertHex(element)
        }
        else{
            return_hex+=convertHex(element)
        }
    });
    return return_hex
}

console.log(rgbHex([255, 165, 0]))