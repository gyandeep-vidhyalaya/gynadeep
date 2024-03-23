import React, { useState } from 'react'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
import './styles/AddTeachers.css'

const AddTeachers = () => {
  const [image, setImage] = useState(null);
  const [create, setcreate] = useState('Create');

  const subject_list = ['Maths', 'English', 'Gujarati', 'Science', 'Social Science', 'Hindi', 'Sanskrit', 'Computer', 'P.T.'];

  const [teacherData, setTeacherData] = useState({
    name: '',
    jobRole: 'Teacher',
    subjects: [],
    number: ''
  });

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeacherData({ ...teacherData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    if (checked) {
      setTeacherData({
        ...teacherData,
        subjects: [...teacherData.subjects, id]
      });
    } else {
      setTeacherData({
        ...teacherData,
        subjects: teacherData.subjects.filter((subject) => subject !== id)
      });
    }
  };
  const handleCreateTeacher = async (e) => {
    e.preventDefault();
    setcreate('Creating...');

    if (image === null) {
      alert("Please Choose an Image");
      setcreate('Create');
      return;
    }

    if (teacherData.name.length < 5) {
      if (teacherData.name.length == 0) {
        alert("Name cannot be Empty");
      } else {
        alert("Name should Contain At-Least 5 characters.")
      }
      setcreate('Create');
      return;
    }

    if (teacherData.number === '')
      teacherData.number = '0';
    if (teacherData.number !== '0' && teacherData.number.length != 10) {
      alert("Enter Valid Mobile Number");
      setcreate('Create');
      return;
    }

    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'ksfbel3d');
    formData.append('cloud_name', CLOUD_NAME);

    const image_request = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: formData
    });

    const image_response = await image_request.json();
    teacherData['img'] = image_response['url'];

    const teacherRequest = await fetch(`${BACKEND_URL}/api/createteacher`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(teacherData)
    });

    const teacherResponse = await teacherRequest.json();
    if (teacherResponse['success'])
      alert("Teacher Account Created Successfully");
    else
      alert("Something went Wrong Try Again");
      setcreate('Create');

  };


  return (
    <div className="Right">
      <div>
        <h2 style={{ height: '30px' }}>Create Data for a Teacher</h2>
      </div>
      <form
        className="teacher-form"
        style={{ width: '100%' }}
        onSubmit={handleCreateTeacher}
      >
        <div className="form-group">
          <div>
            <label htmlFor="profile-pic">Profile Photo</label>
          </div>
          <input
            onChange={handleImageChange}
            type="file"
            id="profile-pic"
            accept="images/*"
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            className="form-control"
            id="name"
            name="name"
            value={teacherData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="job-role">Job Role</label>
          <select
            className="form-control"
            id="jobRole"
            name="jobRole"
            value={teacherData.jobRole}
            onChange={handleInputChange}
          >
            <option value="Principal">Principal</option>
            <option value="HOD">HOD</option>
            <option value="Teacher">Teacher</option>
          </select>
        </div>
        <div>
          Subjects:
          <div className="subjects">
            {subject_list.map((value) => {
              return (
                <div className="form-check" key={value}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={value}
                    name={value}
                    checked={teacherData.subjects.includes(value)}
                    onChange={handleCheckboxChange}
                  />
                  <label className="form-check-label" htmlFor={value}>
                    {value}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="number">Number</label>
          <input
            className="form-control"
            id="number"
            name="number"
            value={teacherData.number}
            onChange={handleInputChange}
          />
        </div>
        <button
          className="btn bg-success navtext"
          style={{
            height: '40px',
            marginTop: '30px',
            width: '100px',
            textAlign: 'center',
            margin: 'auto'
          }}
          disabled = {create != 'Create'}
          type="submit"
        >
          {create}
        </button>
      </form>
    </div>
  )
}

export default AddTeachers
