function birthDates(birthDates)
{
    for(let dates of birthDates)
    {
        let cflg = 1
        let prmonth = dates.getMonth()
        while(cflg)
        {
            if(dates.getMonth()!=prmonth)
            {
                prmonth = dates.getMonth()
            }
        }
        console.log('date',dates.getDate())
        console.log('day',dates.getDay())
    }
}

console.log(birthDates([new Date(2025, 0, 4), new Date(2025, 2, 8), new Date(2025, 5, 23)]))
console.log(birthDates([new Date(2025, 0, 4), new Date(2025, 2, 8), new Date(2025, 5, 23)]))