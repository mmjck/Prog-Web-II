import { Link } from "react-router-dom"


const CardProduto = ({ produto }) => {
    const { id, nome, descricao, preco, estoque } = produto;
    return (

        <div className="card border-secondary text-dark bg-light mb-3" style={{ "width": '18rem' }}>
            <div className="card-body">
                <h5 className="card-title">{nome}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{descricao}</h6>
                <div className="row">
                    <p> Preço R$ {preco}</p>
                    <p>Quantidade {estoque}</p>
                </div>
                <Link className="btn btn-primary" to={`/produto/${id}`}>Ver mais</Link>
            </div>
        </div >



    );
}

export default CardProduto;