import React, { Component } from 'react';
import Cleave from 'cleave.js/react';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
// eslint-disable-next-line
import CleavePhone from 'cleave.js/dist/addons/cleave-phone.us';

class PhoneText extends Component {

    state = {
        value: '',
        error: this.props.error || false,
        message: this.props.message || '',
        isFlag: false
    }

    componentDidMount() {
        this.setState({ value: this.props.value || '', error: this.props.error || false, message: this.props.message || '' });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ value: nextProps.value || '', error: nextProps.error || false, message: nextProps.message || '' })
    }

    handleChange = value => {
        this.setState({ value, error: false }, () => {
            if (this.props.changeEvt)
                this.props.changeEvt(this.state.value);
        })
    }

    getValue = () => {
        const { value } = this.state;
        // If Required Check for value
        if (this.props.required) {
            if (value.length !== 10 || value.length === 11) {
                this.setState({ error: true, message: 'Value is required.' });
                return;
            }
            else
                return value
        }
        // Check Format
        if (value.length !== 10 || value.length === 11) {
            if (value === '' || value === null) {
                return value
            }
            this.setState({ error: true, message: 'Not a valid phone number' })
            return;
        }
        return value
    }

    setError = (message) => {
        this.setState({ error: true, message: message })
    }

    resetForm = () => {
        this.setState({ error: false, message: '' })
    }

    render() {
        return (
            <div className={this.props.className || ''}>
                <FormControl margin='dense' disabled={this.props.disabled || false} error={this.state.error || false} required={this.props.required || false}>
                    <InputLabel shrink={Boolean(this.state.value)}>{this.props.label}</InputLabel>
                    <Input inputComponent={PhoneMask} onChange={this.handleChange} value={this.state.value} />
                    <FormHelperText>{this.state.error && this.state.message}</FormHelperText>
                </FormControl>
            </div>
        )
    }
}

function PhoneMask(props) {
    const { inputRef, ...other } = props;

    return <Cleave {...other} ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
    }} onChange={(e) => props.onChange(e.target.rawValue)} options={{ phone: true, phoneRegionCode: 'US' }} />
}

export default PhoneText;