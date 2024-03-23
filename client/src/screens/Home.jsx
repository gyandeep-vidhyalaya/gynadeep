import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import TeacherCard from '../components/TeacherCard'
import ActivityCard from '../components/ActivityCard';

import './styles/Home.css'
import './styles/AboutUs.css'
import './styles/Activities.css'
import '../components/styles/TeacherCard.css'
import '../components/styles/ActivityCard.css'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Home = () => {
  const [TeacherData, setTeacherData] = useState([]);
  const [ActivityData, setActivityData] = useState([]);
  const [reveal, setReveal] = useState(false);

  const loadTeacherData = async () => {
    const response = await fetch(`${BACKEND_URL}/api/hometeachers`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const json = await response.json();
    if (!json['error'])
      setTeacherData(json);
  };

  const loadActivityData = async () => {
    const response = await fetch(`${BACKEND_URL}/api/homeactivities`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const json = await response.json();
    if (!json['error'])
      setActivityData(json);
  };

  useEffect(() => {
    loadTeacherData();
    loadActivityData();
  }, [])

  return (
    <div id='HomeScreen'>
      <Navbar />
      <div className="view-body">
        {
          ActivityData.length > 0 ?
            <div className="home-activity">
              <h2>Activities</h2>
              <hr />
              <div className='activity-list'>
                {
                  ActivityData.map((activity, index) => {
                    return (
                      <ActivityCard key={index} activity={activity} />
                    )
                  })
                }
              </div>
            </div>
            : ""
        }
        {
          TeacherData.length > 0 ?
            <div className='home-teacher'>
              <h2>Teachers</h2>
              <hr />
              <div className="teacher-list">
                {
                  TeacherData.map((teacher, index) => {
                    return (
                      <TeacherCard
                        key={teacher._id}
                        img={teacher.img}
                        number={teacher.number}
                        name={teacher.name}
                        subjects={teacher.subjects}
                        reveal={reveal}
                      />
                    )
                  })
                }
              </div>
            </div>
            : ""
        }
      </div>
    </div>
  )
}

export default Home