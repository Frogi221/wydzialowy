import React, {useState} from "react";
import { Link, useNavigate } from 'react-router-dom'
import Validation from './SignupValidation';
import axios from 'axios'

function Signup(){
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    })
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }
    const handleSubmit =(event) => {
        event.preventDefault();
        const err = (Validation(values));
        setErrors(err);
        if(errors.name === "" && errors.email === "" && errors.password === "") {
            axios.post('http://localhost:8081/signup', values)
            .then(response => {
                console.log(response.data)
                navigate('/Login')
            })
            .catch(err => console.log(err));
        }
    }
    return (
        <div className='background-image d-flex justify-content-center align-items-center bg-primary vh-100 '>
            <div className='login-pop p-3 rounded w-30 login-text'>
            <h2>Zarejestruj się</h2>
            <form action="" onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="Name"><strong>Pseudonim</strong></label>
                    <input type="text" placeholder='Wprowadź pseudonim' name='name'
                    onChange={handleInput} className='form-control rounded-0'/>
                    {errors.email && <span className='text-danger'> {errors.name}</span>}

                </div>
                <div className='mb-3'>
                    <label htmlFor="email"><strong>Email</strong></label>
                    <input type="email" placeholder='Wprowadź Email' name='email' 
                    onChange={handleInput} className='form-control rounded-0'/>
                    {errors.email && <span className='text-danger'> {errors.email}</span>}
                </div>
                <div className='mb-3'>
                <label htmlFor="password"><strong>Hasło</strong></label>
                        <input type="password" placeholder='Wprowadź hasło' name='password'
                        onChange={handleInput} className='form-control rounded-0'/>
                        {errors.password && <span className='text-danger'> {errors.password}</span>}
                </div>
                <button type='submit' className='btn btn-success w-100'>Zarejestruj się</button>
                <p>Zgadzasz się z naszymi warunkami i zasadami strony.</p>
                <Link to="/Login" className='btn btn-default border w-100 bg-light rounded-0'>Masz konto? Zaloguj się tutaj.</Link>
            </form>
        </div>
    </div>
    )
}

export default Signup