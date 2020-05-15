import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function ModuleTemplate({ module = 0, settings = [], component, entity = null }, ref) {

    const current = settings.find(e => e.module === module && e.isStatus === false) || {};
    const childView = useRef(null);

    useImperativeHandle(ref, () => ({
        validate: () => {
            if (childView.current && current.allowDisplay)
                return childView.current.validate()
            return Promise.resolve()
        },
        submit: () => {
            if (component.current && current.allowDisplay)
                return component.current.submit()
            return Promise.resolve()
        }
    }))

    if (settings.length < 1 || module === 0)
        return <div />

    const editable = current.allowEdit

    if (current.allowDisplay && (current.displayType === 1 || current.displayType === '1'))
        return React.cloneElement(component, { ref: childView, editable: editable, display: true, entity: entity })

    if (current.allowDisplay && (current.displayType === 2 || current.displayType === '2'))
        return (
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{current.name}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div className='col-12'>
                        {React.cloneElement(component, { ref: childView, editable: editable, display: true, entity: entity })}
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    return <div />
}

export default forwardRef(ModuleTemplate);