function birthDates(birthDates)
{
    for(let dates of birthDates)
    {
        // let cflg = 1
        // while(cflg)
        // {

        // }
        console.log('date',dates.getDate())
        console.log('day',dates.getDay())
    }
}

console.log(birthDates([new Date(2025, 0, 4), new Date(2025, 2, 8), new Date(2025, 5, 23)]))
console.log(birthDates([new Date(2025, 0, 4), new Date(2025, 2, 8), new Date(2025, 5, 23)]))