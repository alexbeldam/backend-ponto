const SessoesModel = require("../Models/SessoesModel");

class SessoesController {
  async create(req, res) {
    try {
      const sessoes = await SessoesModel.create(req.body);

      return res.status(200).json(sessoes);
    } catch (error) {
      return res.status(500).json({ message: "Lascou-se", error: error.message });
    }
  }

  async read(req, res) {
    try {
      const sessoess = await SessoesModel.find().populate("id_usuario", "-senha");

      return res.status(200).json(sessoess);
    } catch (error) {
      return res.status(500).json({ message: "Lascou-se", error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const sessao = await SessoesModel.findById(id);

      if (!sessao) return res.status(404).json({ message: "Sessão não encontrada" });

      await sessao.deleteOne();

      return res.status(200).json({ mensagem: "Sessão deletada com sucesso!" });
    } catch (error) {
      return res.status(500).json({ message: "Lascou-se", error: error.message });
    }
  }
}

module.exports = new SessoesController();
