function spiralMatrix(size)
{
    if(!typeAsserter(size,'number'))
    {
        return 'Invalid argument'
    }
    let returnlist = []
    for(i=0;i<size;i++)
    {
        returnlist.push(Array(size))
    }
    // console.log('return list',returnlist)
    let dc = 0
    let v = 1
    for(let i=1+dc;i<=size-dc;i++)
    {
        if(i==1+dc)
        {
            for(j=1+dc;j<=size-dc;j++)
            {
                returnlist[i-1][j-1] = v
                v++
            }
        } 
        // console.log(i-1,j-1)
        else if(i>1+dc&&i!=size-dc)
        {
            returnlist[i-1][j-2] = v
            v++ 
        } 
        else if(i==size-dc)
        {
            // console.log('v',v)
            for(j=size-dc;j>dc;j--)
            {
                // console.log(j-1)
                returnlist[i-1][j-1] = v
                v++
            }
            dc++
            for(i=size-dc;i>=1+dc;i--)
            {
                // console.log(i)
                returnlist[i-1][j] = v
                v++
            }
        }
        }
    return returnlist
}

// console.log(squareMatrix(1))
// console.log(squareMatrix(2))
// console.log(squareMatrix(3))
// console.log(squareMatrix(4))
// console.log(squareMatrix(5))
// console.log(squareMatrix(6))
// console.log(squareMatrix(7))
// console.log(squareMatrix(8))

// 1 2 3
// 8 9 4
// 7 6 5


//dc=0
// 1 2 3 6 9 8 7 4 5
//j=1 i=1
//j=last i++->last
//dc=1
//j=1 i-=1 until i==size-dc
//repeat until i-dc=0??

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

// console.log(squareMatrix(5))
// console.log(squareMatrix(6))
// console.log(squareMatrix(7))
// console.log(squareMatrix(8))
let input1 = [1]
let ouput1 = [[1]]
let input2 = [2]
let ouput2 = [[1,2],
              [4,3]]
let input3 = [[1, [2, [3, [4]], 5]]]
let ouput3 = 'Invalid argument'
let input4 = [3]
let ouput4 = [[1,2,3],
              [8,9,4],
              [7,6,5]]
let input5 = [4]
let ouput5 = [[1 ,2 ,3 ,4],
              [12,13,14,5],
              [11,16,15,6],
              [10, 9, 8,7]]
let input6 = [5]
let ouput6 = [[1 ,2 ,3 ,4 ,5],
              [16,17,18,19,6],
              [15,24,25,20,7],
              [14,23,22,21,8],
              [13,12,11,10,9]]
let input7 = [6]
let ouput7 = [[1 ,2 ,3 ,4 ,5 ,6 ],
              [20,21,22,23,24,7 ],
              [19,32,33,34,25,8 ],
              [18,31,36,35,26,9 ],
              [17,30,29,28,27,10 ],
              [16,15,14,13,12,11]]
let input8 = [7]
let ouput8 = [[1 ,2 ,3 ,4 ,5 ,6 ,7 ],
              [24,25,26,27,28,29,8 ],
              [23,40,41,42,43,30,9 ],
              [22,39,48,49,44,31,10],
              [21,38,47,46,45,32,11],
              [20,37,36,35,34,33,12],
              [19,18,17,16,15,14,13]]
let input9 = ['2']
let ouput9 = 'Invalid argument'
let input10 = [{obj:{1:2}}]
let ouput10 = 'Invalid argument'
let input11 = [["username@mailid.com","user","mailid",'com']]
let ouput11 = 'Invalid argument'
let input12 = [[]]
let ouput12 = 'Invalid argument'
let input13 = []
let ouput13 = 'Invalid argument'
let input14 = [8]
let ouput14 = [[1 ,2 ,3 ,4 ,5 ,6 ,7 ,8],
               [28,29,30,31,32,33,34,9],
               [27,48,49,50,51,52,35,10],
               [26,47,60,61,62,53,36,11],
               [25,46,59,64,63,54,37,12],
               [24,45,58,57,56,55,38,13],
               [23,44,43,42,41,40,39,14],
               [22,21,20,19,18,17,16,15]]
let input15 = [[[],[]]]
let ouput15 = 'Invalid argument'

testProgram(spiralMatrix,[input1,input2,input3,input4,input5,input6,input7,input8,input9,input10,
                    input11,input12,input13,input14,input15],
                    [ouput1,ouput2,ouput3,ouput4,ouput5,ouput6,ouput7,ouput8,ouput9,ouput10,
                    ouput11,ouput12,ouput13,ouput14,ouput15])