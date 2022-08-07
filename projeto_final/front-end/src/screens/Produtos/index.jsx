import { useState, useEffect, useCallback } from "react"

import Api from "../../services/api";

const Products = () => {
    const [produtos, setProdutos] = useState(null);
    

    const getProducts = useCallback(
        async () => {
            try {
                const response = await Api.getProducts();
                setProdutos(response);
                console.log({response});
            } catch (error) {
                console.log(error);
            }
        },
        []
    );

    useEffect(() => {
        console.log("asdasd");
        getProducts();
    
    }, [getProducts]);

return <h1>aols</h1>

    return (
        <ul>
            {produtos && produtos.map((prod) =>
                <li key={prod.id}>{prod.nome}</li>
            )}
        </ul>
    )
}
export default Products