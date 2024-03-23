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
        <div id="carouselExampleFade" className="carousel slide carousel-fade my-4" data-bs-ride="carousel" style={{ objectFit: "contain !important", width:"90%" }} >
          <div className="carousel-inner" id='carousel'>
            {
              Activity.imgs ?
                Activity.imgs.map((image, index) => {
                  return (
                    <div key={`image-${index}`} className={index == 0 ? "carousel-item active":"carousel-item"}>
                      <img src={image}  className="d-block w-100" style={{ "filter": "brightness(90%)", "borderRadius":"20px" }} alt="..." />
                    </div>
                  )
                })
                : ""
            }
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon color-dark" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <p style={{ textAlign: 'justify', width: '90%', fontSize : '20px' }}>{Activity.description}</p>
      </div>
    </div>
  )
}

export default ActivityPage
