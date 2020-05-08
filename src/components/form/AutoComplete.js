import React, { Component } from 'react';
import Downshift from 'downshift';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';


function renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem }) {
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem ? selectedItem.label : '').indexOf(suggestion.label) > -1;

    return (
        <MenuItem
            {...itemProps}
            key={suggestion.value}
            selected={isHighlighted}
            component="div"
            style={{
                fontWeight: isSelected ? 500 : 400,
            }}
        >
            {suggestion.label}
        </MenuItem>
    );
}

function getSuggestions(inputValue, suggestions = []) {
    let count = 0;
    return suggestions.filter(suggestion => {
        const keep =
            (!inputValue || (suggestion && suggestion.label && suggestion.label.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1)) &&
            count < 5;

        if (keep) {
            count += 1;
        }

        return keep;
    });
}


class AutoComplete extends Component {

    state = {
        value: '',
        error: this.props.error || false,
        message: this.props.message || '',
        isFlag: false,
        edit: this.props.edit || false,
        required: this.props.required || false
    }

    componentDidMount() {
        this.setState({ edit: this.props.edit || false, required: this.props.required || '', value: this.props.value || '', error: this.props.error || false, message: this.props.message || '' });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ edit: nextProps.edit, value: nextProps.value || '', required: nextProps.required || false, error: nextProps.error || false, message: nextProps.message || '' })
    }

    handleChange = (selection) => {
        this.setState({ value: selection.label }, () => {
            if (this.props.changeText)
                this.props.changeText(selection);
        })
    }

    handleInputChange = (value) => {
        this.setState({ value }, () => {
            if (this.props.changeEvt)
                this.props.changeEvt({ label: value, value: '' });
        })
    }

    getValue = () => {
        try {
            if (this.props.required) {
                if (!this.state.value && this.state.value === '')
                    throw this.props.message || this.props.label + ' value is required.'
            }
            return this.state.value
        }
        catch (ex) {
            this.setState({ error: true, message: ex })
        }
    }

    setError = (message) => {
        this.setState({ error: true, message: message })
    }

    resetForm = () => {
        this.setState({ error: false, message: '' })
    }

    handleInput = (item) => {
        return this.state.value
    }

    render() {
        const { value, error, message } = this.state;
        return (
            <div className={this.props.className || ''}>
                <Downshift onChange={selection => this.handleChange(selection)} itemToString={this.handleInput} onInputValueChange={this.handleInputChange}>
                    {({ getInputProps, getItemProps, isOpen, inputValue, selectedItem, highlightedIndex, setState }) => (
                        <div>
                            <TextField value={value} fullWidth label={this.props.label} error={error} helperText={error && message} disabled={this.props.disabled || false} required={this.props.required || false} onChange={evt => setState({ inputValue: evt.target.value, isOpen: true })} />
                            {isOpen ? (
                                <Paper square>
                                    {getSuggestions(inputValue, this.props.suggestions).map((suggestion, index) =>
                                        renderSuggestion({
                                            suggestion,
                                            index,
                                            itemProps: getItemProps({ item: suggestion }),
                                            highlightedIndex,
                                            selectedItem,
                                        }),
                                    )}
                                </Paper>
                            ) : null}
                        </div>
                    )}
                </Downshift>
            </div>
        );
    }
}
export default AutoComplete;