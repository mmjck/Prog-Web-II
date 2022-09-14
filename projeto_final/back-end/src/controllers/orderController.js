import { Produto, CompraItem, Compra } from '../models';
const create = async (req, res) => {
  console.log(req.body);

  if (req.body == null) {
    res.send(400);
  }

  try {
    const { date_order, products, enderecoId } = req.body;
    const { id } = req.params;

    const newOrder = await Compra.create({
      usuarioId: parseInt(id),
      data: date_order,
      enderecoId,
    });

    const promisesProducts = [];
    products.forEach((element) => {
      promisesProducts.push(
        Produto.findOne({
          where: {
            id: element.id,
          },
        })
      );
    });

    const resultProducts = await Promise.all(promisesProducts)
      .then((ressult) => ressult)
      .catch((error) => {
        throw error;
      });

    resultProducts.forEach((element) => {
      if (element != null) {
        const finded = products.find((item) => item.id == element.id);

        if (finded != null) {
          if (finded.quantidade > element.estoque) {
            return res.status(400).json({
              id: finded.id,
              message: 'error amount product',
            });
          }
        }
      }
    });

    const promisesCompraItem = [];

    products.forEach((element) => {
      promisesCompraItem.push(
        CompraItem.create({
          compraId: newOrder.id,
          produtoId: parseInt(element.id),
          usuarioId: parseInt(element.id),
          quantidade: parseInt(element.quantidade),
        })
      );
    });

    const promisesProductUpdate = [];
    products.forEach((element) => {
      if (element != null) {
        const finded = resultProducts.find((item) => item.id == element.id);

        promisesProductUpdate.push(
          Produto.update(
            { estoque: finded.estoque - element.quantidade },
            { where: { id: finded.id } }
          )
        );
      }
    });

    await Promise.all(promisesCompraItem);
    await Promise.all(promisesProductUpdate);
    return res.status(200).json({ message: 'OK' });
  } catch (error) {
    console.log('ERROR', error);
    res.status(400);
  }
};

const read = async (req, res) => {
  const { id } = req.params;

  try {
    const compras = await Compra.findAll({
      where: {
        usuarioId: id,
      },
    });

    const promisesCompra = [];
    compras.forEach((item) => {
      const query = CompraItem.findAll({
        where: {
          compraId: item.id,
        },
        include: [
          {
            model: Produto,
          },
        ],
      });
      promisesCompra.push(query);
    });

    let resultCompra = await Promise.all(promisesCompra);
    resultCompra = resultCompra.filter((item) => item.length > 0);

    res.json(resultCompra);
  } catch (error) {
    console.log('ERROR', error);
    res.send(400);
  }
};

export default { create, read };
