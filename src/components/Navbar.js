import React, {useEffect} from 'react'
import {Link, useLocation} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
function Navbar() {
    let location=useLocation();
    useEffect(()=>{
    },[location]);

    let history = useNavigate()
    const handlelogout= ()=>{
        localStorage.removeItem('token');
        history('/Login');
    }
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">iNotebook</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <Link className={`nav-link ${location.pathname==='/Home'?"active":""}`} aria-current="page" to="/Home">Home</Link>
                </li>
                <li className="nav-item">
                <Link className={`nav-link ${location.pathname==='/About'?"active":""}`} aria-current="page" to="/About">About</Link>
                </li>
            </ul>
        {!localStorage.getItem('token')?<form className="d-flex">
            <Link className='btn btn-success mx-1' to="/Login" role='button'>Login</Link>
            <Link className='btn btn-success mx-1' to="/Signup" role='button'>Sign up</Link>
        </form>:<button className='btn btn-primary' onClick={handlelogout} >Log out</button> }
        </div>
        </div>
        </nav>
    </div>
  )
}

export default Navbar