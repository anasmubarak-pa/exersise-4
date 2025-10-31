function anagramChecker(word1,word2)
{
    if(!typeAsserter(word1,'string',word2,'string'))
    {
        return 'Invalid arguments'
    }

    if(word1.length!=word2.length)
    {
        return false
    }

    let wordmap = new Map()
    for(let letter of word1)
    {
        wordmap.set(letter,((wordmap.get(letter)||0)+1))
    }
    for(let letter of word2)
    {
        if(wordmap.get(letter))
        {
            wordmap.set(letter,(wordmap.get(letter)||0)-1)
            if(!wordmap.get(letter))
            {
                wordmap.delete(letter)
            }
        }
        else
        {
            return false
        }
    }
    return true
}

// console.log(anagramChecker("listen", "silent"))
// console.log(anagramChecker("restful", "fluster"))
// console.log(anagramChecker("hello", "World!"))

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
  function checkEqual(obj1,obj2)
  {
      let i = 0
      let keys = Object.keys(obj2)
      if(obj1.length!=obj2.length)
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
            if((typeof key=='number'||typeof obj1[key]=='number')&&(isNaN(key)||isNaN(obj1[key])))
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
      if(checkEqual(callback(...inputArray[i]),expectedOutputArray[i])==='Equal')
      {
        console.log(`%c Test ${i+1} Passed`,'color:green; font-weight:700;font-size:25px')
      }
      else
      {
          console.log(`%c Test ${i+1} Failed`,'color:red; font-weight:700;font-size:25px')
      }
    }
    else{
        if((typeof callback(...inputArray[i])=='number')&&(isNaN(callback(...inputArray[i]))))
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
      else if(callback(...inputArray[i])===expectedOutputArray[i])
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

let input1 = ['care','race']
let ouput1 = true
let input2 = ['Hello','hi']
let ouput2 = false
let input3 = [21,21]
let ouput3 = 'Invalid arguments'
let input4 = [[1,2,'hello',4,8,10]]
let ouput4 = 'Invalid arguments'
let input5 = [23]
let ouput5 = 'Invalid arguments'
let input6 = ['hello','hello']
let ouput6 = true
let input7 = ['hi','']
let ouput7 = false
let input8 = [55]
let ouput8 = 'Invalid arguments'
let input9 = [{a:1,b:2}]
let ouput9 = 'Invalid arguments'
let input10 = ['aaaa','aaaa']
let ouput10 = true
let input11 = ['abcd','ABCD']
let ouput11 = false
let input12 = ['a','b']
let ouput12 = false
let input13 = [[23231,378632,32321424,33434,3323234,43213123,3812631221]]
let ouput13 = 'Invalid arguments'
let input14 = [['hello','world']]
let ouput14 = 'Invalid arguments'
let input15 = [[[],[]]]
let ouput15 = 'Invalid arguments'

testProgram(anagramChecker,[input1,input2,input3,input4,input5,input6,input7,input8,input9,input10,
                        input11,input12,input13,input14,input15],
                        [ouput1,ouput2,ouput3,ouput4,ouput5,ouput6,ouput7,ouput8,ouput9,ouput10,
                            ouput11,ouput12,ouput13,ouput14,ouput15])