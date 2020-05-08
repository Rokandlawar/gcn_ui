import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';

class TimePicker extends Component {

    state = {
        value: null
    }


    handleChangeTime = (event) => {
        this.setState({
            value: event.target.value
        });
    };

    componentDidMount() {
        const time = moment().format("HH:mm");
        this.setState({ value: this.props.value || time, error: this.props.error || false, message: this.props.message || '' })
    }

    componentWillReceiveProps(nextProps) {
        const time = moment().format("HH:mm");
        this.setState({ value: nextProps.value || time, error: nextProps.error || false, message: nextProps.message || '' })
    }

    getValue = () => {
        if (this.props.required) {
            if (this.state.value !== '')
                return this.state.value;
            else
                this.setState({ error: true, message: this.props.message || `${this.props.label} is Required` });
        }
        else {
            return this.state.value
        }
    }

    setError = (message) => {
        this.setState({ error: true, message: message });
    }

    resetForm = () => {
        this.setState({ error: false, message: '' })
    }

    render() {
        let str = this.state.value || moment().format("HH:mm")
        return (
            <div className={this.props.className || ''}>
                <TextField
                    type="time"
                    onChange={this.handleChangeTime}
                    defaultValue={str}
                    margin='dense'
                    fullWidth
                    disabled={this.props.disabled || false}
                />
            </div>
        );
    }
}

export default TimePicker;
