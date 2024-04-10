
function task21(arr) {
    let first = [];
    let second = [];
    let third = [];
    for (let currentMonth = 1; currentMonth <= 12; currentMonth++) {
        let current = arr.filter((x)=>x['month']==currentMonth);
        if(current.length>first.length) 
        {
            third = second;
            second = first;
            first = current;
        }
        else if(current.length>second.length) 
        {
            third = second;
            second = current;
        }
            else if(current.length>third.length) {third = current;}
    }
    arr = [
        {year: first[0]['year'],month: first[0]['month'], opsCount:first.length}, 
        {year: second[0]['year'],month: second[0]['month'], opsCount:second.length}, 
        {year: third[0]['year'],month: third[0]['month'], opsCount:third.length}
    ]
    return arr;
}

function task22(year, month, arr) {
    let monthToCount = arr.filter((x)=>x['month']==month);
    let allWithdrawals = monthToCount.filter((x)=>x['type']=='withdrawal');
    let allReplenishment = monthToCount.filter((x)=>x['type']=='replenishment');
    let allPayments = monthToCount.filter((x)=>x['type']=='payment');

    let monthWithdrawalValue = allWithdrawals.reduce(
        (accumulator, currentValue) => accumulator + currentValue['amount'],
        0,
    )
    let monthReplenishmentValue = allReplenishment.reduce(
        (accumulator, currentValue) => accumulator + currentValue['amount'],
        0,
    )
    let monthPaymentsValue = allPayments.reduce(
        (accumulator, currentValue) => accumulator + currentValue['amount'],
        0,
    )
    withdrawalRateValue = ((monthPaymentsValue+monthWithdrawalValue)/monthReplenishmentValue).toFixed(2);
    return {
        date: `${year}-${month}-${(new Date(year, month, 0)).getDate()}`,
        monthBalance: monthReplenishmentValue - monthWithdrawalValue - monthPaymentsValue,
        monthWithdrawal: monthWithdrawalValue,
        withdrawalRate: withdrawalRateValue,
        rank: (withdrawalRateValue < 0.15 ? 'Золотой' : withdrawalRateValue < 0.3 ?  'Серебряный' : 'Бронзовый') 
    };
}

function task23(arr) {
    let allMonthsTotals = [];

    let currentMonthTotal = task22(2019,1,arr)['monthBalance'];
    let monthStats = task22(2019,1,arr);
    monthStats['totalBalance'] = currentMonthTotal;
    allMonthsTotals.push(monthStats);

    for (let currentMonth = 2; currentMonth <= 12; currentMonth++)
    {
        currentMonthTotal += task22(2019,currentMonth,arr)['monthBalance'];
        monthStats = task22(2019,currentMonth,arr);
        monthStats['totalBalance'] = currentMonthTotal;
        allMonthsTotals.push(monthStats);
    }
    
    arr = allMonthsTotals;
    return arr;
}