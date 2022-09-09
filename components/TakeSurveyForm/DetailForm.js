import React from 'react'
import Checkbox from '../Checkbox';

const DetailForm = () => {
    return (
        <div className="detail-form-container">
            <div className="count-number">
                1/5
            </div>
            <div className="title">Please fill with your details</div>
            <div className="input-wrapper">
                <input type="text" placeholder="Name" />
                <input type="email" placeholder="Email" />
                <input type="text" placeholder="Number" />
                <input type="text" placeholder="Your Country" />

            </div>
            <div className="checkbox-wrapper">
                <div className="">
                    <Checkbox labelText="Male" />

                </div>
                <div className="checkbox-two">
                    <Checkbox labelText="Female" />
                </div>

            </div>
            <div className="checkbox-terms">
                <input type="checkbox" value="male" />
                <label > Please accept our <span>Terms and conditions</span></label>
            </div>
        </div>
    )
}

export default DetailForm;