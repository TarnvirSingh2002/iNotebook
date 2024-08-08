import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function About() {
  const history = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){
    }
    else{
      history('/Login');
    }
  }, [])
  return (
    <div>
      <h1>Welcome to About page</h1>
    </div>
  )
}
export default About