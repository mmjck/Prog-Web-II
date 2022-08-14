import { useState, useCallback, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Api from "../../../services/api";



const EditarProduto = () => {

    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [preco, setPreco] = useState(0)
    const [estoque, setEstoque] = useState(10)
    const [loading, setLoadinng] = useState(false)


    const [errorNome, setErrorNome] = useState("")
    const [hasError, setHasError] = useState(false)

    const navigate = useNavigate();

    const { id } = useParams();

    const getProducts = useCallback(
        async () => {
            try {
                const response = await Api.getProductById(id);
                console.log({ response });

                setNome(response.nome)
                setDescricao(response.descricao)
                setPreco(response.preco)
                setEstoque(response.estoque)


            } catch (error) {
                console.log(error);
            }
        },
        [id]
    );
    useEffect(() => {
        getProducts();

    }, [getProducts]);


    const handleSubmit = async (e) => {
        const produto = { nome, descricao, preco, estoque }
        e.preventDefault()
        setLoadinng(true)
        setHasError(false)

        try {
            const response = await Api.updateProdut(produto, id);

            navigate(`/produto/${response.id}`)
            console.log(response);
        } catch (error) {
            console.log(error);
            setHasError(true)
            if (error.response.data.errors) {
                error.response.data.errors.forEach(element => {
                    if (element.path === "nome") {
                        setErrorNome(element.message)
                    }
                    console.log(element);
                });
            }
            console.log(error.response.data.errors);
        }
        finally {
            setLoadinng(false)
        }
    }

    return (
        <div>
            <h3>Editar Produto</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="nome">Nome</label>
                <input
                    type="text"
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    id="nome"
                    className="form-control" />

                {hasError && (
                    <div class="invalid-feedback" style={{ display: "block" }}>
                        {errorNome}
                    </div>
                )}
                <label htmlFor="descricao">Descrição</label>
                <textarea
                    required
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    id="descricao"
                    className="form-control" />

                <label htmlFor="preco">Preço</label>
                <input
                    required
                    type="number"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                    id="preco"
                    className="form-control" />

                {hasError && (
                    <div class="invalid-feedback" style={{ display: "block" }}>
                        {errorNome}
                    </div>
                )}
                <label htmlFor="estoque">Estoque</label>
                <select
                    required
                    value={estoque}
                    onChange={(e) => setEstoque(e.target.value)}
                    id="estoque"
                    className="form-control">
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                </select>




                {!loading ? (
                    <button className="btn btn-primary mt-3" type="submit">Atualizar</button>) :
                    (<div class="spinner-border" role="status" />)}

            </form>


        </div >



    )
}

export default EditarProduto;