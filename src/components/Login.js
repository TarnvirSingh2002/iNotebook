import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
export default function Login(props) {

  const [credentials, setcredentials]=useState({email:"", password:""});
  const onchange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  }
  let history= useNavigate();
  const {takeAlert}=props;

  const handleSubmit=async(e)=>{
    e.preventDefault();// it is used so that our page will not reload
    const response= await fetch(`http://localhost:5000/api/auth/login`,{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify({email:credentials.email, password:credentials.password})
    });
    const json = await response.json();
    console.log(json);
    if(json.success){

      //Save the auth token and redirect
      localStorage.setItem("token",json.autherToken);
      takeAlert('Successfully Logged In!', 'Success');
      history("/Home");
    }
    else{
      takeAlert('Invalid Credentials!', 'Danger');
    }
  }
  return (
    <div className='mt-5'>
      <h2 className='text-center'>Login to continue with iNotebook</h2>
      <form className='mt-2' onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" onChange={onchange} value={credentials.email} id="email" name="email" aria-describedby="emailHelp"/>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" name="password" onChange={onchange} value={credentials.password} id="password"/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
