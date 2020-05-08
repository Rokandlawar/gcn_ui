import React, { Component } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

class RadioBox extends Component {

    state = {
        value: null,
        error: this.props.error || false,
        message: this.props.message || ''
    }

    componentDidMount() {
        this.setState({ value: this.props.value || '', error: this.props.error || false, message: this.props.message || '' })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ value: nextProps.value || '', error: nextProps.error || false, message: nextProps.message || '' })
    }

    handleChange = (event) => {
        this.setState({ value: event.target.value }, () => {
            if (this.props.changeEvt)
                this.props.changeEvt();
        });
    }

    getValue = () => {
        if (this.props.required) {
            if (this.state.value) {
                return this.state.value
            }
            else {
                this.setState({ error: true, message: this.props.message || (this.props.label + ' value is required.') })
            }
        }
        else {
            return this.state.value;
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
                <FormControl component="fieldset" required={this.props.required || false} margin="dense" error={this.state.error || false} disabled={this.props.disabled || false}>
                    <FormLabel component="legend">{this.props.label}</FormLabel>
                    <RadioGroup onChange={this.handleChange} value={this.state.value}>
                        {this.props.options.map((e, i) => {
                            return <FormControlLabel key={String(i)} value={e.value} control={<Radio color="primary" />} label={e.label} />
                        })}
                    </RadioGroup>
                    <FormHelperText>{this.state.error && this.state.message}</FormHelperText>
                </FormControl>
            </div>
        )
    }

}

export default RadioBox;