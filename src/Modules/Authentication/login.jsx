import React, { useRef } from 'react';
import { FormView, Field } from '../../components/form/Index';
import Button from '@material-ui/core/Button';
import { Paper } from '@material-ui/core';
import { authenticationService } from '../../components/authorization';
import { useHistory, useLocation } from 'react-router-dom';
// REST
import { Authorize } from '../../REST/authorize';

export default function Login() {

    const formView = useRef(null);

    let history = useHistory();
    let location = useLocation();

    const handleSubmit = () => {
        let { from } = location.state || { from: { pathname: "/" } };
        let result = formView.current.getResult();
        if (result) {
            Authorize(result.username, result.password).then(response => {
                authenticationService.setToken(response.data, result.username);
                history.replace(from)
            }).catch(ex => {
                console.log(ex);
            })
        }
        return false;
    }

    return (
        <div className='row h-100'>
            <div className='offset-sm-3 offset-md-4 col-sm-6 col-md-4 my-auto'>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    <Paper elevation={2} className='p-3'>
                        <h4 className='lead text-center'>Sign In</h4>
                        <FormView ref={formView}>
                            <Field.TextBox field='username' label='User Name' required />
                            <Field.TextBox field='password' label='Password' required password />
                            <Button type='submit' size='large' className='mt-2' fullWidth variant='outlined' color='secondary'>LOGIN</Button>
                        </FormView>
                    </Paper>
                </form>
            </div>
        </div>)
}