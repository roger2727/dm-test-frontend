import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "./Nav";
import SearchRecipes from "./SearchRecipes";
import "./AddImage.css";
const AddImage = () => {
  const [selectedImage, setSelectedImage] = useState();

  const navigate = useNavigate();
  let { recipeId } = useParams();

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!localStorage.getItem("token")) return;
      const formData = new FormData();
      formData.append("image", selectedImage);
      const response = await fetch(
        `https://dm-backend-test-production.up.railway.app/recipes/upload-image/${recipeId}?width=300`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.ok) {
        navigate(`/${recipeId}`);
      } else {
        const error = await response.json();
        console.error(error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Nav />
      <SearchRecipes />
      <div className="upload-box">
        <p>please upload a image for your recipe</p>
        <input className="file" type="file" onChange={handleImageChange} />
        <button className="upload-btn" onClick={handleUpload}>
          Upload
        </button>
      </div>
    </div>
  );
};

export default AddImage;
