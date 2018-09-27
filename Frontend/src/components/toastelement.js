import React from 'react';
import { ToastContainer, toast } from "react-toastify";

const ToastElement = () =>{
	return(
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnVisibilityChange
      draggable
      pauseOnHover
    />
	);
};

export default ToastElement;
