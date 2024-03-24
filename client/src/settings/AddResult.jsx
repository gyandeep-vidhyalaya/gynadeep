import React, { useState } from 'react';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
const PRESET = import.meta.env.VITE_PRESET;

const AddResult = () => {
  const [imageFile, setImageFile] = useState(null);
  const [standard, setStandard] = useState('');
  const [division, setDivision] = useState('');
  const [year, setYear] = useState('');
  const [create, setcreate] = useState('Create');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setcreate('Creating...');
    try {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('upload_preset', PRESET);
      formData.append('cloud_name', CLOUD_NAME);

      const image_request = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData
      });

      const image_response = await image_request.json();

      const response = await fetch(`${BACKEND_URL}/api/createresult`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          img: image_response['url'],
          standard: standard,
          division: division,
          year: parseInt(year)
        })
      });

      const json = await response.json();
      if (json['success'])
        alert('Result Added Successfully');
      else
        alert('Try Again');
    }catch(error){
      alert('Try Again');
    }finally{
      setcreate('Create');
    }
  };

  const yearOptions = [];
  for (let i = 2018; i <= 2040; i++) {
    yearOptions.push(
      <option key={i} value={i}>{i}</option>
    );
  }

  return (
    <div className="Right" style={{ flexDirection: "column" }}>
      <h1>Add Result</h1>
      <div className="result-container mt-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="image">Upload Result Image:</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageUpload}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="standard">Standard:</label>
            <select
              id="standard"
              value={standard}
              onChange={(e) => setStandard(e.target.value)}
              className="form-select"
              required
            >
              <option value="">Select Standard</option>
              <option value="Nursery">Nursery</option>
              <option value="KG">KG</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="division">Division:</label>
            <select
              id="division"
              value={division}
              onChange={(e) => setDivision(e.target.value)}
              className="form-select"
              required
            >
              <option value="">Select Division</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="year">Year:</label>
            <select
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="form-select"
              required
            >
              <option value="">Select Year</option>
              {yearOptions}
            </select>
          </div>
          <button type="submit" className="btn btn-primary" disabled={create != 'Create'}>{create}</button>
        </form>
      </div>
    </div>
  );
};

export default AddResult;
