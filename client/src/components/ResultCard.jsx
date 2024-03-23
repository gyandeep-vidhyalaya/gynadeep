import React from 'react'
import './styles/ResultCard.css'

const ResultCard = ({result}) => {
  return (
    <div className='result-card'>
      <ul>
        <li>
        <h4>Standard {result.standard}{result.division}:</h4>
        </li>
      </ul>
      <img src={result.img} alt="Loading..." />
    </div>
  )
}

export default ResultCard
