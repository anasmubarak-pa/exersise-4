function pronounceNumber(value)
{
    if(!typeAsserter(value,'number'))
    {
        return 'Invalid argument'
    }
    let numberlist = {'0':'zero','1':'one','2':'two','3':'three','4':'four','5':'five',
                      '6':'six','7':'seven','8':'eight','9':'nine','10':'ten',
                      '11':'eleven','12':'twelve','13':'thirteen','14':'fourteen','15':'fifteen',
                      '16':'sixteen','17':'seventeen','13':'eighteen','14':'nineteen',
                      '20':'twenty','30':'thirty','40':'fourty','50':'fifty','60':'sixty',
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
    return pronounce.trim()
}

// console.log(pronounceNumber(723))
// console.log(pronounceNumber(2359))
// console.log(pronounceNumber(99999))
// console.log(pronounceNumber(70999))
// console.log(pronounceNumber(60709))
// console.log(pronounceNumber(50585))
// console.log(pronounceNumber(1001200))
// console.log(pronounceNumber(10100000))

function typeAsserter(...typelist)
{
    let i =0
    for(i=0;i<typelist.length;i+=2)
    {
        if(typelist[i+1].indexOf('|')!=-1)
        {
            let tlist = typelist[i+1].split('|')
            if(!(tlist.find((e)=>e==typeof typelist[i])))
            {
                // console.log(tlist)
                return false
            }
        }
        else if(Array.isArray(typelist[i])||typelist[i+1]=='Array')
        {
            if(!Array.isArray(typelist[i])||(typelist[i+1]!=='Array'))
            {
                return false
            }
        }
        else if(typeof typelist[i]!=typelist[i+1])
        {
            return false
        }
    }
    return true
}

function testProgram(callback,inputArray,expectedOutputArray)
{
    function getcopy(element){
        return JSON.parse(JSON.stringify(element))
    }
  function checkEqual(obj1,obj2)
  {
      let i = 0
      let keys = Object.keys(obj2)
      if(Object.keys(obj1).length!=Object.keys(obj2).length)
      {
        return 'Not Equal'
      }
      for(let key in obj1)
      {
          if(typeof obj1[key]=='object'||typeof obj2[keys[i]]=='object')
          {
              if(typeof obj1[key]!='object'||typeof obj2[keys[i]]!='object')
              {
                  return 'Not Equal'
              }
              else
              {
                  if(checkEqual(obj1[key],obj2[keys[i]])!='Equal')
                  {
                      return 'Not Equal'
                  }
              }
              i++
          }
          else
          {
            if((typeof key=='number'&&isNaN(key)||(typeof obj1[key]=='number')&&isNaN(obj1[key])))
            {
                if((typeof key=='number'||typeof obj1[key]=='number')&&(isNaN(key)&&!(isNaN(keys[i]))||isNaN(obj1[key])&&!isNaN(obj2[keys[i]])))
                {
                    // console.log('nan2')
                    return 'Not Equal'
                }
            }
            else if(key!=keys[i]||obj1[key]!=obj2[keys[i]])
            {
                return 'Not Equal'
            }
            i++
          }
      }
      return 'Equal'
  }
  for(let i = 0;i<inputArray.length;i++)
  {
    if(typeof expectedOutputArray[i]=='object')
    {
        // console.log(i,'obj')
        // console.log(i,...inputArray[i])
      if(checkEqual(callback(...getcopy(inputArray[i])),expectedOutputArray[i])==='Equal')
      {
        console.log(`%c Test ${i+1} Passed`,'color:green; font-weight:700;font-size:25px')
      }
      else
      {
        console.log(`%c Test ${i+1} Failed`,'color:red; font-weight:700;font-size:25px')
      }
    }
    else{
        if((typeof callback(...getcopy(inputArray[i]))=='number')&&(isNaN(callback(...getcopy(inputArray[i])))))
        {
            if(isNaN(expectedOutputArray[i]))
            {
                console.log(`%c Test ${i+1} Passed`,'color:green; font-weight:700;font-size:25px')
            }
            else
            {
                console.log(`%c Test ${i+1} Failed`,'color:red; font-weight:700;font-size:25px')
            }
        } 
        else if((callback(...getcopy(inputArray[i])))===expectedOutputArray[i])
        {
            console.log(`%c Test ${i+1} Passed`,'color:green; font-weight:700;font-size:25px')
        }
        else
        {
            console.log(`%c Test ${i+1} Failed`,'color:red; font-weight:700;font-size:25px')
        }
    }   
  }
}

// console.log(pronounceNumber())
let input1 = [723]
let ouput1 = 'seven hundred and twenty three'
let input2 = [{},{},2]
let ouput2 = 'Invalid argument'
let input3 = [1]
let ouput3 = 'one'
let input4 = [2359]
let ouput4 = 'two thousand three hundred and fifty nine'
let input5 = [99999]
let ouput5 = 'ninety nine thousand nine hundred and ninety nine'
let input6 = [60709]
let ouput6 = 'sixty thousand seven hundred and nine'
let input7 = [50585]
let ouput7 = 'fifty thousand five hundred and eighty five'
let input8 = [[1,2,3],[4,5,6],'3']
let ouput8 = 'Invalid argument'
let input9 = ['Hello']
let ouput9 = 'Invalid argument'
let input10 = [1001200]
let ouput10 = 'ten lakh one thousand two hundred'
let input11 = [["username@mailid.com","user","mailid",'com']]
let ouput11 = 'Invalid argument'
let input12 = [200]
let ouput12 = 'two hundred'
let input13 = []
let ouput13 = 'Invalid argument'
let input14 = [10100000]
let ouput14 = 'one crore one lakh'
let input15 = [[[],[]]]
let ouput15 = 'Invalid argument'

testProgram(pronounceNumber,[input1,input2,input3,input4,input5,input6,input7,input8,input9,input10,
                    input11,input12,input13,input14,input15],
                    [ouput1,ouput2,ouput3,ouput4,ouput5,ouput6,ouput7,ouput8,ouput9,ouput10,
                    ouput11,ouput12,ouput13,ouput14,ouput15])