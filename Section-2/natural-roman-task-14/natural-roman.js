function naturalRoman(value)
{
    if(!typeAsserter(value,'number')||value<1)
    {
        return 'Invalid argument'
    }
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

// console.log(naturalRoman(5))
// console.log(naturalRoman(252))
// console.log(naturalRoman(60))
// console.log(naturalRoman(40))
// console.log(naturalRoman(2000))
// console.log(naturalRoman(1999))
// console.log(naturalRoman(589))

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
        return structuredClone(element)
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

let input1 = [5]
let ouput1 = 'V'
let input2 = [10]
let ouput2 = ['X']
let input3 = [15]
let ouput3 = 'XV'
let input4 = [59]
let ouput4 = 'LIX'
let input5 = [999]
let ouput5 = 'CMXCIX'
let input6 = [1000]
let ouput6 = 'M'
let input7 = [100]
let ouput7 = 'C'
let input8 = [200]
let ouput8 = 'CC'
let input9 = ['2']
let ouput9 = 'Invalid argument'
let input10 = [{obj:{1:2}}]
let ouput10 = 'Invalid argument'
let input11 = [0]
let ouput11 = 'Invalid argument'
let input12 = [[]]
let ouput12 = 'Invalid argument'
let input13 = []
let ouput13 = 'Invalid argument'
let input14 = [8]
let ouput14 = 'VIII'
let input15 = [[[],[]]]
let ouput15 = 'Invalid argument'

testProgram(naturalRoman,[input1,input2,input3,input4,input5,input6,input7,input8,input9,input10,
                    input11,input12,input13,input14,input15],
                    [ouput1,ouput2,ouput3,ouput4,ouput5,ouput6,ouput7,ouput8,ouput9,ouput10,
                    ouput11,ouput12,ouput13,ouput14,ouput15])