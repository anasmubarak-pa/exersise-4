function birthDates(birthDates)
{
    if(!typeAsserter(birthDates,'Array'))
    {
        return 'Invalid argument'
    }
    let birthday={}
    let returnlist = []
    for(let dates of birthDates)
    {
        if(!(dates instanceof Date))
        {
            return 'Invalid argument'
        }
        let datecopy = structuredClone(dates)
        datecopy.setMonth(0)
        datecopy.setDate(1)
        // console.log(datecopy.getTime(),dates.getTime())
        // console.log(datecopy,' and ',dates,' diffrence')
        // console.log('time',(dates.getTime()-datecopy.getTime())/(3600*1000*24*7))
        // console.log(dates,(((dates.getTime()-datecopy.getTime())/(3600*1000*24)+datecopy.getDay())/7)+1-((((dates.getTime()-datecopy.getTime())/(3600*1000*24)+datecopy.getDay())/7)%1))
        let week = (((dates.getTime()-datecopy.getTime())/(3600*1000*24)+datecopy.getDay())/7)+1-((((dates.getTime()-datecopy.getTime())/(3600*1000*24)+datecopy.getDay())/7)%1)
        // console.log(week)
        birthday[week]?birthday[week]++:birthday[week]=1
    }
    // console.log(birthday)
    for(let birthweek in birthday)
    {
        returnlist.push({'week number':birthweek,'birth days':birthday[birthweek]})
    }
    return returnlist
}

// console.log(birthDates([new Date(2025, 0, 4), new Date(2025, 2, 8), new Date(2025, 5, 23)]))
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
let input1 = [[new Date(2025, 0, 4), new Date(2025, 2, 8), new Date(2025, 5, 23)]]
let ouput1 = [{'week number':1,'birth days':1},
                {'week number':10,'birth days':1},
                {'week number':26,'birth days':1}]
let input2 = [[new Date(2025, 5, 4), new Date(2025, 8, 8), new Date(2025, 8, 11)]]
let ouput2 =  [{'week number':23,'birth days':1},
                {'week number':37,'birth days':2}]
let input3 = [[1, [2, [3, [4]], 5]]]
let ouput3 = 'Invalid argument'
let input4 = [[new Date(2025, 3, 4), new Date(2025, 3, 1), new Date(2025, 3, 2),new Date(2025, 3, 3)]]
let ouput4 = [{'week number':14,'birth days':4}]
let input5 = [[new Date(2025, 3, 4)]]
let ouput5 = [{'week number':14,'birth days':1}]
let input6 = [[new Date(2025, 0, 1),new Date(2025, 0, 2)]]
let ouput6 = [{'week number':1,'birth days':2}]
let input7 = [[new Date(2025, 0, 1),new Date(2025, 0, 2),new Date(2025, 0, 3),new Date(2025, 0, 4)]]
let ouput7 = [{'week number':1,'birth days':4}]
let input8 = [[new Date(2025, 0, 1),new Date(2025, 0, 2),new Date(2025, 0, 3),new Date(2025, 0, 4),new Date(2025, 0, 5)]]
let ouput8 = [{'week number':1,'birth days':4},
                {'week number':2,'birth days':1}]
let input9 = ['2']
let ouput9 = 'Invalid argument'
let input10 = [{obj:{1:2}}]
let ouput10 = 'Invalid argument'
let input11 = [0]
let ouput11 = 'Invalid argument'
let input12 = [[]]
let ouput12 = []
let input13 = []
let ouput13 = 'Invalid argument'
let input14 = [8]
let ouput14 = 'Invalid argument'
let input15 = [[[],[]]]
let ouput15 = 'Invalid argument'

testProgram(birthDates,[input1,input2,input3,input4,input5,input6,input7,input8,input9,input10,
                    input11,input12,input13,input14,input15],
                    [ouput1,ouput2,ouput3,ouput4,ouput5,ouput6,ouput7,ouput8,ouput9,ouput10,
                    ouput11,ouput12,ouput13,ouput14,ouput15])