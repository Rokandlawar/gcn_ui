import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import _sortBy from 'lodash/sortBy';

class Dropdown extends Component {

    state = {
        value: '',
        error: false,
        message: ''
    }

    handleChange = (e) => {
        console.log(e.target.value);
        this.setState({ value: e.target.value }, () => {
            if (this.props.changeEvt)
                this.props.changeEvt(this.state.value)
        });
    }

    componentDidMount() {
        this.setState({ value: this.props.value || '', error: this.props.error || false, message: this.props.message || '' })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ value: nextProps.value || '', error: nextProps.error || false, message: nextProps.message || '' })
    }

    getValue = () => {
        if (this.props.required) {
            if (this.state.value !== '')
                return this.state.value;
            else
                this.setState({ error: true, message: this.props.message || `${this.props.label} value is required` });
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
        const options = !this.props.unordered ? _sortBy(this.props.options || [], ['label', 'value']) : this.props.options
        return (
            <div className={this.props.className || ''}>
                <FormControl fullWidth margin='dense' error={this.state.error || false} required={this.props.required || false} disabled={this.props.disabled || false}>
                    <InputLabel>{this.props.label}</InputLabel>
                    <Select native value={this.state.value} onChange={this.handleChange}>
                        <option value="" />
                        {(options || []).map((e, i) => (
                            <option key={String(i)} value={this.props.string ? String(e.value) : e.value}>
                                {e.label}
                            </option>
                        ))}
                    </Select>
                    <FormHelperText>{this.state.error && this.state.message}</FormHelperText>
                </FormControl>
            </div>
        )
    }
}

export default Dropdown;