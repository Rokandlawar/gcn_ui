import React, { Component } from 'react';
import TextBox from './TextBox';
import TextArea from './TextArea';
import DropDown from './Dropdown';
import RadioBox from './Radiobox';
import CheckBox from './Checkbox';
import MultiSelect from './MultiSelect';
import MaskedText from './MaskedText';
import SwitchControl from './Switchcontrol';
import CustomMaskedText from './CustomMaskedText';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';
import AmountText from './AmountText';
import PhoneText from './PhoneText';
import YearText from './YearText';
import ZipText from './ZipText';
import AutoComplete from './AutoComplete';
import DateTimePicker from './DateTimePicker';
import SimpleExpansionPanel from './ExpansionPanel';

class FormView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            reset: 0,
            display: false
        }
        this.fields = {}
    }

    componentDidMount() {
        this.setState({ display: true })
    }

    componentDidCatch(error, info) {
        console.log(error, info)
        // this.setState({value: 0})
    }

    getResult = () => {
        let result = {};
        for (let f in this.fields) {
            let field = this.fields[f];
            if (field.current)
                field = field.current;
            let value = field.getValue();
            if (value !== undefined && value !== null)
                field.resetForm();
            if (value !== undefined && value !== null && result !== false) {
                if (this.isNew(field) || (field.props && !field.props.exclude)) {
                    result = { ...result, [f]: value }
                }
            }
            else
                result = false;
        }
        return result;
    }

    isNew = (field) => {
        if (typeof field.isNew === 'function')
            return field.isNew()
    }

    getCurrentResult = () => {
        let result = {};
        for (let f in this.fields) {
            let field = this.fields[f];
            if (field.current)
                field = field.current;
            let value = field.getValue();
            field.resetForm();
            //  if (value != undefined && value != null) {
            if (this.isNew(field) || (field.props && !field.props.exclude)) {
                result = { ...result, [f]: value }
            }
            //  }
        }
        return result;
    }

    setError = (errors) => {
        for (let f in this.fields) {
            let field = this.fields[f];
            let error = errors[f];
            if (error) {
                field.setError(error);
            }
        }
    }

    mapPropsToChild = (children) => {
        return React.Children.map(children, (each) => {
            try {
                if (each.props.children && !each.props.field)
                    return React.cloneElement(each, null, this.mapPropsToChild(each.props.children))
                let error = false;
                let message = each.props.message;
                if (this.props.error) {
                    error = this.props.error[each.props.field] ? true : false
                    if (error)
                        message = this.props.error[each.props.field]
                }
                let disabled = this.props.disabled;
                if (!disabled) {
                    disabled = each.props.disabled
                }
                if (each.props.field)
                    return React.cloneElement(each, { parent: this.fields, value: this.props.data ? this.props.data[each.props.field] : '', message, error, disabled: disabled || false })
                else
                    return React.cloneElement(each, {})
            }
            catch (ex) {
                return each
            }
        })
    }

    resetFields = () => {
        this.setState((prevState, props) => {
            return { reset: prevState.reset + 1 }
        })
    }

    render() {
        if (this.state.display) {
            this.fields = {}
            const children = this.mapPropsToChild(this.props.children)
            return (
                <div>{children}</div>
            );
        }
        else {
            return <p>loading...</p>
        }
    }
}

const Field = {
    TextBox: function (props) {
        return <TextBox ref={(e) => { props.parent[props.field] = e }} {...props} />
    },
    TextArea: function (props) {
        return <TextArea ref={(e) => { props.parent[props.field] = e }} {...props} />
    },
    MultiSelect: function (props) {
        return <MultiSelect ref={(e) => { props.parent[props.field] = e }} {...props} />
    },
    DropDown: function (props) {
        return <DropDown ref={(e) => { props.parent[props.field] = e }} {...props} />
    },
    SwitchControl: function (props) {
        return <SwitchControl ref={(e) => { props.parent[props.field] = e }} {...props} />
    },
    RadioGroup: function (props) {
        return <RadioBox ref={(e) => { props.parent[props.field] = e }} {...props} />
    },
    DatePicker: function (props) {
        return <DatePicker ref={(e) => { props.parent[props.field] = e }} {...props} />
    },
    DateTimePicker: function (props) {
        return <DateTimePicker ref={(e) => { props.parent[props.field] = e }} {...props} />
    },
    TimePicker: function (props) {
        return <TimePicker ref={(e) => { props.parent[props.field] = e }} {...props} />
    },
    CheckBox: function (props) {
        return <CheckBox ref={(e) => { props.parent[props.field] = e }} {...props} />
    },
    MaskedText: function (props) {
        return <MaskedText ref={(e) => { props.parent[props.field] = e }} {...props} />
    },
    CustomMaskedText: function (props) {
        return <CustomMaskedText ref={(e) => { props.parent[props.field] = e }} {...props} />
    },
    AmountText: function (props) {
        return <AmountText ref={(e) => { props.parent[props.field] = e }} {...props} />
    },
    PhoneText: function (props) {
        return <PhoneText ref={(e) => { props.parent[props.field] = e }} {...props} />
    },
    YearText: function (props) {
        return <YearText ref={(e) => { props.parent[props.field] = e }} {...props} />
    },
    ZipText: function (props) {
        return <ZipText ref={(e) => { props.parent[props.field] = e }} {...props} />
    },
    ExpansionPanel: function (props) {
        return <SimpleExpansionPanel ref={(e) => { props.parent[props.field] = e }} {...props} />
    },
    Row: function (props) {
        if (props.className)
            return <div className={props.className}>{props.children}</div>
        return <div className='form-row'>{props.children}</div>
    },
    Content: function (props) {
        if (props.className)
            return <div className={props.className}>{props.children}</div>
        return <div className='form-row'>{props.children}</div>
    },
    AutoComplete: function (props) {
        return <AutoComplete ref={(e) => { props.parent[props.field] = e }} {...props} />
    }
}

export { Field, FormView }