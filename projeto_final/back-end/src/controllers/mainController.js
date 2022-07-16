import { compare } from "bcryptjs";
import { Usuario } from "../models";

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
        res.send({ msg: "Usuario autenticado" });
      } else res.send({ msg: "Email e/ou senha incorreta" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (!err) res.send({ msg: "Usuario delogado com sucesso" });
  });
};

export default { login, logout };
