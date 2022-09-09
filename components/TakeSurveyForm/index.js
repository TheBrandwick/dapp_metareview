import React, { useState } from 'react'
import ModalContainer from "../ModalContainer"
import DetailForm from './DetailForm';
import ProjectRequirement from './ProjectRequirement';
import RatingSection from './RatingSection';

const CreateSurveyForm = ({ show, closeFunction }) => {
    const [page, setPage] = useState(0);

    const PageDisplay = () => {
        if (page === 0) {
            return <DetailForm />
        } else if (page === 1) {
            return <RatingSection />
        } else {
            return <ProjectRequirement />
        }
    }
    return (
        <ModalContainer
            show={show}
            closeFunction={closeFunction}
            maxHeightAllocated={650}
            maxWidthAllocated={1100}
            overflowY="auto"
        >
            <div className="SurveyForm-container">
                <div className="SurveyForm-wrapper">
                    <div className="form-left-container">
                        <div className="Company-logo">
                            SOLVAY
                        </div>
                        <div className="body">
                            <img src="/assets/smartworks-coworking-cW4lLTavU80-unsplash 1.png" alt="img" />
                            <div className="title">Company Day1 Feedback</div>
                            <div className="desc">Fill the company detail on the basis of your experinec ,Feel free to reach out to himanshu091rawat@gmail.com for any queries</div>
                            <div className="button">
                                Re-Start Survey
                            </div>
                        </div>

                        <div className="footer">
                            <div className="copyright-text">
                                © 2022 Brandvalley Technologies PVT Ltd
                            </div>
                        </div>

                    </div>
                    <div className="form-right-container">
                        {/* <div className="count-number">
                            1/5
                        </div> */}
                        <div className="content-body">
                            {PageDisplay()}
                        </div>
                        <div className="button-wrapper">
                            <button className="button"
                                disabled={page === 2}
                                onClick={
                                    () => {
                                        setPage((currPage) => currPage + 1)
                                    }
                                }
                            >Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </ModalContainer>
    )
}

export default CreateSurveyForm