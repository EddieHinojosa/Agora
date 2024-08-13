import React from "react";
import { useNavigate } from "react-router-dom";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <button onClick={handleBackClick} className="flex items-center text-2xl">
      <BsFillArrowLeftSquareFill className="mr-2" />
    </button>
  );
};

export default BackButton;
