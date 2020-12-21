import React, { useState } from 'react';

export default function InsuranceForm() {

    const data = {
        "rows": [{
            "field": "year",
            "period_1": 2021,
            "period_2": 2022,
            "period_3": 2023,
            "period_4": 2024,
            "period_5": 2025
        }]
    };
    const [isYearChecked, setIsYearChecked] = useState({ 2021: true, 2022: true, 2023: true, 2024: true, 2025: true });
    const [tblErr, setTblErr] = useState(null);
    const [formFields, setFormFields] = useState({ Name: '', Gender: '', DOB: '', PhNo: '', Add: '' });
    const [mobErr, setMobErr] = useState("");

    const validateYearTable = (e) => {
        const allKeys = Object.keys(isYearChecked);
        if (isYearChecked[e.target.name] && e.target.name !== allKeys[allKeys.length - 1]) {
            for (let i = allKeys.indexOf(e.target.name) + 1; i < allKeys.length; i++) {
                if (isYearChecked[allKeys[i]]) {
                    return true;
                }
            }
        }
        else {
            if (e.target.name !== allKeys[0]) {
                for (let i = 0; i < allKeys.indexOf(e.target.name); i++) {
                    if (!isYearChecked[allKeys[i]]) {
                        return true;
                    }
                }
            }
        }
        return false;

    }

    const onChkChange = e => {
        let isPrevChkd = validateYearTable(e);

        if (isPrevChkd) {
            setTblErr("Year selection must be an order");
            return;
        }

        setTblErr("");
        setIsYearChecked({ ...isYearChecked, [e.target.name]: !isYearChecked[e.target.name] });
        console.log(Object.keys(isYearChecked));
    }
    const isValidMobNo = (mobNo) => {
        if (/^(1+)?([0-9]){10-13}$/.test(mobNo)) {
            return true;
        }

        return false;
    }


    const validate = e => {
        const errors = {};
        if (!isValidMobNo(e.target.value)) {
            errors.mobErr = "Invalid phone no";
            setMobErr("Invalid phone no");
            return;

        }

        return errors

    }


    const onFormSubmit = (e) => {
        const errors = validate(formFields);
        if (Object.keys(errors).length > 0) {
            return;
        }
        //All error empty
        setMobErr("");

    }
    const onInputChange = e => {
        setFormFields({ ...formFields, [e.target.Name]: e.target.value, [e.target.Gender]: e.target.value, [e.target.DOB]: e.target.value, [e.target.PhNo]: e.target.value, [e.target.Add]: e.target.value });
    }

    return (
        <div>
            <h1>Insurance Form</h1>
            <form onSubmit={onFormSubmit}>
                <input placeholder="Name" name="Name" onChange={onInputChange}></input><br></br>
                <input type="radio" name="g1" onChange={onInputChange}></input><span>Male</span>
                <input type="radio" name="g1" onChange={onInputChange}></input><span>Female</span><br></br>
                <input placeholder="DOB" name="DOB" onChange={onInputChange}></input><br></br>
                <input placeholder="Phone no." name="Phone" onChange={onInputChange}></input><span style={{ color: 'red' }}>{mobErr}</span><br></br>
                <input type="textarea" placeholder="Address" name="Address" onChange={onInputChange}></input><br></br><br></br>
                <table>
                    <thead>
                        <th>field</th>
                        <th>period_1</th>
                        <th>period_2</th>
                        <th>period_3</th>
                        <th>period_4</th>
                        <th>period_5</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>year</td>
                            <td><input id="2021" type="checkbox" name="2021" checked={isYearChecked[2021]} onChange={onChkChange} />2021</td>
                            <td><input id="2022" type="checkbox" name="2022" checked={isYearChecked[2022]} onChange={onChkChange} />2022</td>
                            <td><input id="2023" type="checkbox" name="2023" checked={isYearChecked[2023]} onChange={onChkChange} />2023</td>
                            <td><input id="2024" type="checkbox" name="2024" checked={isYearChecked[2024]} onChange={onChkChange} />2024</td>
                            <td><input id="2025" type="checkbox" name="2025" checked={isYearChecked[2025]} onChange={onChkChange} />2025</td>
                        </tr>
                    </tbody>
                </table>
                <span style={{ color: 'red' }}>{tblErr}</span><br />
                <button>Submit</button>
            </form>
        </div>

    );
}