import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';

import { minLength } from './validations';

class TextArea extends Component {

    state = {
        value: '',
        error: this.props.error || false,
        message: this.props.message || ''
    }

    componentDidMount() {
        this.setState({ value: this.props.value || '', error: this.props.error || false, message: this.props.message || '' })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ value: nextProps.value || '', error: nextProps.error || false, message: nextProps.message || '' })
    }

    handleChange = event => {
        this.setState({ value: event.target.value })
    }

    getValue = () => {
        try {
            if (this.props.required) {
                if (!this.state.value && this.state.value === '')
                    throw this.props.message || this.props.label + ' value is required.'
            }
            if (this.props.minlength) {
                let message = minLength(this.state.value, this.props.minValue)
                if (message)
                    throw message
            }
            return this.state.value
        }
        catch (ex) {
            this.setState({ error: true, message: ex })
        }
    }

    setError = (message) => {
        this.setState({ error: true, message: message });
    }

    resetForm = () => {
        this.setState({ error: false, message: '' })
    }

    render() {
        return (
            <div className={this.props.className || ''}>
                <TextField disabled={this.props.disabled || false} multiline rows="4" error={this.state.error} onChange={this.handleChange} value={this.state.value} label={this.props.label} margin="dense" required={this.props.required || false} helperText={this.state.error && this.state.message} fullWidth />
            </div>
        )
    }
}

export default TextArea;