import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import { useForm } from '../../hooks/useForm';
import { startLogin, startRegister } from '../../actions/auth';
import './login.css';

export const LoginScreen = () => {

    const dispatch = useDispatch();

    const [ formLoginValues, handleLoginInputChange ] = useForm({
        lEmail: '',
        lPassword: ''
    });

    const [ formRegisterValues, handleRegisterInputChange ] = useForm({
        rName: '',
        rEmail: '',
        rPassword1: '',
        rPassword2: '',
    });

    
    const  { lEmail, lPassword } = formLoginValues;
    const  { rName, rEmail, rPassword1, rPassword2 } = formRegisterValues;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch( startLogin(lEmail, lPassword) );       
    }

    
    const handleRegister = (e) => {
        e.preventDefault();
        if (rPassword1 !== rPassword2 ) {
            return Swal.fire('Error', 'Passwords must match');
        } else {
            dispatch( startRegister(rEmail, rPassword1, rName ) );       
        }

    }



    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit = { handleLogin } >
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name = "lEmail"
                                onChange = { handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contrase??a"
                                name = "lPassword"
                                onChange = { handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit = { handleRegister } >
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name = "rName"
                                onChange = { handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name = "rEmail"
                                onChange = { handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contrase??a"
                                name = "rPassword1"
                                onChange = { handleRegisterInputChange } 
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contrase??a"
                                name = "rPassword2"
                                onChange = { handleRegisterInputChange } 
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}