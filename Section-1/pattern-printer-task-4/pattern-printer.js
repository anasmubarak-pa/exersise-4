function wordpyramid(word)
{
    if(!(typeAsserter(word,'string|number')))
    {
        throw Error('Only accepts string and number as input')
    }
    let returnPattern =  ``
    if(typeof word!='string')
    {
        word = JSON.stringify(word)
    }
    for(let i=1;i<(word.length*2);i++)
    {
        returnPattern+=i<=word.length?word.slice(0,i)+"\n":word.slice(i-word.length,word.length)+"\n"
    }
    return returnPattern
}

// console.log(wordpyramid('CAT'))

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
            if(Array.isArray(typelist[i])&&(typelist[i+1]!=='Array'))
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
        console.log(`%c Passed`,'color:green; font-weight:700;font-size:25px')
      }
      else
      {
          console.log(`%c Failed`,'color:red; font-weight:700;font-size:25px')
      }
    }
    else{
        if((typeof callback(...inputArray[i])=='number')&&(isNaN(callback(...inputArray[i]))))
        {
            if(isNaN(expectedOutputArray[i]))
            {
                console.log(`%c Passed`,'color:green; font-weight:700;font-size:25px')
            }
            else
            {
                console.log(`%c Failed`,'color:red; font-weight:700;font-size:25px')
            }
        } 
      else if(callback(...inputArray[i])===expectedOutputArray[i])
      {
        console.log(`%c Passed`,'color:green; font-weight:700;font-size:25px')
      }
      else
      {
            console.log(`%c Failed`,'color:red; font-weight:700;font-size:25px')
      }
    }   
  }
}

let input1 = ['CAT']
let output1 = 'C\nCA\nCAT\nAT\nT\n'

let input2 = ['Hello']
let output2 = 'H\nHe\nHel\nHell\nHello\nello\nllo\nlo\no\n'

let input3 = ['World!']
let output3 = 'W\nWo\nWor\nWorl\nWorld\nWorld!\norld!\nrld!\nld!\nd!\n!\n'

let input4 = [1234567]
let output4 = '1\n12\n123\n1234\n12345\n123456\n1234567\n234567\n34567\n4567\n567\n67\n7\n'

let input5 = ['AT']
let output5 = 'A\nAT\nT\n'

let input6 = ['MAP']
let output6 = 'M\nMA\nMAP\nAP\nP\n'

let input7 = ['UP']
let output7 = 'U\nUP\nP\n'

let input8 = ['fly']
let output8 = 'f\nfl\nfly\nly\ny\n'

let input9 = ['bell']
let output9 = 'b\nbe\nbel\nbell\nell\nll\nl\n'

let input10 = ['test']
let output10 = 't\nte\ntes\ntest\nest\nst\nt\n'

let input11 = ['Do']
let output11 = 'D\nDo\no\n'

let input12 = ['Tree']
let output12 = 'T\nTr\nTre\nTree\nree\nee\ne\n'

let input13 = ['top']
let output13 = 't\nto\ntop\nop\np\n'

let input14 = ['A']
let output14 = 'A\n'

let input15 = ['AB']
let output15 = 'A\nAB\nB\n'

testProgram(wordpyramid,[input1,input2,input3,input4,input5,input6,input7,input8,input9,input10,
                            input11,input12,input13,input14,input15],
                        [output1,output2,output3,output4,output5,output6,output7,output8,output9,output10,
                            output11,output12,output13,output14,output15])