import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";


class CheckGroup extends Component {

    state = {
        value: []
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

    handleDelete = item => {
        const value = this.state.value;
        const chipToDelete = name.indexOf(item);
        value.splice(chipToDelete, 1);
        this.setState({ value });
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
            this.setState({ error: true, message: this.props.message || this.props.label + 'value is required.' })
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

    handleChange = event => {
        this.setState({ [value]: event.target.value });
    }


    render() {
        return (

            <FormControl component="fieldset" disabled={this.props.disabled || false}>
                <FormLabel
                    component="legend"> {this.props.label}</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.value}
                                onChange={this.handleChange(value)}
                                value={this.state.value}
                            />
                        }
                        label={this.props.label}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.jason}
                                onChange={this.handleChange(value)}
                                value={this.state.value}
                            />
                        }
                        label={this.props.label}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.antoine}
                                onChange={this.handleChange(value)}
                                value={this.state.value}
                            />
                        }
                        label={this.props.label}
                    />
                </FormGroup>
            </FormControl>
        )
    }
}


export default CheckGroup;