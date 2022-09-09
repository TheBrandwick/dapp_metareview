import React, { useEffect, useState } from 'react'
import useIPFS from '../../hooks/useIPFS';
import useJsonBin from '../../hooks/useJsonBin';
import ModalContainer from '../ModalContainer';

function CreateSurveyForm({ show, create_survey, closeFunction }) {
    const [entryFee, setEntryFee] = useState("");
    const [step, setStep] = useState(1);
    const { uploadJSON, fetchJSON } = useJsonBin()
    useEffect(()=>{
        fetchJSON()
    },[])
    const [generalFields, setGeneralFields] = useState({
        maxParticipantsCount: "",
        rewardPerParticipant: "",
        validUntil: "",
        isDraft: false,
        isActive: true,
        formUri: ""
    });
    const [questionList, setQuestionList] = useState([
        {
            question: "what is Solana",
            options: [
                {
                    content: "This is option One",
                    type: "checkbox" // checkbox or textarea
                },
                {
                    content: "This is option One",
                    type: "checkbox" // checkbox or textarea
                },
            ]
        }
    ])
    const updateGeneralFields = (e) => {
        let checkboxes = ['isDraft', 'isActive'];
        if (checkboxes.includes(e.target.name)) {
            setGeneralFields((prev) => ({
                ...prev,
                [e.target.name]: e.target.checked
            }))

        } else {
            setGeneralFields((prev) => ({
                ...prev,
                [e.target.name]: e.target.value
            }))
        }
    }
    const addQuestion = (e) => {
        e.preventDefault()
        setStep(step+1)
        setQuestionList((prev) => ([
            ...prev,
            {
                question: "This is option One",
                type: "text",
                options: []
            }
        ]))
    }
    const removeQuestion = (q_index) => {
        setQuestionList((prev) => ([
            prev.splice(q_index, 1)
        ]))
    }
    const updateQuestion = (q_index, data) => {
        let temp_question_list = [...questionList];
        temp_question_list[q_index] = {
            ...temp_question_list[q_index],
            question: data.question
        }
        setQuestionList(temp_question_list)
    }
    const addOption = (q_index) => {
        let temp_question_list = [...questionList];
        temp_question_list[q_index].options.push({
            content: "This is option One",
            type: "checkbox" // checkbox or textarea
        })
        setQuestionList(temp_question_list)
    }
    const updateOption = (q_index, option_index, data) => {
        let temp_question_list = [...questionList];
        temp_question_list[q_index].options[option_index] = {
            ...temp_question_list[q_index].options[option_index],
            ...data
        }
        setQuestionList(temp_question_list)
    }
    const removeOption = (q_index, option_index) => {
        let temp_question_list = [...questionList];
        temp_question_list[q_index].options.splice(option_index, 1)
        setQuestionList(temp_question_list)
    }
    const handleStartQuestioning = (e) => {
        e.preventDefault();
        setStep(2)
    }
    const handleSubmit = async () => {
        console.log(generalFields);
        console.log(questionList);
        
        const res = await uploadJSON(questionList)
        console.log("Uploaded file id=>",res)
        let data_to_send = {
            ...generalFields,
            "formUri": res
        }
        await create_survey(data_to_send);
        closeFunction();
    }
    return (
        <ModalContainer
            show={show}
            closeFunction={closeFunction}
            maxHeightAllocated={499}
            maxWidthAllocated={532}
            overflowY="auto"
        >
            <div className='create-lottery-form-container'>

                {step === 1 && <form className='create-lottery-form' onSubmit={e => handleStartQuestioning(e)}>

                    <div>
                        <h3>Create New Survey</h3>

                        <label>Max. participants:</label>
                        <input
                            name="maxParticipantsCount"
                            type="number"
                            placeholder="Max. participants"
                            required
                            value={generalFields?.maxParticipantsCount}
                            onChange={e => updateGeneralFields(e)}
                        />

                        <label>Reward per Participant:</label>
                        <input
                            name="rewardPerParticipant"
                            type="number"
                            step="0.0001"
                            placeholder="Reward in SOL"
                            required
                            value={generalFields?.rewardPerParticipant}
                            onChange={e => updateGeneralFields(e)}
                        />

                        <label>End Date:</label>
                        <input
                            name="validUntil"
                            type="date"
                            required
                            value={generalFields?.validUntil}
                            onChange={e => updateGeneralFields(e)}
                        />

                        <label>Is Draft?</label>
                        <input
                            name="isDraft"
                            type="checkbox"

                            checked={generalFields?.isDraft}
                            onChange={e => updateGeneralFields(e)}
                        />

                        <label>Is Active?</label>
                        <input
                            name="isActive"
                            type="checkbox"

                            checked={generalFields?.isActive}
                            onChange={e => updateGeneralFields(e)}
                        />

                        <label>formUri:</label>
                        <input
                            name="formUri"
                            type="text"
                            required
                            value={generalFields?.formUri}
                            onChange={e => updateGeneralFields(e)}
                        />
                    </div>

                    <button
                        type='submit'
                        className='submit-btn'
                    >
                        Create
                    </button>
                </form>}
                {questionList && questionList.map((question, index) => {
                    return <form onSubmit={addQuestion} key={index} className={`${step === index + 2?'active-form-slide':'inactive-form-slide'}`}>
                        <input
                            type="text"
                            value={question.question}
                            onChange={(e)=>updateQuestion(index, {
                                question: e.target.value
                            })}
                            placeholder="Enter the Question"
                            required
                        />
                        {question.options.map((option, o_index) => {
                            return <input
                            type={option.type}
                            value={option.content}
                            onChange={(e)=>updateOption(index, o_index, {
                                question: e.target.value
                            })}
                            placeholder={`Enter the Option ${o_index+1}`}
                            required
                        />
                        })}
                        <button type='button' onClick={()=>addOption(index)}>+ Add Another</button>
                        <div className='bottom-action-btn'>
                            <button type="button" onClick={handleSubmit}>Submit</button>
                            <button type="submit">Next</button>
                        </div>
                    </form>
                })}
            </div>


        </ModalContainer>
    )
}

export default CreateSurveyForm