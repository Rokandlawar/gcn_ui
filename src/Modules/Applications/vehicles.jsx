import React, { useImperativeHandle, forwardRef, useState } from 'react';
import { useParams } from 'react-router-dom'
import CRUDView from '../../components/crud';
import { ValidateVehicle } from '../../REST/application';

function Vehicles({ editable = true, display = true }, ref) {

    const [error, setError] = useState(false)

    const { id } = useParams();

    useImperativeHandle(ref, () => ({
        validate: () => {
            return new Promise((resolve, error) => {
                ValidateVehicle(id).then(response => {
                    setError(false);
                    resolve()
                }).catch(ex => {
                    setError(true);
                    error();
                })
            })
        },
        submit: () => {
            return Promise.resolve()
        }
    }))

    const config = [
        { field: 'make', title: 'Vehicle Make', type: 'text', isGrid: true, required: true },
        { field: 'plate', title: 'Plate Number', type: 'text', isGrid: true, required: true },
        { field: 'state', title: 'Plate Region', type: 'select', isGrid: true, required: true, options: states },
        { field: 'year', title: 'Vehicle Year', type: 'select', isGrid: true, required: true, options: years(1930, new Date().getFullYear() + 1) },
        { field: 'pax', title: 'Passenger Capacity', type: 'numeric', isGrid: true, required: true },
        { field: 'number', title: 'Vehicle Number', type: 'numeric', isGrid: true, required: true },
        { field: 'vin', title: 'VIN', type: 'text', isGrid: false, required: true },
    ]


    return <React.Fragment>
        {error && <p className='text-danger'>Atleast One Vehicle is required for Submission</p>}
        <CRUDView url={process.env.REACT_APP_API_URL + '/Vehicle/' + id} id='id' columns={config} title={'Vehicles'} allowAdd={editable} allowDelete={editable} allowEdit={editable} pageCount={5} />
    </React.Fragment>
}

export default forwardRef(Vehicles);

const years = (min, max) => { let list = []; while (min <= max) { list.push({ label: min, value: min }); min++; } return list }

const states = [{ "label": "Alabama", "value": "AL" }, { "label": "Alaska", "value": "AK" }, { "label": "American Samoa", "value": "AS" }, { "label": "Arizona", "value": "AZ" }, { "label": "Arkansas", "value": "AR" }, { "label": "California", "value": "CA" }, { "label": "Colorado", "value": "CO" }, { "label": "Connecticut", "value": "CT" }, { "label": "Delaware", "value": "DE" }, { "label": "District Of Columbia", "value": "DC" }, { "label": "Federated States Of Micronesia", "value": "FM" }, { "label": "Florida", "value": "FL" }, { "label": "Georgia", "value": "GA" }, { "label": "Guam", "value": "GU" }, { "label": "Hawaii", "value": "HI" }, { "label": "Idaho", "value": "ID" }, { "label": "Illinois", "value": "IL" }, { "label": "Indiana", "value": "IN" }, { "label": "Iowa", "value": "IA" }, { "label": "Kansas", "value": "KS" }, { "label": "Kentucky", "value": "KY" }, { "label": "Louisiana", "value": "LA" }, { "label": "Maine", "value": "ME" }, { "label": "Marshall Islands", "value": "MH" }, { "label": "Maryland", "value": "MD" }, { "label": "Massachusetts", "value": "MA" }, { "label": "Michigan", "value": "MI" }, { "label": "Minnesota", "value": "MN" }, { "label": "Mississippi", "value": "MS" }, { "label": "Missouri", "value": "MO" }, { "label": "Montana", "value": "MT" }, { "label": "Nebraska", "value": "NE" }, { "label": "Nevada", "value": "NV" }, { "label": "New Hampshire", "value": "NH" }, { "label": "New Jersey", "value": "NJ" }, { "label": "New Mexico", "value": "NM" }, { "label": "New York", "value": "NY" }, { "label": "North Carolina", "value": "NC" }, { "label": "North Dakota", "value": "ND" }, { "label": "Northern Mariana Islands", "value": "MP" }, { "label": "Ohio", "value": "OH" }, { "label": "Oklahoma", "value": "OK" }, { "label": "Oregon", "value": "OR" }, { "label": "Palau", "value": "PW" }, { "label": "Pennsylvania", "value": "PA" }, { "label": "Puerto Rico", "value": "PR" }, { "label": "Rhode Island", "value": "RI" }, { "label": "South Carolina", "value": "SC" }, { "label": "South Dakota", "value": "SD" }, { "label": "Tennessee", "value": "TN" }, { "label": "Texas", "value": "TX" }, { "label": "Utah", "value": "UT" }, { "label": "Vermont", "value": "VT" }, { "label": "Virgin Islands", "value": "VI" }, { "label": "Virginia", "value": "VA" }, { "label": "Washington", "value": "WA" }, { "label": "West Virginia", "value": "WV" }, { "label": "Wisconsin", "value": "WI" }, { "label": "Wyoming", "value": "WY" }]