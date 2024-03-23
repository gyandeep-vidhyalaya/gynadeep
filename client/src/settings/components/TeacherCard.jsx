import React, { useState } from 'react'
import './TeacherCard.css'
import { Link, useNavigate } from 'react-router-dom'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
const API_KEY = import.meta.env.VITE_API_KEY;
const API_SECRET = import.meta.env.VITE_API_SECRET;

const TeacherCard = ({ teacher, count, setcount, onClick }) => {

  const navigate = useNavigate();
  const [remove, setremove] = useState('Remove');

  const handleDeleteTeacher = async () => {
    if (!confirm(`Are you sure you want to delete ${teacher.name}'s account?`))
      return;
    setremove('Removing');
    try {

      const response = await fetch(`${BACKEND_URL}/api/deleteteacher`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ img: teacher.img })
      });

      const json = await response.json();
      if (json['success'])
        alert("Account Deleted Successfully");
      else if (json['error'])
        alert(json['error'])
      else
        alert('Something went wrong');
    } catch (error) {
      alert('Something went wrong');
    }
    setremove('Remove');
    setcount(count+1);
  };

  return (
    <div className="card" style={{ "width": "18rem" }}>
      <img className="card-img-top" src={teacher.img} alt="Card image cap" />
      <div className="card-body">
        <h5 className="card-title">{teacher.name}</h5>
        <p className="card-text">{teacher.jobrole}</p>
        <div className="btns">
          <button className='bg-success btn text-white navtext' onClick={() =>{onClick(teacher)}}>Edit</button>
          <button className='bg-danger btn text-white navtext' onClick={handleDeleteTeacher} disabled={remove != 'Remove'}>{remove}</button>
        </div>
      </div>
    </div>
  )
}

export default TeacherCard
