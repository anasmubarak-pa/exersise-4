function naturalRoman(value)
{
    let lookuptable = {
        1:'I',5:'V',10:'X',50:'L',100:'C',
        500:'D',1000:'M'
    }
    let roman = ''
    if(lookuptable[value])
    {
        return lookuptable[value]
    }
    //calculating base value 1,5,10,50,100.500,1000 etc
    let cval=value
    // console.log(String(value).length)
    let prlength = value.length
    while(cval>0)
    {
        if(lookuptable[cval])
        {
            roman+=lookuptable[cval]
            break
        }
        // console.log(roman)
        let baseval = '1'
        for(let i=0;i<String(cval).length-1;i++)
        {
            baseval+=0
        }
        // console.log('baseval',baseval,'cval',cval)
        baseval=Number(baseval)
        //first if check for 5,50,500
        if(cval>=(baseval*9))
        {
            // console.log('special case 1',cval)
            // console.log('bef',cval)
            cval-=baseval*9
            roman+=lookuptable[baseval]+lookuptable[baseval*10]
            // console.log('af----',cval)
        } 
        else if(cval>(baseval*5))
        {
            // console.log('bef',cval)
            cval-=baseval*5
            roman+=lookuptable[baseval*5]
            // console.log('af----',cval)
        }
        else if(cval>=(baseval*4))
        {
            // console.log('special case 1',cval)
            // console.log('bef',cval)
            cval-=baseval*4
            roman+=lookuptable[baseval]+lookuptable[baseval*5]
            // console.log('af----',cval)
        }
        else
        {
            // console.log('current value',cval)
            // console.log('bef',cval)
            cval-=baseval
            // console.log('af----',cval)
            // console.log(lookuptable[baseval])
            roman+=lookuptable[baseval]
        }
    }
    return roman
}

console.log(naturalRoman(5))
console.log(naturalRoman(252))
console.log(naturalRoman(60))
console.log(naturalRoman(40))
console.log(naturalRoman(2000))
console.log(naturalRoman(1999))
console.log(naturalRoman(589))
