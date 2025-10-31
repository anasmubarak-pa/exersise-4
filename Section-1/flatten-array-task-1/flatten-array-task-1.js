function flattenArray(ip_array,return_array=[])
{
    if(!typeAsserter(ip_array,'Array',return_array,'Array'))
    {
        return 'Invalid arguments'
    }
    for(let i=0;i<ip_array.length;i++)
    {
        // console.log(ip_array[i],typeof ip_array[i])
        if(Array.isArray(ip_array[i]))
        {
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

// console.log(flattenArray([1, [2, [3, [4]], 5]]))

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

let input1 = [['apple',['ball','bat']]]
let ouput1 = ['apple','ball','bat']
let input2 = [{1:1,2:2}]
let ouput2 = 'Invalid arguments'
let input3 = [[1, [2, [3, [4]], 5]]]
let ouput3 = [1,2,3,4,5]
let input4 = [['Aaaaa',['bb',['cc',['dd',['ee']]]]]]
let ouput4 = ['Aaaaa','bb','cc','dd','ee']
let input5 = [['99999','777777']]
let ouput5 = ['99999','777777']
let input6 = [[[[[[[[[[['Hello']]]]]]]]],[[[[[[[[['World']]]]]]]]]]]
let ouput6 = ['Hello','World']
let input7 = ['50585']
let ouput7 = 'Invalid arguments'
let input8 = [[[1,2,3],[4,5,6],'3']]
let ouput8 = [1,2,3,4,5,6,'3']
let input9 = ['Good Morning']
let ouput9 = 'Invalid arguments'
let input10 = [['1001200']]
let ouput10 = ['1001200']
let input11 = [["username@mailid.com","user","mailid",'com']]
let ouput11 = ["username@mailid.com","user","mailid",'com']
let input12 = [[1,[2],{3:4},[5,{6:7}]]]
let ouput12 = [1,2,{3:4},5,{6:7}]
let input13 = []
let ouput13 = 'Invalid arguments'
let input14 = ['10100000']
let ouput14 = 'Invalid arguments'
let input15 = [[[],[]]]
let ouput15 = []

testProgram(flattenArray,[input1,input2,input3,input4,input5,input6,input7,input8,input9,input10,
                    input11,input12,input13,input14,input15],
                    [ouput1,ouput2,ouput3,ouput4,ouput5,ouput6,ouput7,ouput8,ouput9,ouput10,
                    ouput11,ouput12,ouput13,ouput14,ouput15])