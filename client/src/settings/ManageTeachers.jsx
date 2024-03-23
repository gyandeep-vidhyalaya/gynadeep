import React, { useEffect, useState } from 'react'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import TeacherCard from './components/TeacherCard'

const ManageTeachers = ({func, teacher}) => {
    const [teacherData, setteacherData] = useState([]);
    const [count, setcount] = useState(0);
    const loadTeacherData = async () => {
        const response = await fetch(`${BACKEND_URL}/api/teachersdata`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const json = await response.json();
        setteacherData(json);
    };

    const handleTeacherCardClick = (e) => {
        func('edit-teachers');
        teacher(e);
    }

    useEffect(() => {
        loadTeacherData();
    }, [count]);

    return (
        <div className='Right' style={{ "justifyContent": "left" }}>
            {

                teacherData.length ?
                    teacherData.map((val) => {
                        return (
                            <TeacherCard teacher={val} count={count} setcount={setcount} onClick={handleTeacherCardClick} key={val._id} />
                        )
                    })
                    : "Loading..."
            }

        </div>
    )
}

export default ManageTeachers
