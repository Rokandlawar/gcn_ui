export const minLength = (text, length) => {
    if (text.length < length)
        return `${text} Minimum Length is ${length} characters`
    return null
}

export const maxLength = (text, length) => {
    if (text.length > length)
        return `${text} Maximum Length is ${length} characters`
    return null
}

export const zipCode = (value) => {
    if (value !== "") {
        let exp = /(^\d{5}$)|(^\d{5}-\d{4}$)/
        if (!exp.test(value))
            return `${value} is not a valid Zip code`
        return null
    }
    return null;
}


export const emailAddress = (text) => {

    let exp = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!text) {
        return `Email is Required`
    }
    else if (!exp.test(text)) {
        return `Invalid Email`
    }
    return null
}

export const isNumber = (value) => {
    let exp = !isNaN(parseFloat(value))
    let range = value < 0
    if (!exp)
        return `${value} is not a Number`
    else if (range)
        return `${value} is out of range`
    return null;
}
export const ipAddress = (ipaddress) => {
    let exp = (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress))
    if (!exp)
        return `${ipaddress} is not a Valid IP Address`
    return null;
}
export const urlData = (urlValue) => {
    let exp = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|(www\\.)?){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
    if (!exp.test(urlValue))
        return `${urlValue} is not a valid URL`
    return null;
}