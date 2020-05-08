import React, { Component } from 'react';
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import FormHelperText from '@material-ui/core/FormHelperText';


class MultiSelect extends Component {

    state = {
        value: [],
        error: false,
        message: ''
    }

    componentDidMount() {
        if (this.props.string) {
            let value = this.props.value ? this.props.value.split(',') : [];
            this.setState({ value, error: this.props.error || false, message: this.props.message || '' })
        }
        else {
            this.setState({ value: this.props.value || '', error: this.props.error || false, message: this.props.message || '' })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.string) {
            if (Array.isArray(nextProps.value)) {
                this.setState({ value: nextProps.value, error: nextProps.error || false, message: nextProps.message || '' })
            }
            else {
                let value = nextProps.value ? nextProps.value.split(',') : [];
                this.setState({ value, error: nextProps.error || false, message: nextProps.message || '' })
            }
        }
        else {
            this.setState({ value: nextProps.value || '', error: nextProps.error || false, message: nextProps.message || '' })
        }
    }

    handleChange = event => {
        this.setState({ value: event.target.value });
    }

    handleDelete = item => {
        if (!this.props.disabled) {
            const value = this.state.value;
            const chipToDelete = value.indexOf(item);
            value.splice(chipToDelete, 1);
            this.setState({ value });
        }
    }

    getValue = () => {
        if (this.props.required) {
            if (this.state.value.length) {
                if (!this.props.string) {
                    return this.state.value
                }
                else {
                    return this.state.value.join(',');
                }
            }
            this.setState({ error: true, message: this.props.message || this.props.label + ' value is required.' }, () => {
                console.log(this.state);
            })
            return undefined;
        }
        return this.props.string ? this.state.value.join(',') : this.state.value;
    }

    setError = (message) => {
        this.setState({ error: true, message: message });
    }

    resetForm = () => {
        this.setState({ error: false, message: '' })
    }

    componentDidCatch(error, info) {
        console.log(error, info);
    }

    render() {
        console.log(this.state.value)
        return (
            <div className={this.props.className || ''}>
                <FormControl fullWidth margin='dense' required={this.props.required || false} error={this.state.error || false} disabled={this.props.disabled || false}>
                    <InputLabel>{this.props.label}</InputLabel>
                    <Select
                        multiple
                        value={this.state.value}
                        onChange={this.handleChange}
                        input={<Input className="text-nowrap" />}
                        renderValue={selected => (
                            <div style={{ whiteSpace: 'pre-wrap' }}>
                                {selected.map(value => {
                                    let item = this.props.options.find(e => e.value === value) || {}
                                    return <Chip
                                        key={item.value || value}
                                        label={item.label || value}
                                        onDelete={this.handleDelete}
                                    />
                                })}
                            </div>
                        )}>
                        {(this.props.options || []).map(e => (
                            <MenuItem
                                key={e.value}
                                value={this.props.string ? e.value.toString() : e.value}
                            >
                                <Checkbox checked={this.state.value.indexOf(this.props.string ? e.value.toString() : e.value) > -1} />
                                <ListItemText primary={e.label} />
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>{this.state.error && this.state.message}</FormHelperText>
                </FormControl>
            </div>
        )
    }
}


export default MultiSelect;