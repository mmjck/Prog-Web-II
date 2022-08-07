import { Produto } from "../models";

const index = async (req, res) => {
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const size = req.query.size ? parseInt(req.query.size) : 10;
  try {
    const produtos = await Produto.findAll({
      limit: size,
      offset: (page - 1) * size,
    });
    res.json(produtos);
  } catch (error) {
    res.status(500).json(error);
  }
};

const create = async (req, res) => {
  try {
    console.log(req.body);
    await Produto.create(req.body);
    const produtos = await Produto.findOne({ where: { id: req.body.nome } });
    res.json(produtos);
  } catch (error) {
    res.status(500).json(error);
  }
};

const read = async (req, res) => {
  const { id } = req.params;
  try {
    const produtos = await Produto.findByPk(id);
    res.json(produtos);
  } catch (error) {
    res.status(500).json(error);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  try {
    await Produto.update(req.body, { where: { id } });
    const produtos = await Produto.findByPk(id);
    res.json(produtos);
  } catch (error) {
    res.status(500).json(error);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    await Produto.destroy({ where: { id } });
    res.json({ msg: "Produto removido" });
  } catch (error) {
    res.status(500).json(error);
  }
};

export default { index, create, read, update, remove };
