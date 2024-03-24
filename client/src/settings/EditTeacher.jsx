import React, { useState } from 'react'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
const PRESET = import.meta.env.VITE_PRESET;
import './styles/EditTeacher.css'
const EditTeacher = ({ func, teacher }) => {
    const subject_list = ['Maths', 'English', 'Gujarati', 'Science', 'Social Science', 'Hindi', 'Sanskrit', 'Computer', 'P.T.'];
    const [image, setImage] = useState(null);
    const [save, setsave] = useState('Save Changes');
    const [teacherData, setTeacherData] = useState({
        id: teacher._id,
        name: teacher.name,
        jobRole: teacher.jobrole,
        subjects: teacher.subjects,
        number: teacher.number
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
    const handleSave = async (e) => {
        e.preventDefault();
        setsave('Saving...');
        if (teacherData.name.length < 5) {
            if (teacherData.name.length == 0) {
                alert("Name cannot be Empty");
            } else {
                alert("Name should Contain At-Least 5 characters.")
            }
            setsave('Save Changes');
            return;
        }

        if (teacherData.subjects.length == 0) {
            alert("Select At least One Subject");
            setsave('Save Changes');
            return;
        }
        if (String(teacherData.number).length != 10 && teacherData.number != 0) {
            alert("Enter Valid Mobile Number");
            setsave('Save Changes');
            return;
        }


        if (image !== null) {
            const deleteResponse = await fetch(`${BACKEND_URL}/api/deleteimage`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ img: teacher.img })
            });

            const deleteJson = await deleteResponse.json();
            if (!deleteJson['success']) {
                alert("Try Again");
                setsave('Save Changes');
                return;
            }

            const formData = new FormData();
            formData.append('file', image);
            formData.append('upload_preset', PRESET);
            formData.append('cloud_name', CLOUD_NAME);

            const image_request = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
                method: "POST",
                body: formData
            });

            const image_response = await image_request.json();
            teacherData['img'] = image_response['url'];
        }
        const response = await fetch(`${BACKEND_URL}/api/updateteacher`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(teacherData)
        });

        const json = await response.json();
        if(json['success'])
            alert('Changes Saved Successfully');
        else
            alert('Try Again');
        setsave('Save Changes');
        func('manage-teachers');
    };

    const handleCancel = () => {
        func('manage-teachers');
    };
    return (
        <div className="Right">
            <div>
                <h2 style={{ height: '30px' }}>{teacher.name}'s Details</h2>
            </div>
            <form
                className="teacher-form"
                style={{ width: '100%' }}
                onSubmit={handleSave}
            >
                <div style={{ "display": "flex", "justifyContent": "center", "padding":"0px" }} className='edit-profile-pic'>
                    <img src={teacher.img} style={{ "height": "250px", "margin": "30px" }} alt="" />
                </div>
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
                <div className="edit-buttons" style={{ "display": "flex" }}>

                    <button
                        className="btn bg-success navtext"
                        style={{
                            height: '40px',
                            marginTop: '30px',
                            width: '150px',
                            margin: 'auto'
                        }}
                        disabled = {save != 'Save Changes'}
                        type="submit"
                    >
                        {save}
                    </button>
                    <button
                        className="btn bg-danger navtext"
                        style={{
                            height: '40px',
                            marginTop: '30px',
                            width: '80px',
                            margin: 'auto'
                        }}
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditTeacher
