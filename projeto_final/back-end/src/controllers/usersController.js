import { v4 as uuidv4 } from 'uuid';
import { StatusCodes } from 'http-status-codes';


const users = [1, 2, 3, 4, 5];


const index = (req, res) => {
    res.send(users);
};

const create = (req, res) => {
    const user = { 
        id: uuidv4(),
        ...req.body()
    }
    users.push(user);
    res.send(StatusCodes.CREATED).send(user);
};

const read = (req, res) => {
    const { id }  = req.params;

    const user = users.filter((u) => u.id == id);

    if(!user) return res.send(StatusCodes.NO_CONTENT).send();
    return res.send(user);
};

const remove = (req , res ) => {
    const {id } =req.params;
    users = users.filter(u => u.id != id);
}

const update = (req , res ) => {
    const { id } = req.params;
    const findUser = user.find(u=> id === id);
    if(!findUser)return res.status(StatusCodes.NO_CONTENT).send();
    const user= {
        id: id,
        ...req.body
    }
    users = users.map(u => (u.id === id) ? user : u)
    res.send(user);
}

export default { index, create, read, remove, update };
