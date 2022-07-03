import { v4 as uuidv4 } from 'uuid';
import { StatusCodes } from 'http-status-codes';


const products = [];


const index = (req, res) => {
    res.send(products);
};

const create = (req, res) => {
    const product = { 
        id: uuidv4(),
        ...req.body()
    }
    products.push(product);
    res.send(StatusCodes.CREATED).send(product);
};

const read = (req, res) => {
    const { id }  = req.params;

    const product = products.filter((u) => u.id == id);

    if(!product) return res.send(StatusCodes.NO_CONTENT).send();
    return res.send(product);
};

const remove = (req , res ) => {
    const {id } = req.params;
    products = products.filter(u => u.id != id);
}

const update = (req , res ) => {
    const { id } = req.params;
    const findProduct = products.find(u=> id === id);
   
   
    if(!findProduct)return res.status(StatusCodes.NO_CONTENT).send();
   
    const product = {
        id: id,
        ...req.body
    }
    products = products.map(u => (u.id === id) ? product : u)
    res.send(products);
}

export default { index, create, read, remove, update };
