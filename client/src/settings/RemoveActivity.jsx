import React, { useEffect, useState } from 'react'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const RemoveActivity = () => {
    const [activities, setActivities] = useState([]);
    const [remove, setremove] = useState('Remove Activity');
    const [count, setcount] = useState(0);
    const loadActivity = async () => {
        const response = await fetch(`${BACKEND_URL}/api/activitydata`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();
        setActivities(json);
    };

    const handleRemoveActivity = async (activity) => {
        if(!confirm(`Are You Sure You Want To Remove Actvity: ${activity.title}?`))
            return;
        setremove('Removing');
        try {
            const response = await fetch(`${BACKEND_URL}/api/deleteactivity`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: activity._id,
                    imgs: activity.imgs
                })
            });

            const json = await response.json();
            if (json['success'])
                alert('Activity Deleted Successfully');
        } catch (error) {
            alert('Try Again');
        } finally {
            setremove('Remove Activity');
            setcount(count + 1);
        }
    };

    useEffect(() => {
        loadActivity();
    }, [count]);

    return (
        <div className="Right" style={{ "flexDirection": "column", "justifyContent": "left" }}>
            <h1>Remove Activity</h1>
            <div className="activity-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Activity Name</th>
                            <th>View</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {activities.map((activity, index) => (
                            <tr key={activity._id}>
                                <td>{index + 1}</td>
                                <td>{activity.title}</td>
                                <td>
                                    <a href={`/activity/${activity._id}`}  target='_blank'>view</a>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleRemoveActivity(activity)}
                                        disabled={remove != 'Remove Activity'}
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default RemoveActivity
