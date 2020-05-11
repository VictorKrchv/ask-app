let mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

export default function getData(date) {
    let now = new Date()
    if (now - date < 86400000 * 2) {
        let when = "Today"
        if (now.getDay() !== date.getDay()){
            when = "Yesterday"
        }
        let hours = date.getHours()
        if (hours < 10) hours = "0" + hours
        let minutes = date.getMinutes()
        if (minutes < 10) minutes = "0" + minutes
        return `${when} at ` + hours + ':' + minutes

    } else if (now.getFullYear !== date.getFullYear()) {
        return mS[date.getMonth() ] + ' ' + date.getDate() + ' ' + date.getFullYear()
    } else {
        return mS[date.getMonth() ] + ' ' + date.getDate()
    }
}