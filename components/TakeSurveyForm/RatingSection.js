import React from 'react'

const RatingSection = () => {
    return (
        <div className="RatingSection-container">
            <div className="count-number">
                2/5
            </div>
            <div className="title">How do you describe your overall satisfaction?</div>
            <div className="rating-card-wrapper">
                <div className="rating-card">
                    <span>Service provided</span>
                    <img src="/assets/Star.svg" alt="" />
                    <img src="/assets/Star.svg" alt="" />
                </div>
                <div className="rating-card">
                    <span>Products quality</span>
                    <img src="/assets/Star.svg" alt="" />
                    <img src="/assets/Star.svg" alt="" />
                    <img src="/assets/Star.svg" alt="" />
                    <img src="/assets/Star.svg" alt="" />
                    <img src="/assets/Star.svg" alt="" />
                </div>
                <div className="rating-card">
                    <span>Support</span>
                    <img src="/assets/Star.svg" alt="" />
                    <img src="/assets/Star.svg" alt="" />
                    <img src="/assets/Star.svg" alt="" />
                </div>
                <div className="rating-card">
                    <span>General satisfaction</span>
                    <img src="/assets/Star.svg" alt="" />
                </div>
            </div>
        </div>
    )
}

export default RatingSection;