import { Usuario, TipoUsuario, Endereco } from '../models';
import { Op } from 'sequelize';
import { genSalt, hash } from 'bcryptjs';
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
      limit: size,
      offset: (page - 1) * size,
      attributes: { exclude: ['senha'] },
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
    console.log(req.body);

    const { senha, nome, tipoUsuarioId, email } = req.body;
    const salt = await genSalt(parseInt(process.env.BCRYPTJS_ROUNDS));
    const password = await hash(senha, salt);

    await Usuario.create({ nome, tipoUsuarioId, email, senha: password });

    const user = await Usuario.findOne({
      where: { email: email },
      attributes: { exclude: ['senha'] },
    });

    res.json(user);
  } catch (error) {
    console.log(error);
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
    console.log(id);
    const usuario = await Usuario.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: Endereco,
          required: false,
          where: {
            usuarioID: id,
          },
        },
        {
          model: TipoUsuario,
        },
      ],
    });

    console.log(usuario);
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
    res.json({ msg: 'Usuario removido' });
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

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [Users]
 *     description: List all collaborators from shop
 *     responses:
 *       200:
 *         description: Success
 */
const listAllCollaborators = async (req, res) => {
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const size = req.query.size ? parseInt(req.query.size) : 10;
  const chefe = req.params.id;
  try {
    const produtos = await Usuario.findAll({
      limit: size,
      offset: (page - 1) * size,
      where: {
        tipoUsuarioId: 2,
        id: {
          [Op.ne]: chefe,
        },
      },
      attributes: { exclude: ['senha'] },
    });
    res.json(produtos);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default { index, create, read, remove, update, listAllCollaborators };
