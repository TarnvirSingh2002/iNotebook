import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signup(props) {
  const {takeAlert}= props;

  const history= useNavigate();

  const [credentials, setcredentials]=useState({name:"", email:"", password:"", cpassword:""});

    const handleSubmit=async(e)=>{
      const {name, email, password, cpassword}= credentials;
      e.preventDefault();// it is used so that our page will not reload
      const response= await fetch(`http://localhost:5000/api/auth/binga`,{
        method:"POST",
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({name, email, password})
      });
      const json = await response.json();
      if(json.success){
        history("/Home");
        takeAlert("Successfully added!", "Success");
      }
      else if (name.length<3) {
        takeAlert("Your name is too small","Danger");
      }
      else if (password.length<5) {
        takeAlert("Add some more characters in your password!","Danger");
      }
      else if(password!==cpassword){
        takeAlert("Your confirmation password is different!", "Danger");
      }
      else{
        takeAlert("Sorry a user with this email already exists!","Danger");
      }
        
  }
  const onchange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <div className='container mt-5'>
      <h2 className='text-center'>Create an account to use iNotebook</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" name="name" onChange={onchange} id="name" aria-describedby="emailHelp"/>
          </div> 
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" name="email" onChange={onchange} id="email" aria-describedby="emailHelp"/>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" name="password" onChange={onchange} id="password"/>
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" name="cpassword" onChange={onchange} id="cpassword"/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
