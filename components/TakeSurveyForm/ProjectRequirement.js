import React, { useState } from 'react'
import Checkbox from '../Checkbox'
const ProjectRequirement = ({
  page,
  totalPages,
  questionList,
  recordUserSelection,
  submitForm
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(1); // consider index will start from 1
  const nextQuestion = () => { setActiveQuestion(prev => prev + 1) }
  const previousQuestion = () => { setActiveQuestion(prev => prev - 1) }
  const updateSelection = (q_index, o_index) => {
    recordUserSelection(q_index, o_index)
  }
  const triggerSubmit = async () => {
    setIsSubmitting(true)
    submitForm(()=>{
      setIsSubmitting(false)
    })
  }
  return (
    <div className="ProjectRequirement-container">
      {questionList?.map((item, index) => {
        return (<form key={index} className={`${activeQuestion === index + 1 ? 'active' : 'inactive'}`}>
          <div className="count-number">
            {index + 1}/{totalPages}
          </div>
          <div className="title">{item.question}</div>
          <div className="checkbox-wrapper">
            {item?.options.map((option_item, option_index) => {
              return <Checkbox
                id={`question-${index}-option-${option_index}`}
                key={option_index}
                isChecked={item?.selection === option_index}
                labelText={option_item?.content}
                onClick={() => updateSelection(index, option_index)}
                onChange={() => { }}
              />
            })}
          </div>
          <div className="button-wrapper">
            {activeQuestion !== 1 && <button className="button"
              onClick={previousQuestion}
            >Previous</button>}
            {activeQuestion !== totalPages && <button className="button"
              onClick={nextQuestion}
            >Next</button>}
            {activeQuestion === totalPages && <button className="button" disabled={isSubmitting}
              onClick={triggerSubmit}
            >Submit</button>}

          </div>
        </form>)
      })}
    </div>
  )
}

export default ProjectRequirement;