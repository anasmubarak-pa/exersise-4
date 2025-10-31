function invertKey(obj)
{
    if(!typeAsserter(obj,'object'))
    {
        return 'Invalid argument'
    }
    let return_obj = {}
    let keys = Object.keys(obj)
    let values = Object.values(obj)
    for(let i=0;i<keys.length;i++)
    {
        if(typeof values[i]=='object')
        {
            return_obj[JSON.stringify((values[i]))] = keys[i]
        }
        else
        {
            return_obj[values[i]] = keys[i]
        }
    }

    return return_obj
}

// console.log(invertKey({ a: 1, b: 2 }))

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


let input1 = [{ a: 1, b: 2 }]
let ouput1 = {1: 'a',2: 'b'}
let input2 = [{1:1,2:2}]
let ouput2 = {1:1,2:2}
let input3 = [[1, [2, [3, [4]], 5]]]
let ouput3 = 'Invalid argument'
let input4 = [{1:'One',2:'Two',3:'Three',4:'Four'}]
let ouput4 = {'One':1,'Two':2,'Three':3,'Four':4}
let input5 = [{key:'value',key2:'value2'}]
let ouput5 = {'value':'key','value2':'key2'}
let input6 = [{k1:['1','2']}]
let ouput6 = {'["1","2"]':'k1'}
let input7 = ['50585']
let ouput7 = 'Invalid argument'
let input8 = [{'hello':'world'}]
let ouput8 = {'world':'hello'}
let input9 = ['Good Morning']
let ouput9 = 'Invalid argument'
let input10 = [{obj:{1:2}}]
console.log(invertKey(...input10))
let ouput10 = {'{"1":2}':"obj"}
let input11 = [["username@mailid.com","user","mailid",'com']]
let ouput11 = 'Invalid argument'
let input12 = [[1,[2],{3:4},[5,{6:7}]]]
let ouput12 = 'Invalid argument'
let input13 = []
let ouput13 = 'Invalid argument'
let input14 = ['10100000']
let ouput14 = 'Invalid argument'
let input15 = [[[],[]]]
let ouput15 = 'Invalid argument'

testProgram(invertKey,[input1,input2,input3,input4,input5,input6,input7,input8,input9,input10,
                    input11,input12,input13,input14,input15],
                    [ouput1,ouput2,ouput3,ouput4,ouput5,ouput6,ouput7,ouput8,ouput9,ouput10,
                    ouput11,ouput12,ouput13,ouput14,ouput15])