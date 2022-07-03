import { v4 as uuidv4 } from 'uuid';
import { StatusCodes } from 'http-status-codes';


const users = [];

/**
 * @swagger
 * /users:
 *   get:
*     tags: [Users]
 *     description: Get all users
 *     responses:
 *       200:
 *         description: Success
 */
const index = (req, res) => {
    res.send(users);
};

/**
 * @swagger
 * /users:
 *   post:
 *     tags: [Users]
 *     description: Create all users
 *     responses:
 *       200:
 *         description: Success
 */
const create = (req, res) => {
    const user = { 
        id: uuidv4(),
        ...req.body()
    }
    users.push(user);
    res.send(StatusCodes.CREATED).send(user);
};


/**
 * @swagger
 * /users:
 *   post:
 *     tags: [Users]
 *     description: Create all users
 *     responses:
 *       200:
 *         description: Success
 */
const read = (req, res) => {
    const { id }  = req.params;

    const user = users.filter((u) => u.id == id);

    if(!user) return res.send(StatusCodes.NO_CONTENT).send();
    return res.send(user);
};


/**
 * @swagger
 * /users:
 *   post:
 *     tags: [Users]
 *     description: Create all users
 *     responses:
 *       200:
 *         description: Success
 */
const remove = (req , res ) => {
    const {id } =req.params;
    users = users.filter(u => u.id != id);
}


/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags: [Users]
 *     description: Delete user by id
 *     parameters:
 *      - name: "id"
 *        in: "path"
 *        description: "ID of user to return"
 *        required: true
 *        type: "integer"
 *        format: "int64"
 *     responses:
 *       200:
 *         description: Success
 */
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
