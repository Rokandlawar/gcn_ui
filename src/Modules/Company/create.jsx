import React, { useRef } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { FormView, Field } from '../../components/form/Index';
import { Register } from '../../REST/company';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }, backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }
}));

export default function SignUp() {
    const classes = useStyles();
    const theme = useTheme();
    const formView1 = useRef(null)
    const formView2 = useRef(null)
    const [activeStep, setActiveStep] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const [entity, setEntity] = React.useState({ company: null, user: null })
    const [errors, setErrors] = React.useState(null);

    const handleNext = () => {
        if (activeStep === 0) {
            let result = formView1.current.getResult();
            if (result) {
                setEntity({ ...entity, company: result })
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
        }
        if (activeStep === 1) {
            let result = formView2.current.getResult();
            if (result) {
                setEntity({ ...entity, user: result })
                Register({ company: entity.company, user: result }).then(response => {
                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                }).catch(error => {
                    if (error.response) {
                        const ex = error.response.data;
                        console.log(ex)
                        if (ex.name || ex.email || ex.number || ex.username)
                            setErrors(ex);
                    }
                })
            }
        }
    };

    console.log(entity)

    const handleBack = () => {
        if (activeStep === 1) {
            let result = formView2.current.getResult();
            if (result)
                setEntity({ ...entity, user: result })
        }
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return <div className='row'>
        <div className='offset-sm-3 col-sm-6'>
            <h4 className='lead text-center'>Account Registration</h4>
            <Backdrop className={classes.backdrop} open={loading} onClick={() => setLoading(false)}><CircularProgress color="inherit" /></Backdrop>
            {activeStep === 0 && <FormView ref={formView1} data={entity.company} error={errors}>
                <Field.TextBox field='name' label='Company Name' required />
                <Field.TextBox field='number' label='Company DOT#' required />
                <Field.TextBox field='address1' label='Business Address' required />
                <Field.TextBox field='address2' label='Address Line 2 (Contd.)' />
                <div className='row'>
                    <Field.TextBox className='col' field='city' label='City' required />
                    <Field.DropDown options={states} className='col' field='state' label='State' required />
                    <Field.ZipText className='col' field='zip' label='Zip' required />
                </div>
                <div className='row'>
                    <Field.TextBox className='col' field='email' label='Email' required />
                    <Field.PhoneText className='col' field='phone' label='Phone Number' />
                </div>
            </FormView>
            }
            {activeStep === 1 && <FormView ref={formView2} data={entity.user} error={errors}>
                <Field.TextBox field='username' label='User Name' required />
                <Field.TextBox field='firstName' label='First Name' required />
                <Field.TextBox field='lastName' label='Last Name' required />
                <Field.CheckBox label='Allow Electronic Communication' field='ePolicy' required />
                <p className='text-danger'>By checking the above checkbox you are authorizing the department to contact you using your email address. Emails may be automatically generated and sent to the above entered email address by the system.  </p>
                <Field.CheckBox label='Agree to Terms and Conditions' field='agree' required />
            </FormView>}
            {activeStep === 2 && <p>Thank You for Registering, we will notify once your account is approved</p>}
            <MobileStepper
                variant="dots"
                steps={3}
                position="bottom"
                activeStep={activeStep}
                className={classes.root}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === 2}>
                        Next
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0 || activeStep === 2}>
                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          Back
        </Button>
                }
            />
        </div>
    </div>
}

const states = [{ "label": "Alabama", "value": "AL" }, { "label": "Alaska", "value": "AK" }, { "label": "American Samoa", "value": "AS" }, { "label": "Arizona", "value": "AZ" }, { "label": "Arkansas", "value": "AR" }, { "label": "California", "value": "CA" }, { "label": "Colorado", "value": "CO" }, { "label": "Connecticut", "value": "CT" }, { "label": "Delaware", "value": "DE" }, { "label": "District Of Columbia", "value": "DC" }, { "label": "Federated States Of Micronesia", "value": "FM" }, { "label": "Florida", "value": "FL" }, { "label": "Georgia", "value": "GA" }, { "label": "Guam", "value": "GU" }, { "label": "Hawaii", "value": "HI" }, { "label": "Idaho", "value": "ID" }, { "label": "Illinois", "value": "IL" }, { "label": "Indiana", "value": "IN" }, { "label": "Iowa", "value": "IA" }, { "label": "Kansas", "value": "KS" }, { "label": "Kentucky", "value": "KY" }, { "label": "Louisiana", "value": "LA" }, { "label": "Maine", "value": "ME" }, { "label": "Marshall Islands", "value": "MH" }, { "label": "Maryland", "value": "MD" }, { "label": "Massachusetts", "value": "MA" }, { "label": "Michigan", "value": "MI" }, { "label": "Minnesota", "value": "MN" }, { "label": "Mississippi", "value": "MS" }, { "label": "Missouri", "value": "MO" }, { "label": "Montana", "value": "MT" }, { "label": "Nebraska", "value": "NE" }, { "label": "Nevada", "value": "NV" }, { "label": "New Hampshire", "value": "NH" }, { "label": "New Jersey", "value": "NJ" }, { "label": "New Mexico", "value": "NM" }, { "label": "New York", "value": "NY" }, { "label": "North Carolina", "value": "NC" }, { "label": "North Dakota", "value": "ND" }, { "label": "Northern Mariana Islands", "value": "MP" }, { "label": "Ohio", "value": "OH" }, { "label": "Oklahoma", "value": "OK" }, { "label": "Oregon", "value": "OR" }, { "label": "Palau", "value": "PW" }, { "label": "Pennsylvania", "value": "PA" }, { "label": "Puerto Rico", "value": "PR" }, { "label": "Rhode Island", "value": "RI" }, { "label": "South Carolina", "value": "SC" }, { "label": "South Dakota", "value": "SD" }, { "label": "Tennessee", "value": "TN" }, { "label": "Texas", "value": "TX" }, { "label": "Utah", "value": "UT" }, { "label": "Vermont", "value": "VT" }, { "label": "Virgin Islands", "value": "VI" }, { "label": "Virginia", "value": "VA" }, { "label": "Washington", "value": "WA" }, { "label": "West Virginia", "value": "WV" }, { "label": "Wisconsin", "value": "WI" }, { "label": "Wyoming", "value": "WY" }]