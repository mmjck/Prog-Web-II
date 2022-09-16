import { compare } from 'bcryptjs';
import { Usuario, Endereco } from '../models';

const login = async (req, res) => {
  try {
    const usuario = await Usuario.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (usuario) {
      const ok = await compare(req.body.senha, usuario.senha);
      if (ok) {
        req.session.uid = usuario.id;

        const enderecos = await Endereco.findAll({
          where: {
            usuarioId: usuario.id,
          },
        });

        return res.send({
          usuario: {
            nome: usuario.nome,
            email: usuario.email,
            id: usuario.id,
            tipoUsuarioId: usuario.tipoUsuarioId,
            enderecos,
          },
          message: 'Usuario autenticado',
        });
      } else
        return res.status(401).send({ message: 'Email e/ou senha incorreta' });
    }

    res.status(401).send({
      message: 'Usuário não encontrado',
      usuario: null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (!err) res.send({ message: 'Usuario delogado com sucesso' });
  });
};

export default { login, logout };
