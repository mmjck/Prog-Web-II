import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";





const Header = () => {
    const [logged, setLogged] = useState(false)

    const user = useSelector((state) => state.userData);


    useEffect(() => {
        if (user) {
            setLogged(user.isLogged)

        }
    }, [user])
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/" >Minha loja</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>



                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <Link className="nav-link" to="/sobre">Sobre </Link>
                        <Link className="nav-link" to="/sobre">Meu carrinho </Link>

                        {!logged && <Link className="nav-link" to="/login">Login </Link>}
                        {!logged && <Link className="nav-link" to="/signup">Cadastro </Link>}
                        {logged && <Link className="nav-link" to="/sobre">Sair </Link>}
                    </ul>

                </div>
            </div>
        </nav>
    );
}


export default Header;