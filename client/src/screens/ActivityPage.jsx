import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './styles/Home.css'
import './styles/ActivityPage.css'
import Navbar from '../components/Navbar'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


const ActivityPage = () => {
  const { id } = useParams();
  const [Activity, setActivity] = useState({});
  const loadActivity = async () => {
    const response = await fetch(`${BACKEND_URL}/api/activitypage`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: id })
    });
    const json = await response.json();
    setActivity(json);
  };

  useEffect(() => {
    loadActivity();

  }, []);

  return (
    <div id='HomeScreen'>
      <Navbar />
      <div className='view-body'>
        <h2>{Activity.title}</h2>
        <div className='activity-image-list'>
          {
            Activity.imgs ?
              Activity.imgs.map((image, index) => {
                return (
                  <div className="activity-image" key={`image-${index}`}>
                    <img src={image} className="d-block w-100" alt="..." />
                  </div>
                )
              })
              : ""
          }
        </div>
        <p style={{ textAlign: 'justify', width: '90%', fontSize: '20px' }}>{Activity.description}</p>
      </div>
    </div>
  )
}

export default ActivityPage
