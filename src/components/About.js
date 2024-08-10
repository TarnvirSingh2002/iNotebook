import React, { useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
function About() {
  // const history = useNavigate();
  // useEffect(() => {
  //   if(localStorage.getItem('token')){
  //   }
  //   else{
  //     history('/Login');
  //   }
  // }, [])

  if(window.localStorage.getItem('token')){
    }
    else{
      return <Navigate to='/Login'/>
    }

  return (
    <div>
      <h1>Welcome to About page</h1>
    </div>
  )
}
export default About