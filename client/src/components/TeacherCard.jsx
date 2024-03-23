import React from 'react';
import './styles/TeacherCard.css';

const TeacherCard = ({ img, number, name, subjects, reveal }) => {
  return (
    <div className={`teacher-card ${reveal ? 'reveal' : ''}`}>
      <img className="teacher-image" src={img} alt={name} />
      <h3 className="teacher-name">{name}</h3>
      <p className="teacher-number">{number != 0 ? number:""}</p>
      <p className="teacher-subjects">{subjects.join(', ')}</p>
    </div>
  );
};

export default TeacherCard;
