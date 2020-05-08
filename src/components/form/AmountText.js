import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import CurrencyInput from 'react-currency-input';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';

class TextBox extends Component {

    state = {
        value: '0.00',
        error: this.props.error || false,
        message: this.props.message || '',
        isFlag: false
    }

    componentDidMount() {
        this.setState({ value: this.props.value || 0.00, error: this.props.error || false, message: this.props.message || '' });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ value: nextProps.value || 0.00, error: nextProps.error || false, message: nextProps.message || '' })
    }

    handleChange = (value) => {
        this.setState({ value }, () => {
            if (this.props.changeEvt)
                this.props.changeEvt(this.state.value);
        })
    }

    getValue = () => {
        return this.state.value;
    }

    setError = (message) => {
        this.setState({ error: true, message: message })
    }

    resetForm = () => {
        this.setState({ error: false, message: '' })
    }

    render() {
        //  const AmntMask = props => <AmountMask {...props} precision={this.props.precision} />
        return (
            <div className={this.props.className || ''}>
                <FormControl error={this.state.error} disabled={this.props.disabled || false} margin='dense' required={this.props.required || false} fullWidth >
                    <InputLabel shrink>{this.props.label}</InputLabel>
                    {!this.props.precision && <Input inputComponent={AmountMask} onChange={this.handleChange} value={this.state.value} />}
                    {this.props.precision && <Input inputComponent={AmountMask5} onChange={this.handleChange} value={this.state.value} />}
                    <FormHelperText>{this.state.error && this.state.message}</FormHelperText>
                </FormControl>
            </div>
        )
    }
}

function AmountMask(props) {

    const { inputRef, ...other } = props;

    return <CurrencyInput {...other} prefix='$' onChange={(e, v, f) => { props.onChange(v) }} />
}

function AmountMask5(props) {

    const { inputRef, ...other } = props;

    return <CurrencyInput {...other} prefix='$' precision={5} onChange={(e, v, f) => { props.onChange(v) }} />
}

export default TextBox;