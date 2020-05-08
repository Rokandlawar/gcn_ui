import React, { useRef } from 'react';
import Button from '@material-ui/core/Button';

export default function ModuleTemplate({ settings = [], handleClick, children }) {
    const refs = useRef(children.map(() => React.createRef()));
    if (settings.length < 1 || module === 0)
        return <div />

    const handleStatus = (validate) => event => {
        Promise.all(refs.current.map(e => e.current.validate())).then(resp => {
            handleClick()
        }).catch(ex => {

        })
    }

    return <React.Fragment>
        {
            settings.filter(e => e.isStatus && e.allowDisplay).map((e, i) => {
                return <Button variant='outlined' color='secondary' key={i} onClick={handleStatus(e.validate)}>{e.name}</Button>
            })
        }
        {React.Children.map(children, (elem, idx) => {
            return React.cloneElement(elem, {
                ref: refs.current[idx]
            })
        })}
    </React.Fragment>
}