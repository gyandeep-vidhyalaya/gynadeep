import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import TeacherCard from '../components/TeacherCard';
import './styles/Home.css';
import './styles/AboutUs.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const AboutUS = () => {
  const [teacherData, setTeacherData] = useState([]);
  const [reveal, setReveal] = useState(false);

  const loadTeacherData = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/teachersdata`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      let ob = {
        'Principal': [],
        'HOD': [],
        'Teacher': [],
      };
      for (const teacher of data)
        ob[teacher['jobrole']].push(teacher);
      let final_data = [];
      for (const key in ob)
        final_data.push([key, ob[key]]);
      setTeacherData(final_data);
    } catch (error) {
      console.error("Error fetching teacher data:", error);
    }
  };

  useEffect(() => {
    loadTeacherData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const cardElements = document.querySelectorAll('.teacher-card');
      cardElements.forEach((element) => {
        if (scrollPosition > element.offsetTop) {
          element.classList.add('reveal');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div id='HomeScreen'>
      <Navbar />
      <div className='view-body'>
        {teacherData.length > 0 ? (
          teacherData.map((teacherList, index) => {
            return (
              <div key={index} style={{ "width": "90%" }}>
                {
                  teacherList[1].length > 0 ?
                    <>
                      <h2 className='job-title'>{teacherList[0]}s</h2>
                      <hr />
                      <div className="teacher-list">
                        {teacherList[1].map((teacher, index) => {
                          return (
                            <TeacherCard
                              key={teacher._id}
                              img={teacher.img}
                              number={teacher.number}
                              name={teacher.name}
                              subjects={teacher.subjects}
                              reveal={reveal}
                            />
                          );
                        })}
                      </div>
                    </> : ""
                }
              </div>
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default AboutUS;
