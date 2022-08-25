import { Usuario, Endereco } from '../models';

const listAddress = async (req, res) => {
  const { id } = req.params;
  try {
    const listEnredecos = await Endereco.findAll({
      where: {
        usuarioID: id,
      },
    });

    if (!listEnredecos) {
      return res.send([]);
    }
    console.log(listEnredecos);

    res.send(listEnredecos);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const create = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.send({
        message: 'Usuario nao existe',
      });
    }
    await Endereco.create({ ...req.body, usuarioID: id });

    return res.send({
      message: 'Endereço cadastrado com sucesso',
    });
  } catch (error) {
    res.send(error);
  }
};

const read = async (req, res) => {
  const { id } = req.params;

  try {
    const endereco = await Endereco.findByPk(id);

    if (!endereco) {
      return res.send({});
    }
    res.send(endereco);
  } catch (error) {
    res.send(error);
  }
};
const update = async (req, res) => {
  const { id } = req.params;

  try {
    await Endereco.update(req.body, {
      where: {
        id,
      },
    });

    return res.send({
      message: 'Endereço atualizado com sucesso',
    });
  } catch (error) {
    res.send(error);
  }
};
const remove = async (req, res) => {
  const { id } = req.params;

  try {
    await Endereco.destroy({
      where: {
        id,
      },
    });

    return res.send({
      message: 'Endereço deletado com sucesso',
    });
  } catch (error) {
    res.send(error);
  }
};

export default {
  listAddress,
  remove,

  create,
  read,
  update,
};
