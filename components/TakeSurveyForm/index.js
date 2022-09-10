import React, { useEffect, useState } from 'react'
import useJsonBin from '../../hooks/useJsonBin';
import ModalContainer from "../ModalContainer"
import DetailForm from './DetailForm';
import ProjectRequirement from './ProjectRequirement';
import RatingSection from './RatingSection';

const TakeSurveyForm = ({ show, closeFunction }) => {
    const [page, setPage] = useState(0);
    const [surveyData, setSurveyData] = useState(null);
    const [questionList, setQuestionList] = useState([]);
    const {fetchJSON} = useJsonBin();
    useEffect(()=>{
        if(show){
            console.log({show})
            setSurveyData(show)
            collectQuestionList(show.formUri);
        }
    },[show])
    const recordUserSelection = (question_index, selected_option_index) => {
        let temp_question_list = [...questionList];
        temp_question_list[question_index] = {
            ...temp_question_list[question_index],
            selection: selected_option_index
        }
        setQuestionList(temp_question_list)

    }
    const collectQuestionList = async (id) => {
        if(!id){ return }
        const res = await fetchJSON(id);
        console.log("records",res)
        setQuestionList(prev => [...res])
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
                            MetaReview
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
                        <div className="content-body">
                         <ProjectRequirement totalPages={questionList?.length} questionList={questionList} recordUserSelection={recordUserSelection}/>
                        </div>
                        
                    </div>
                </div>
            </div>
        </ModalContainer>
    )
}

export default TakeSurveyForm