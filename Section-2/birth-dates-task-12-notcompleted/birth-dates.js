function birthDates(birthDates)
{
    let birthday={}
    let returnlist = []
    for(let dates of birthDates)
    {
        let datecopy = structuredClone(dates)
        datecopy.setMonth(0)
        datecopy.setDate(1)
        // console.log(datecopy,' and ',dates,' diffrence')
        // console.log('time',(dates.getTime()-datecopy.getTime())/(3600*1000*24*7))
        let week = (dates.getTime()-datecopy.getTime())/(3600*1000*24*7)-((dates.getTime()-datecopy.getTime())/(3600*1000*24*7)%1)+1
        // console.log(week)
        if(birthday[week])
        {
            birthday[week]++
        }
        else
        {
            birthday[week]=1
        }
    }
    // console.log(birthday)
    for(let birthweek in birthday)
    {
        returnlist.push({'week number':birthweek,'birth days':birthday[birthweek]})
    }
    return returnlist
}

console.log(birthDates([new Date(2025, 0, 4), new Date(2025, 2, 8), new Date(2025, 5, 23)]))