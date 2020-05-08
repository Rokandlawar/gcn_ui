import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import React, { Component } from 'react';

class CheckBox extends Component {

    state = {
        value: false
    }

    handleChange = (event) => {
        this.setState({ value: event.target.checked }, () => {
            if (this.props.checkEvt)
                this.props.checkEvt(this.state.value)
        })
    }

    getValue = () => {        
        if (this.props.required) {
            if (this.state.value === true)
                return this.state.value
            else
                this.setState({ error: true, message: (this.props.message || `${this.props.label} is required.`) })
        }
        else {
            return this.state.value
        }
    }

    setError = (message) => {
        this.setState({ error: true, message });
    }

    resetForm = () => {
        this.setState({ error: false, message: this.props.message || '' })
    }

    componentDidMount() {
        this.setState({ value: this.props.value || false, error: this.props.error || false, message: this.props.message || '' })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ value: nextProps.value || false, error: nextProps.error || false, message: nextProps.message || '' })
    }

    render() {
        return (
            <div className={this.props.className || ''}>
                <FormControl fullWidth margin='none' error={this.state.error || false} required={this.props.required || false} disabled={this.props.disabled || false}>
                    <FormGroup >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.value}
                                    onChange={this.handleChange}
                                    color='primary'
                                />
                            }
                            label={this.props.label}
                        />
                        <FormHelperText>{this.state.error && this.state.message} </FormHelperText>
                    </FormGroup>
                </FormControl>
            </div>
        )
    }

}

export default CheckBox;