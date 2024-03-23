import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import './styles/Home.css'
import './styles/Activities.css'
import ActivityCard from '../components/ActivityCard';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Activities = () => {
  const [ActivityData, setActivityData] = useState([]);
  const loadActivityData = async () => {
    const response = await fetch(`${BACKEND_URL}/api/activitydata`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const json = await response.json();
    json.reverse();
    setActivityData(json);
  };
  useEffect(() => {
    loadActivityData();
  }, []);

  return (
    <div id='HomeScreen'>
      <Navbar />
      <div className='view-body'>

        <div className='activity-list'>

          {
            ActivityData.length > 0 ?
              ActivityData.map((activity, index) => {
                return (
                  <ActivityCard key={index} activity={activity} />
                )
              })
              : "Loading..."
          }
        </div>
      </div>
    </div>
  )
}
export default Activities
