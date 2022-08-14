import { Link } from "react-router-dom";



const Header = ({ user }) => {


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
                        <Link className="nav-link" to="/sobre">Login </Link>
                        <Link className="nav-link" to="/sobre">Cadastro </Link>
                        <Link className="nav-link" to="/sobre">Sair </Link>


                    </ul>

                </div>
            </div>
        </nav>
    );
}


export default Header;