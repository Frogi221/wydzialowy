import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './LoginValidation'
import axios from 'axios'
import './App.css'; 

function Login() {
        const [values, setValues] = useState({
            email: '',
            password: ''
        })
        const navigate = useNavigate();
        const [errors, setErrors] = useState({})
        axios.defaults.withCredentials = true;
        const [backendError,setBackendError] = useState({})
        const handleInput = (event) => {
            setValues(prev => ({ ...prev, [event.target.name]: event.target.value }))

        }
        const handleSubmit =(event) => {
            event.preventDefault();
            const err = (Validation(values));
            setErrors(err);
            if(err.email === "" && err.password === "") {
                console.log("Sending POST request to server");
                axios.post('http://localhost:8081/login', values)
                .then(response => {
                    console.log("Po .then()");
                  if (response.data === "Success") {
                    console.log(response.data);
                    console.log("Przed przekierowaniem");
                    navigate('/Glowna');
                    console.log("Po przekierowaniu");
                  } else if (response.data === "Failed") {
                    alert("No record existed");
                    console.log(response.data);
                  } else {
                    console.log("Unexpected response:", response.data);
                  }
                })
                .catch(err => console.log(err));
              
            }
        }   
    return (
        <div className='background-image d-flex justify-content-center align-items-center bg-primary vh-100 '>
            <div className='login-pop p-3 rounded w-30 login-text'>
                <h2>Zaloguj się</h2>
                <form action="" onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder='Wprowadź e-mail' name='email'
                        onChange={handleInput} className='form-control rounded-0'/>
                        {errors.email && <span className='text-danger'> {errors.email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Hasło</strong></label>
                        <input type="password" placeholder='Wprowadź hasło' name='password'
                        onChange={handleInput} className='form-control rounded-0'/>
                        {errors.password && <span className='text-danger'> {errors.password}</span>}

                    </div>
                    <button  type='submit' className='btn btn-success w-100'>Zaloguj się</button>
                    <p>Zgadzasz się z naszymi warunkami i zasadami strony</p>
                    <Link to="/signup" className='btn btn-default border w-100 bg-light rounded-0'>Utwórz konto</Link>
                </form>
            </div>
        </div>
    )
}

export default Login