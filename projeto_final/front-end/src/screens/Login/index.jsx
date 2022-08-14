import { useState } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"

import React from 'react';
import { changeUser } from "../../redux/actions/userAction";
import Api from "../../services/api";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoadinng] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await Api.login({ email, senha: password });

            console.log(response.usuario);
            setLoadinng(false)
            dispatch(changeUser(response.usuario));
            navigate(`/`)

        } catch (error) {
            console.log(error);
        } finally {
            setLoadinng(false)
        }
    }

    return (
        <section className="vh-100" style={{
            "background-color": "#508bfc"
        }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card shadow-2-strong" style={{ "border-radius": "1rem;" }}>
                            <div className="card-body p-5 text-center">

                                <h3 className="mb-5">Sign in</h3>
                                <form onSubmit={handleSubmit}>

                                    <div className="form-outline mb-4">
                                        <label className="form-label" for="typeEmailX-2">Email</label>
                                        <input
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            id="email"
                                            type="email"
                                            className="form-control form-control-lg" />

                                    </div>

                                    <div className="form-outline mb-4">
                                        <label className="form-label" for="typePasswordX-2">Password</label>
                                        <input
                                            required
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            id="password"
                                            className="form-control form-control-lg" />
                                    </div>
                                    <hr className="my-4" />
                                    {!loading ? (

                                        <button className="btn btn-primary btn-block" type="submit">Login</button>) : (
                                        <div class="spinner-border" role="status" />
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
    // return (
    //     <div>
    //         <h3>Login</h3>
    //         <form onSubmit={handleSubmit}>
    //             <label htmlFor="nome">Nome</label>
    //             <input
    //                 type="text"
    //                 required
    //                 value={email}
    //                 onChange={(e) => setEmail(e.target.value)}
    //                 id="nome"
    //                 className="form-control" />

    //             <label htmlFor="descricao">Descrição</label>
    //             <textarea
    //                 required
    //                 value={password}
    //                 onChange={(e) => setPassword(e.target.value)}
    //                 id="descricao"
    //                 className="form-control" />


    //             {!loading ? (
    //                 <button className="btn btn-primary mt-3" type="submit">Cadastrar</button>) : (<div className="spinner-border" role="status">
    //                 </div>)}

    //         </form>


    //     </div >

    // );
}


export default Login;