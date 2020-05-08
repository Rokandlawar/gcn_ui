import React, { Component } from 'react';
import MaskedInput from 'react-text-mask';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputAdornment from '@material-ui/core/InputAdornment';

function PhoneMaskCustom(props) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={inputRef}
            mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
            showMask
        />
    );
}

class MaskedText extends Component {

    state = {
        value: this.props.mask === 'phone' ? '(1  )    -    ' : '00.00 ',
        error: this.props.error || false,
        message: this.props.message || '',
        required: this.props.required || false
    }

    componentDidMount() {
        this.props.mask === 'phone' && this.setState({ value: this.props.value || '(1  )    -    ', error: this.props.error || false, message: this.props.message || '' })
        this.props.mask === 'amount' && this.setState({ value: this.props.value || '00.00', error: this.props.error || false, message: this.props.message || '' })
    }

    componentWillReceiveProps(nextProps) {
        this.props.mask === 'phone' && this.setState({ value: nextProps.value || '(1  )    -    ', error: nextProps.error || false, message: nextProps.message || '' })
        this.props.mask === 'amount' && this.setState({ value: nextProps.value || '00.00', error: nextProps.error || false, message: nextProps.message || '' })
    }

    handleChange = (event) => {
        this.setState({
            value: event.target.value,
        }, () => {
            if (this.props.changeEvt)
                this.props.changeEvt()
        })
    }

    valid = () => {
        if (this.props.mask === 'phone') {
            let format = /^\d{10}$/;
            let nonreq = '1'
            let text = this.formatText(this.state.value)
            if (this.state.required) {
                if (!text.match(format))
                    return 'Not a valid format';
            }
            else if (text.match(nonreq))
                return false;
            else if (text.match(""))
                return false
            else if (!text.match(format))
                return 'Not a valid format';
        }
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
            if (this.props.mask === 'phone')
                return text.replace(/[^A-Z0-9]/ig, "");
            if (this.props.mask === 'amount')
                return Number(text)
            return text
        }
        return undefined
    }

    render() {
        return (
            <div className={this.props.className}>
                <FormControl margin='dense' error={this.state.error} required={this.props.required || false} disabled={this.props.disabled || false} fullWidth>
                    <InputLabel>{this.props.label}</InputLabel>
                    {this.props.mask === 'phone' && (
                        <Input value={this.state.value} onChange={this.handleChange} inputComponent={PhoneMaskCustom} />
                    )}
                    {this.props.mask === 'amount' && (
                        <Input value={this.state.value} onChange={this.handleChange} placeholder="00.00" startAdornment={<InputAdornment position="start">$</InputAdornment>} />
                    )}

                    <FormHelperText>{this.state.error && this.state.message}</FormHelperText>
                </FormControl>
            </div>
        )
    }
}

export default MaskedText;
