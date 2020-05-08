import React, { Component } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

class SimpleExpansionPanel extends Component {
    state = {
        value: '',
        error: false,
        message: ''
    }
    handleChange = (e) => {
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
                this.setState({ error: true, message: this.props.message || `${this.props.label} is Required` });
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
        return (
            <div>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>{this.state.value}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>

                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}

export default SimpleExpansionPanel;