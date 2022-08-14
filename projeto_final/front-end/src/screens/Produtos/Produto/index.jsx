import { useEffect, useCallback, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Api from "../../../services/api";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'


const Produto = () => {
    const navigate = useNavigate();

    const [produto, setProduto] = useState({});
    const { id } = useParams();
    const getProducts = useCallback(
        async () => {
            try {
                const response = await Api.getProductById(id);
                setProduto(response);
                console.log({ response });
            } catch (error) {
                console.log(error);
            }
        },
        [id]
    );
    useEffect(() => {
        getProducts();

    }, [getProducts]);


    const handleEdit = () => {
        navigate(`/produto/${id}/edit`)
    }
    const handleDelete = async () => {
        try {
            await Api.deleteProdut(id)
            navigate(`/`)
        } catch (error) {
        }
    }
    return (
        <div>
            <div >
                <h3 className="float-start">{produto.nome}</h3>
                <div className="float-end">
                    <button
                        onClick={handleEdit}
                        className="btn btn-primary mx-3"
                    >

                        <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                    </button>

                    <button
                        onClick={handleDelete}
                        className="btn btn-danger mx-3"
                    >
                        <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                    </button>
                </div>
            </div>

            <p>{produto.descricao}</p>
        </div>
    )
}

export default Produto