const createEmployeeRecord = row => {
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = employeeInfo => {
    return employeeInfo.map(info => {
        return createEmployeeRecord(info)
    })
}

const createTimeInEvent = function(punchCardDate){
    let [date, time] = punchCardDate.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(time, 10),
        date,
    })

    return this
}

const createTimeOutEvent = function(punchCardDate){
    let [date, time] = punchCardDate.split(" ")

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(time, 10),
        date,
    })

    return this
}

const hoursWorkedOnDate = function(searchDate){
    let clockIn = this.timeInEvents.find(event => {
        return event.date === searchDate
    })

    let clockOut = this.timeOutEvents.find(event => {
        return event.date === searchDate
    })

    return (clockOut.hour - clockIn.hour) / 100
}

const wagesEarnedOnDate = function(searchDate){
    let allWages = hoursWorkedOnDate.call(this, searchDate) * this.payPerHour
    return parseFloat(allWages.toString())
}

const allWagesFor = function(){
    let wagesDates = this.timeInEvents.map(event => {
        return event.date
    })

    let payable = wagesDates.reduce((wage, date) =>{
        return wage + wagesEarnedOnDate.call(this, date)
    }, 0)

    return payable
}

const findEmployeeByFirstName = (srcArray, name) => {
  return srcArray.find(record =>{
    return record.firstName === name
  })
}

const calculatePayroll = employeeRecordsArray =>{
    return employeeRecordsArray.reduce((wage, employeeRecord) => {
        return wage + allWagesFor.call(employeeRecord)
    }, 0)
}