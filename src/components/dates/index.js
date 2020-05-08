import moment from 'moment';

export const simpleDate = (date) => {
    try {
        if (date)
            return moment(date).format('MM/DD/YYYY')
        return 'NA'
    }
    catch (ex) {
        console.log(ex);
        return 'Not Valid Date'
    }
}

export const simpleDateTime = (date) => {
    try {
        if (date)
            return new Date(date).toLocaleDateString() + ' ' + new Date(date).toLocaleTimeString()
        return 'NA'
    }
    catch (ex) {
        console.log(ex);
        return 'Not Valid Date'
    }
}