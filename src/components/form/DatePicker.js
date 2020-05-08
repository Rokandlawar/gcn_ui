import 'date-fns';
import React, { forwardRef, useImperativeHandle } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

function MaterialUIPickers({ label = 'NA', value = new Date(), required = false, className }, ref) {

    const [selectedDate, setSelectedDate] = React.useState(value);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    useImperativeHandle(ref, () => ({
        getValue: () => {
            return selectedDate.toISOString()
        },
        resetForm: () => {

        },
        isNew: () => {
            return true;
        }
    }))

    return (
        <div className={className || ''}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>

                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    label={label}
                    value={selectedDate}
                    onChange={handleDateChange}
                    required={required}
                    fullWidth
                />
            </MuiPickersUtilsProvider>
        </div>
    );
}

export default forwardRef(MaterialUIPickers);
// import React, { Component } from 'react';
// import moment from 'moment';
// import DateFnsUtils from '@date-io/date-fns';
// import {
//     MuiPickersUtilsProvider,
//     KeyboardDatePicker,
// } from '@material-ui/pickers'
// import FormControl from '@material-ui/core/FormControl';
// import FormHelperText from '@material-ui/core/FormHelperText';


// class DatePickers extends Component {

//     state = {
//         value: null
//     }

//     componentDidMount() {
//         this.setState({ value: this.props.value ? new Date(this.props.value) : new Date(), error: this.props.error || false, message: this.props.message || '' })
//     }

//     componentWillReceiveProps(nextProps) {
//         this.setState({ value: nextProps.value ? new Date(nextProps.value) : new Date(), error: nextProps.error || false, message: nextProps.message || '' })
//     }

//     getValue = () => {
//         if (this.props.required) {
//             if (this.state.value && this.state.value !== '')
//                 return moment(this.state.value).format('YYYY-MM-DD')
//             else
//                 this.setState({ error: true, message: this.props.message || `${this.props.label} is Required` });
//         }
//         else {
//             if (this.state.value)
//                 return moment(this.state.value).format('YYYY-MM-DD')
//             else
//                 return ''
//         }
//     }

//     handleChange = value => {
//         this.setState({ value }, () => {
//             if (this.props.changeEvt)
//                 this.props.changeEvt(this.state.value);
//         })
//     }

//     setError = (message) => {
//         this.setState({ error: true, message: message });
//     }

//     resetForm = () => {
//         this.setState({ error: false, message: '' })
//     }

//     render() {
//         console.log(this.state.value)
//         return (
//             <FormControl required={this.props.required || false} className={this.props.className || ''} error={this.state.error || false} disabled={this.props.disabled || false} fullWidth margin='dense'>
//                 <MuiPickersUtilsProvider utils={DateFnsUtils}>
//                     <KeyboardDatePicker
//                         disableToolbar
//                         variant="inline"
//                         format="MM/dd/YYYY"
//                         margin="normal"
//                         label={this.props.label}
//                         value={this.state.value || new Date()}
//                         onChange={this.handleChange}
//                     />
//                 </MuiPickersUtilsProvider>
//                 {this.props.disabled && <p>{this.state.value}</p>}
//                 <FormHelperText>{this.state.error && this.state.message}</FormHelperText>
//             </FormControl>
//         );
//     }
// }

// export default DatePickers;

// /*<TextField
// type="date"
// onChange={this.handleChangeMinDate}
// defaultValue={str}
// margin='dense'
// fullWidth
// label={this.props.label || 'Not Provided'}
// disabled={this.props.disabled || false}
// />*/