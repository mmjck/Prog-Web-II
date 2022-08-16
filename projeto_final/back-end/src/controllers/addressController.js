import { Usuario, Endereco } from '../models';

// const index = (req, res) => {};
const create = async (req, res) => {
  console.log('2e3123213');
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.send('carai');
    }
    console.log(usuario);
    await Endereco.create({ ...req.body, usuarioID: id });

    res.send('criado com sucesso');
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
// const read = (req, res) => {};
// const update = (req, res) => {};
// const remove = (req, res) => {};

export default {
  // index, remove,

  create,
  // , read, update
};
