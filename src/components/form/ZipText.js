import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';


class ZipText extends Component {

    state = {
        value: '',
        error: this.props.error || false,
        message: this.props.message || '',
        required: this.props.required || false
    }

    componentDidMount() {
        this.setState({ value: this.props.value || '', error: this.props.error || false, message: this.props.message || '' })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ value: nextProps.value || '', error: nextProps.error || false, message: nextProps.message || '' })
    }


    handleChange = (event) => {
        let value = event.target.value;
        if (value <= 99999) {
            this.setState({
                value
            }, () => {
                if (this.props.changeEvt)
                    this.props.changeEvt()
            })
        }
    }

    valid = () => {
        return true;
    }

    getValue = () => {
        let valid = this.valid()
        if (valid) {
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
        return (
            <div className={this.props.className}>
                <FormControl margin='dense' error={this.state.error} required={this.props.required || false} disabled={this.props.disabled || false} fullWidth>
                    <InputLabel>{this.props.label}</InputLabel>
                    <Input  value={this.state.value} onChange={this.handleChange} type='number' />
                    <FormHelperText>{this.state.error && this.state.message}</FormHelperText>
                </FormControl>
            </div>
        )
    }
}

export default ZipText;
