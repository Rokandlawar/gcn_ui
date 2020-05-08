import React, { forwardRef, useImperativeHandle, useRef } from 'react';

function ModuleTemplate({ module = 0, settings = [], component, entity = null }, ref) {

    const current = settings.find(e => e.module === module) || {};
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
    if (current.allowDisplay)
        return React.cloneElement(component, { ref: childView, editable: editable, display: true, entity: entity })
    return <div />
}

export default forwardRef(ModuleTemplate);