import React, { useState } from 'react';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;

const AddActivity = () => {
  const [activityTitle, setActivityTitle] = useState('');
  const [numImages, setNumImages] = useState(0);
  const [imageFiles, setImageFiles] = useState({});
  const [activityDescription, setActivityDescription] = useState('');
  const [create, setcreate] = useState('Create Activity');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'activityTitle') {
      setActivityTitle(value);
    } else if (name === 'numImages') {
      setNumImages(parseInt(value));
      setImageFiles({...imageFiles, [`image${parseInt(value)+1}`]:null});
    } else if (name === 'activityDescription') {
      setActivityDescription(value);
    }
  };

  const handleImageUpload =(event) => {
    const file = event.target.files[0];
    setImageFiles({...imageFiles, [event.target.id]:file});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setcreate("Creating...");
    try {
      let imgs = [];

      for(const key in imageFiles) {
        const formData = new FormData();
        if(imageFiles[key] === null)
          continue;
        formData.append('file', imageFiles[key]);
        formData.append('upload_preset', 'ksfbel3d');
        formData.append('cloud_name', CLOUD_NAME);

        const image_request = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
          method: "POST",
          body: formData
        });

        const image_response = await image_request.json();
        imgs.push(image_response['url']);
      }

      
      const response = await fetch(`${BACKEND_URL}/api/createactivity`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: activityTitle,
          description: activityDescription,
          imgs: imgs
        })
      });

      const json = await response.json();
      if (json['success'])
        alert('Activity Added Successfully');
      else
        alert("Something Went Wrong Try Again");
    } catch (error) {
      alert("Something Went Wrong Try Again");
    }finally{
      setcreate('Create Activity');
    }
  };

  return (
    <div className="Right" style={{ "justifyContent": "center" }}>
      <form onSubmit={handleSubmit} style={{ "width": "100%" }}>
        <div className="form-group mb-3">
          <label htmlFor="activityTitle">Activity Title:</label>
          <input
            type="text"
            id="activityTitle"
            name="activityTitle"
            value={activityTitle}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Enter activity title"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="numImages">Number of Images to Upload:</label>
          <input
            type="number"
            id="numImages"
            name="numImages"
            value={numImages}
            onChange={handleInputChange}
            className="form-control"
            min="0"
            placeholder="Enter number of images"
            required
          />
        </div>
        <div className="form-group mb-3">
          {Array.from({ length: numImages }, (_, index) => (
            <div key={index} className="mb-3">
              <label htmlFor={`image${index + 1}`}>Image {index + 1}:</label>
              <input
                type="file"
                id={`image${index + 1}`}
                name={`image${index + 1}`}
                onChange={handleImageUpload}
                className="form-control"
                required
              />
            </div>
          ))}
        </div>
        <div className="form-group mb-3">
          <label htmlFor="activityDescription">Activity Description:</label>
          <textarea
            id="activityDescription"
            name="activityDescription"
            value={activityDescription}
            onChange={handleInputChange}
            className="form-control"
            rows="3"
            placeholder="Enter activity description"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={create != 'Create Activity'}>{create}</button>
      </form>
    </div>
  );
};

export default AddActivity;
