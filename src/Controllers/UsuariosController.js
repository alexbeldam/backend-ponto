const UsuarioModel = require("../Models/UsuariosModel");

class UsuariosController {
  async create(req, res) {
    try {
      const usuario = await UsuarioModel.create(req.body);

      const { senha, ...payload } = usuario.toObject();

      return res.status(200).json({ payload });
    } catch (error) {
      if (error.code === 11000) {
        const fieldLabels = {
          email: "E-mail",
          nome: "Nome",
        };

        const field = Object.keys(error.keyValue)[0];
        const label = fieldLabels[field] || field;

        return res.status(409).json({ message: `${label} já cadastrado.` });
      }

      console.error("[Create User Error]", error);

      return res
        .status(500)
        .json({ message: "Erro interno ao criar usuário. Tente novamente mais tarde." });
    }
  }

  async read(req, res) {
    try {
      const usuarios = await UsuarioModel.find();

      return res.status(200).json({ usuarios });
    } catch (error) {
      console.error("[Read Users Error]", error);

      return res
        .status(500)
        .json({ message: "Erro interno ao ler usuários. Tente novamente mais tarde." });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const usuario = await UsuarioModel.findById(id);

      if (!usuario) return res.status(404).json({ message: "Usuário não encontrado." });

      const updated = await usuario.set(req.body).save();

      return res.status(200).json({ updated });
    } catch (error) {
      if (error.code === 11000) {
        const fieldLabels = {
          email: "E-mail",
          nome: "Nome",
        };

        const field = Object.keys(error.keyValue)[0];
        const label = fieldLabels[field] || field;

        return res.status(409).json({ message: `${label} em uso.` });
      }

      console.error("[Update User Error]", error);

      return res
        .status(500)
        .json({ message: "Erro interno ao atualizar usuário. Tente novamente mais tarde." });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const usuario = await UsuarioModel.findById(id);

      if (!usuario) return res.status(404).json({ message: "Usuário não encontrado." });

      await usuario.deleteOne();

      return res.sendStatus(200);
    } catch (error) {
      console.error("[Delete User Error]", error);

      return res
        .status(500)
        .json({ message: "Erro interno ao deletar usuário. Tente novamente mais tarde." });
    }
  }
}

module.exports = new UsuariosController();
