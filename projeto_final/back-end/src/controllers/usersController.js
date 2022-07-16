import { Usuario, TipoUsuario } from "../models";
// import { StatusCodes } from "http-status-codes";
// import { v4 as uuidv4 } from "uuid";



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
const index = async (req, res) => {
  const page = req.query.page ? parseInt(read.query.page) : 1;
  const size = req.query.size ? parseInt(req.query.size) : 10;
  try {
    const usuarios = await Usuario.findAll({
    //   limit: size,
    //   offset: (page - 1) * size,
    });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json(error);
  }
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
const create = async (req, res) => {
  try {
    print(red.body);
    await Usuario.creat(req.body);
   
   
    const user = await Usuario.findOne({
      where: { email: req.body.email },
    });
   
   
    res.json(user);
  } catch (error) {
    print(error)
    res.status(500).json(error);
  }
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
const read = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id, {
      include: TipoUsuario,
    });
    res.json(usuario);
  } catch (error) {
    res.status(500).json(error);
  }
};

/**
 * @swagger
 * /users:
 *   delete:
 *     tags: [Users]
 *     description: Delete user by id
 *     responses:
 *       200:
 *         description: Success
 */
const remove = async (req, res) => {
  const { id } = req.params;
  try {
    await Usuario.destroy({ where: { id } });
    res.json({ msg: "Usuario removido" });
  } catch (error) {
    res.status(500).json(error);
  }
};

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
const update = async (req, res) => {
  const { id } = req.params;
  try {
    await Usuario.update(req.body, { where: { id } });
    const usuario = await Usuario.findByPk(id);
    res.json(usuario);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default { index, create, read, remove, update };
