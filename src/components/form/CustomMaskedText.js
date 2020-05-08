import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputAdornment from '@material-ui/core/InputAdornment';

class CustomMaskedText extends Component {

    state = {
        value: '',
        error: this.props.error || false,
        message: this.props.message || '',
        startValue: ''
    }

    componentDidMount() {
        this.props.mask === 'amount' && this.setState({ value: this.props.value || '00.00', startValue: this.props.startValue || '', error: this.props.error || false, message: this.props.message || '' })
    }

    componentWillReceiveProps(nextProps) {
        this.props.mask === 'amount' && this.setState({ value: nextProps.value || '00.00', startValue: this.props.startValue || '', error: nextProps.error || false, message: nextProps.message || '' })
    }

    handleChange = (event) => {
        this.setState({
            value: event.target.value,
        })
    }

    valid = () => {
        if (this.props.mask === 'amount') {
            if (this.state.value !== '') {
                let value = Number(this.state.value);
                if (isNaN(value))
                    return 'Not a valid amount'
                else
                    return null
            }
            if (this.props.required)
                return 'Value is Required.'
        }
        return null;
    }

    getValue = () => {
        let valid = this.valid()
        console.log(valid);
        if (!valid) {
            return this.formatText(this.state.value)
        }
        else {
            this.setState({ error: true, message: valid })
        }
    }


    setError = (message) => {
        this.setState({ error: true, message: message });
    }

    resetForm = () => {
        this.setState({ error: false, message: '' })
    }

    formatText = (text) => {
        if (text) {
            if (this.props.mask === 'amount')
                return text
            return text
        }
        return undefined
    }

    render() {
        return (
            <div className={this.props.className}>
                <FormControl margin='dense' error={this.state.error} required={this.props.required || false} disabled={this.props.disabled || false}>
                    <InputLabel>{this.props.label}</InputLabel>
                    {this.props.mask === 'amount' && (
                        <Input value={this.state.value} onChange={this.handleChange} startAdornment={<InputAdornment position="start">{this.props.startValue}</InputAdornment>} />
                    )}
                    <FormHelperText>{this.state.error && this.state.message}</FormHelperText>
                </FormControl>
            </div>
        )
    }
}

export default CustomMaskedText;
