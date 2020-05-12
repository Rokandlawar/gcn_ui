import React, { useRef, useState, useEffect } from 'react';
import { FormView, Field } from '../../components/form/Index';
import { useParams, } from 'react-router-dom';
import { ValidateToken, ResetPassword } from '../../REST/authorize';
import Button from '@material-ui/core/Button';
import DefaultSettings from '../../components/settings';

export default function ResetPasswordView() {
    const [message, setMessage] = useState(null);
    const formView = useRef(null);
    const { id } = useParams()

    useEffect(() => {
        localStorage.clear();
        ValidateToken(id).then(resp => {

        }).catch(ex => {
            setMessage('Invalid Token/Token Expired');
        })
    }, [id])

    const handleClick = () => {
        let result = formView.current.getResult();
        if (result) {
            if (result.password1 === result.password2) {
                if (result.password1.length > 8) {
                    ResetPassword(id, { passwordHash: result.password1, userId: 1 }).then(resp => {
                        setMessage('Please Login Using your new Password')
                    })
                }
                else
                    DefaultSettings.showAlert('Password does not meet requirements', 'error')
            }
            else {
                DefaultSettings.showAlert('Passwords Do Not Match', 'error')
            }
        }
    }

    if (message)
        return <h4 className='text-center'>{message}</h4>
    return <div className='col-12 h-100'><div className='row h-100'><div className='offset-sm-3 col-sm-6 my-auto'>
        <h4 className='lead text-center'>Password Set Up</h4>
        <FormView ref={formView}>
            <Field.TextBox label='Password' password field='password1' required />
            <Field.TextBox label='Confirm Password' password field='password2' required />
            <Field.Content>
                <div className='col pt-5 text-center'>
                    <Button variant='outlined' onClick={handleClick} fullWidth>Submit</Button>
                    <h6><small className='px-3 text-danger text-center pt-3'>Password must contain at least 8 characters</small></h6>
                    <h6><small className='px-3 text-danger text-center'>Password must contain at least 1 Upper Case Letter</small></h6>
                    <h6><small className=' px-3 text-danger text-center'>Password must contain at least 1 Lower Case Letter</small></h6>
                    <h6><small className=' px-3 text-danger text-center'>Password must contain at least 1 Number</small></h6>
                    <h6><small className=' px-3 text-danger text-center'>1 special character => !@#$%^&*/</small></h6>
                </div>
            </Field.Content>
        </FormView></div></div></div>
}