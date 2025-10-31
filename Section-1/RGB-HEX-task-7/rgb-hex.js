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
    if(!(typeAsserter(value_array,'Array')&&value_array.length==3))
    {
        return 'Invalid argument'
    }
    let return_hex = '#'
    for(let element of value_array)
    {
        if(!(typeof element=='number'&&element<=255&&element>=0))
        {
            return 'Invalid argument'
        }
        if(convertHex(element).length==1)
        {
            return_hex+='0'+convertHex(element)
        }
        else{
            return_hex+=convertHex(element)
        }
    };
    return return_hex
}

// console.log(rgbHex([255, 165, 0]))

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


let input1 = [[255,255,255]]
let ouput1 = '#FFFFFF'
let input2 = [[0,0,0]]
let ouput2 = '#000000'
let input3 = [[1, [2, [3, [4]], 5]]]
let ouput3 = 'Invalid argument'
let input4 = [[256,256,-1]]
let ouput4 = 'Invalid argument'
let input5 = [[15,15,15]]
let ouput5 = '#0F0F0F'
let input6 = [[16,16,16]]
let ouput6 = '#101010'
let input7 = [[120,120]]
let ouput7 = 'Invalid argument'
let input8 = [[100,100,100]]
let ouput8 = '#646464'
let input9 = [[10,11,12]]
let ouput9 = '#0A0B0C'
let input10 = [{obj:{1:2}}]
let ouput10 = 'Invalid argument'
let input11 = [["username@mailid.com","user","mailid",'com']]
let ouput11 = 'Invalid argument'
let input12 = [[]]
let ouput12 = 'Invalid argument'
let input13 = []
let ouput13 = 'Invalid argument'
let input14 = [[13,14,15]]
let ouput14 = '#0D0E0F'
let input15 = [[[],[]]]
let ouput15 = 'Invalid argument'

testProgram(rgbHex,[input1,input2,input3,input4,input5,input6,input7,input8,input9,input10,
                    input11,input12,input13,input14,input15],
                    [ouput1,ouput2,ouput3,ouput4,ouput5,ouput6,ouput7,ouput8,ouput9,ouput10,
                    ouput11,ouput12,ouput13,ouput14,ouput15])