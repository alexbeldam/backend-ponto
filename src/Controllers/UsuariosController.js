const UsuarioModel = require("../Models/UsuariosModel");

class UsuariosController {
  async create(req, res) {
    try {
      const usuario = await UsuarioModel.create(req.body);

      const { senha, ...safeUsuario } = usuario.toObject();

      return res.status(200).json(safeUsuario);
    } catch (error) {
      return res.status(500).json({ message: "Lascou-se", error: error.message });
    }
  }

  async read(req, res) {
    try {
      const usuarios = await UsuarioModel.find();

      return res.status(200).json(usuarios);
    } catch (error) {
      return res.status(500).json({ message: "Lascou-se", error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const usuario = await UsuarioModel.findById(id);

      if (!usuario) return res.status(404).json({ message: "Usuário não encontrado" });

      const updated = await usuario.set(req.body).save();

      return res.status(200).json(updated);
    } catch (error) {
      return res.status(500).json({ message: "Lascou-se", error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const usuario = await UsuarioModel.findById(id);

      if (!usuario) return res.status(404).json({ message: "Usuário não encontrado" });

      await usuario.deleteOne();

      return res.status(200).json({ mensagem: "Usuario deletado com sucesso!" });
    } catch (error) {
      return res.status(500).json({ message: "Lascou-se", error: error.message });
    }
  }
}

module.exports = new UsuariosController();
