const SessoesModel = require("../Models/SessoesModel");
const UsuarioModel = require("../Models/UsuariosModel");

class SessoesController {
  async create(req, res) {
    try {
      const usuario = await UsuarioModel.findById(req.body.id_usuario);

      if (!usuario) return res.status(404).json({ message: "Usuário não encontrado." });

      const sessao = await SessoesModel.create(req.body);

      return res.status(200).json({ sessao });
    } catch (error) {
      if (error.code === 11000)
        return res.status(409).json({ message: `Já existe uma sessão ativa.` });

      console.error("[Create Session Error]", error);

      return res
        .status(500)
        .json({ message: "Erro interno ao criar sessão. Tente novamente mais tarde." });
    }
  }

  async read(req, res) {
    try {
      const sessoes = await SessoesModel.find().populate("id_usuario");

      return res.status(200).json({ sessoes });
    } catch (error) {
      console.error("[Read Sessions Error]", error);

      return res
        .status(500)
        .json({ message: "Erro interno ao ler sessões. Tente novamente mais tarde." });
    }
  }

  async delete(req, res) {
    try {
      const { id_usuario } = req.params;
      const sessao = await SessoesModel.findOne({ id_usuario });

      if (!sessao) return res.status(404).json({ message: "Sessão não encontrada." });

      await sessao.deleteOne();

      return res.status(200);
    } catch (error) {
      console.error("[Delete Session Error]", error);

      return res
        .status(500)
        .json({ message: "Erro interno ao deletar sessão. Tente novamente mais tarde." });
    }
  }
}

module.exports = new SessoesController();
