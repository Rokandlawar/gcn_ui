import React, { forwardRef, useImperativeHandle, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import moment from 'moment'

function MaterialUIPickers({ label = 'NA', value, required = false }, ref) {
    const [selectedDate, setSelectedDate] = React.useState(moment(new Date()).format('YYYY-MM-DDThh:mm'));

    useEffect(() => {
        if (Date.parse(value))
            setSelectedDate(value)
    }, [value])

    const handleDateChange = (evt) => setSelectedDate(evt.target.value)

    useImperativeHandle(ref, () => ({
        getValue: () => {
            return selectedDate
        },
        resetForm: () => {

        },
        isNew: () => {
            return true;
        }
    }))

    return (
        <TextField
            label={label}
            type="datetime-local"
            value={selectedDate}
            onChange={handleDateChange}
            required={required}
            InputLabelProps={{
                shrink: true,
            }}
            fullWidth
        />
    );
}

export default forwardRef(MaterialUIPickers);