import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"

import Api from "../../services/api";
import CardProduto from "../../components/Produto";



const Products = () => {
    const [produtos, setProdutos] = useState([]);
    const [searchString, setSearchString] = useState("");
    const [searchProdutos, setSearchProdutos] = useState([]);

    const navigate = useNavigate();

    const getProducts = useCallback(
        async () => {
            try {
                const response = await Api.getProducts();
                setProdutos(response);
                console.log({ response });
            } catch (error) {
                console.log(error);
            }
        },
        []
    );

    useEffect(() => {
        getProducts();

    }, [getProducts]);

    useEffect(() => {
        setSearchProdutos(produtos.filter(prod => prod.nome.toLowerCase().includes(searchString.toLowerCase())))
    }, [produtos, searchString])


    return (
        <div>
            <div>
                <h3 className="float-start">Listagem de Produtos</h3>
                <div className="float-end">
                    <button
                        onClick={() => {
                            navigate("/produto/add")
                        }}
                        className="btn btn-primary"
                    >Criar</button>
                </div>
            </div>

            <input onChange={(e) => setSearchString(e.target.value)} className="form-control mb-3" type="text" value={searchString} />
            <div class="row row-cols-1 row-cols-md-5">

                {searchString === '' && produtos.map(produto => <div className="row" key={produto.id}>
                    <CardProduto produto={produto} />

                </div>)}
            </div>
            <div class="card-group">

                {searchString !== '' && searchProdutos.map(produto => <div className="row" key={produto.id}>

                    <CardProduto produto={produto} />
                </div>)}
            </div>


        </div >

    )
}
export default Products