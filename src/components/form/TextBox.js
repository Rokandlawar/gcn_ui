import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { zipCode, minLength, maxLength, emailAddress, isNumber, ipAddress, urlData } from './validations';

class TextBox extends Component {

    state = {
        value: '',
        error: this.props.error || false,
        message: this.props.message || '',
        isFlag: false
    }

    validValue = (val) => {
        if (val !== undefined && val !== null)
            return val
        return ''
    }

    componentDidMount() {
        this.setState({ value: this.validValue(this.props.value), error: this.props.error || false, message: this.props.message || '' });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ value: this.validValue(nextProps.value), error: nextProps.error || false, message: nextProps.message || '' })
    }

    handleChange = event => {
        this.setState({ value: event.target.value }, () => {
            if (this.props.changeEvt)
                this.props.changeEvt(this.state.value);
        })
    }

    getValue = () => {
        try {
            if (this.props.required) {
                if (this.state.value === undefined || this.state.value === null || this.state.value === '')
                    throw this.props.message || this.props.label + ' value is required.'
            }
            if (this.props.pwd)
                if (!(/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/.test(this.state.value)))
                    throw new Error("Password is not valid")
            if (this.props.zip) {
                let message = zipCode(this.state.value)
                if (message)
                    throw message
            }
            if (this.props.minlength) {
                let message = minLength(this.state.value, this.props.minlength)
                if (message)
                    throw message
            }
            if (this.props.maxlength) {
                let message = maxLength(this.state.value, this.props.maxlength)
                if (message)
                    throw message
            }
            if (this.props.email) {
                let message = emailAddress(this.state.value)
                if (message)
                    throw message
            }
            if (this.props.number) {
                let message = isNumber(this.state.value)
                if (message)
                    throw message
            }
            if (this.props.url) {
                let message = urlData(this.state.value)
                if (message)
                    throw message
            }
            if (this.props.ipNumber) {
                let message = ipAddress(this.state.value)
                if (message)
                    throw message
            }
            if (this.props.number)
                return parseFloat(this.state.value)
            return this.state.value
        }
        catch (ex) {
            this.setState({ error: true, message: typeof ex === 'string' ? ex : ex.message })
        }
    }

    setError = (message) => {
        this.setState({ error: true, message: message })
    }

    resetForm = () => {
        this.setState({ error: false, message: '' })
    }

    numberProps = this.props.number ? { min: "0", step: "1" } : {}

    render() {
        return (
            <div className={this.props.className || ''}>
                {!this.props.password && (
                    <TextField inputProps={this.numberProps} autoFocus={this.props.autoFocus || false} disabled={this.props.disabled || false} onKeyPress={this.props.onKeyPress} onChange={this.handleChange} value={this.state.value} label={this.props.label} margin="dense" required={this.props.required || false} error={this.state.error} helperText={this.state.error && this.state.message} type={this.props.number ? 'number' : 'text'} fullWidth />)}
                {this.props.password && (
                    <TextField autoFocus={this.props.autoFocus || false} disabled={this.props.disabled || false} type='password' onKeyPress={this.props.onKeyPress} onChange={this.handleChange} value={this.state.value} label={this.props.label} margin="dense" required={this.props.required || false} error={this.state.error} helperText={this.state.error && this.state.message} fullWidth />)}
            </div>
        )
    }
}

export default TextBox;