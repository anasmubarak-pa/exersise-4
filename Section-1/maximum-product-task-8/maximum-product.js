function maximumProduct(numberlist)
{
    if(!typeAsserter(numberlist,'Array')||numberlist.length<3)
    {
        return 'Invalid argument'
    }
    let maxlist = []
    for(i = 0;i<3;i++)
    {
        maxlist.push(Math.max(...numberlist))
        for(let j=0; j<numberlist.length;j++)
        {
            if(typeof numberlist[j]!='number')
            {
                return 'Invalid argument'
            }
            if(numberlist[j]==maxlist[i])
            {
                numberlist.splice(j,1)
                break
            }
        }
    }
    // console.log(maxlist.reduce((a,b)=>a*b))
    return maxlist.reduce((a,b)=>a*b)
}

// console.log(maximumProduct([1, 2, 3, 4]))
// console.log(maximumProduct([-4, -3, -2, -1, 0]))
// console.log(maximumProduct([-1, -2, -3, -4, -5]))

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

let input1 = [[1,2,3,4]]
let ouput1 = 24
let input2 = [[10]]
let ouput2 = 'Invalid argument'
let input3 = [[21,4]]
let ouput3 = 'Invalid argument'
let input4 = [[2,5,7]]
let ouput4 = 70
let input5 = [[4237,1,1]]
let ouput5 = 4237
let input6 = [['']]
let ouput6 = 'Invalid argument'
let input7 = [['hi']]
let ouput7 = 'Invalid argument'
let input8 = [[1,2,3,4,5,6,7,8,9,10]]
let ouput8 = 720
let input9 = [{a:1,b:2}]
let ouput9 = 'Invalid argument'
let input10 = [[10,50,10]]
let ouput10 = 5000
let input11 = ["username@mailid.com"]
let ouput11 = 'Invalid argument'
let input12 = [[5,4,7,0,1,2]]
let ouput12 = 140
let input13 = [[]]
let ouput13 = 'Invalid argument'
let input14 = [[0,1,2]]
let ouput14 = 0
let input15 = [[[],[]]]
let ouput15 = 'Invalid argument'

testProgram(maximumProduct,[input1,input2,input3,input4,input5,input6,input7,input8,input9,input10,
                    input11,input12,input13,input14,input15],
                    [ouput1,ouput2,ouput3,ouput4,ouput5,ouput6,ouput7,ouput8,ouput9,ouput10,
                    ouput11,ouput12,ouput13,ouput14,ouput15])