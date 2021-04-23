module.exports.formatDate = (date) => {
    let dateTF = new Date(date) //dateToFormat
    return(`${dateTF.getDate()}-${dateTF.getMonth() + 1}-${dateTF.getFullYear()} ${dateTF.getHours()}:${(dateTF.getMinutes()<10 ? '0':'')+dateTF.getMinutes()}`)
}