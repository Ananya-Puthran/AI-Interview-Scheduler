import React from 'react'

function QuestionListContainer({ questionList }) {
  return (
    <div>
          <h2 className=" mt-5 font-bold text-lg">Generated Interview Questions:</h2>
        <div className="mt-5 p-5 border-gray-300 rounded-xl bg-white">
          {questionList.map((question, index) => (
            <div
              key={index}
              className="p-3 border border-gray-200 rounded-xl mb-3">
              <h2 className="font-medium">{question.question}</h2>
              <h2 className="text-sm text-primary">Type: {question?.type}</h2>
            </div>
          ))}
        </div> 
    </div>
  )
}

export default QuestionListContainer
