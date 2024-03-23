import React, { useEffect, useState } from 'react'
import './styles/ActivityCard.css'
import { Link } from 'react-router-dom'

const ActivityCard = ({ activity }) => {
  const [image, setimage] = useState('');
  const [title, settitle] = useState('');
  const [description, setdescription] = useState('');
  useEffect(() => {
    setimage(activity.imgs[0]);
    settitle(activity.title);
    setdescription(activity.description);
  }, [])

  return (
    <Link to={`/activity/${activity._id}`} className="activity-card-link" style={{"textDecoration":"none"}}>
      <div className="activity-card">
        <img src={image} alt={title} sgy className="activity-card-image" />
        <div className="activity-card-content">
          <h2 className="activity-card-title">{title}</h2>
          <p className="activity-card-subtitle">{description.substring(0, 15)}...</p>
        </div>
      </div>
    </Link>
  )
}

export default ActivityCard
