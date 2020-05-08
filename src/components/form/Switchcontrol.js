import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

const theme = createMuiTheme({
    palette: {
        primary: { main: '#11cb5f' },
    },
});

class SwitchControl extends Component {

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
                this.setState({ error: true, message: this.props.message || `${this.props.label} is required.` })
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

    componentDidMount() {
        let value = this.props.value;
        if (typeof value != 'boolean') {
            value = ((value === 'true' || value === 1) ? true : false);
        }
        this.setState({ value, error: this.props.error || false, message: this.props.message || '' })
    }

    componentWillReceiveProps(nextProps) {
        let value = nextProps.value;
        if (typeof value != 'boolean') {
            value = ((value === 'true' || value === 1) ? true : false);
        }
        this.setState({ value, error: nextProps.error || false, message: nextProps.message || '' })
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <FormControl className={this.props.className || ''} fullWidth margin='none' error={this.state.error || false} required={this.props.required || false} disabled={this.props.disabled || false}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={this.state.value}
                                onChange={this.handleChange}
                                color="primary"
                            />
                        }
                        label={this.state.value ? 'Active' : 'Inactive'}
                    />
                    <FormHelperText>{this.state.error && this.state.message} </FormHelperText>
                </FormControl>
            </MuiThemeProvider>
        )
    }

}

export default SwitchControl;