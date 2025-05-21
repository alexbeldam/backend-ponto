const UsuarioModel = require("../Models/UsuariosModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthController {
  async login(req, res) {
    try {
      const { email, senha } = req.body;

      const user = await UsuarioModel.findOne({ email }).select("+senha");

      if (!user) return res.status(403).json({ message: "E-mail e/ou senha inválidos." });

      const matches = await bcrypt.compare(senha, user.senha);

      if (!matches) return res.status(403).json({ message: "E-mail e/ou senha inválidos." });

      const { senha: _, ...usuario } = user.toObject();

      const token = jwt.sign({ usuario }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_MAX_AGE,
      });

      return res.status(200).json({ token });
    } catch (error) {
      console.error("[Login Error]", error);

      return res
        .status(500)
        .json({ message: "Erro interno do servidor. Tente novamente mais tarde." });
    }
  }
}

module.exports = new AuthController();
