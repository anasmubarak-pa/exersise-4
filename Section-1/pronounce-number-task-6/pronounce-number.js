function pronounceNumber(value,r)
{
    let numberlist = {'0':'zero','1':'one','2':'two','3':'three','4':'four','5':'Five',
                      '6':'six','7':'seven','8':'eight','9':'nine','10':'ten',
                      '11':'Eleven','12':'Twelve','13':'Thirteen','14':'Fourteen','15':'Fifteen',
                      '16':'Sixteen','17':'Seventeen','13':'Eighteen','14':'Nineteen',
                      '20':'twenty','30':'thirty','40':'fourty','50':'Fifty','60':'sixty',
                      '70':'seventy','80':'eighty','90':'ninety','100':'hundred','1000':'thousand','100000':'lakh','10000000':'crore'}
    let pronounce = ''
    let tempkey = '1'
    let fflag = 1
    let andflag = 1
    let string_val = String(value)
    let i = 0
    // if(numberlist[value])
    // {
    //     return numberlist[value]
    // }

    while(i<string_val.length)
    {
        // console.log(string_val)
        if(tempkey='1')  
        {
            for(j=0;j<string_val.slice(i).length-1;j++)
            {
                tempkey+=0
            }
            // console.log('tempkey',tempkey)
        }
        if(string_val[i]=='0')
        {
            // console.log('sp',string_val[i])
            i++
            continue
        }

        if(string_val.slice(i).length>3)
        {
            //the count variable extract the number like 23 in 23456 to get 23 thousand or somethig like 100 thousand
            let count = tempkey
            let cc = 1
            while(numberlist[tempkey]==undefined&&numberlist[count]==undefined)
            {
                count = tempkey.slice(0,-cc)
                cc++
                // console.log('count',count)
            }
            // console.log('final count',count)
            //we count and mod to get the 23 and call this funtion to get the prnounciation and cut and
            // console.log('number string',i, (Number(string_val.slice(i))-(Number(string_val)%Number(count)))/count+' '+numberlist[count])
            // console.log('recursive',pronounceNumber((Number(string_val)-(Number(string_val)%Number(count)))/count,1)+' '+numberlist[count])
            pronounce+=' '+pronounceNumber((Number(string_val.slice(i))-(Number(string_val)%Number(count)))/count)+' '+numberlist[count]
            i+=cc
            continue
        }
        else if(string_val.slice(i).length>2)
        {
            //tempkeyt should have the corresponding 1xxx base value 700 - 100,
            pronounce += ' '+numberlist[string_val[i]]+' '+numberlist[tempkey]
            // console.log(numberlist[string_val[i]])
        }
        else
        {
            if(andflag&&string_val.length>2)
            {
                pronounce+=' and'
                andflag = 0
                //to get 723 seven hundred 'and' twenty three, andflag limits it's execution
            }
            //string_val.slice(i) cuts the range 723->23->3 we can use it to mod and minus 3
            // console.log('tkey',tempkey)
            // console.log('strval-',Number(string_val.slice(i))-Number(string_val.slice(i))%Number(tempkey))
            if(Number(string_val.slice(i))>10&&Number(string_val.slice(i))<20)
            {
                pronounce+=' '+numberlist[Number(string_val.slice(i))]
            }
            else{
                pronounce+=' '+numberlist[Number(string_val.slice(i))-Number(string_val.slice(i))%Number(tempkey)]
            }
            if(Number(string_val.slice(i))%Number(tempkey)==0||Number(string_val.slice(i))>10&&Number(string_val.slice(i))<20)
            {
                i+=2
                continue
            }
        }
        i++
    }
    return pronounce
}

console.log(pronounceNumber(723))
console.log(pronounceNumber(2359))
console.log(pronounceNumber(99999))
console.log(pronounceNumber(70999))
console.log(pronounceNumber(60709))
console.log(pronounceNumber(50585))
console.log(pronounceNumber(1001200))
console.log(pronounceNumber(10100000))