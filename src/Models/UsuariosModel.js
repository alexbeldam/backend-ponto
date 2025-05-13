const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SessoesModel = require("../Models/SessoesModel");

const Schema = mongoose.Schema;

const UsuariosSchema = new Schema({
  nome: {
    type: String,
    unique: true,
  },
  cargo: String,
  email: {
    type: String,
    unique: true,
  },
  senha: {
    type: String,
    select: false,
  },
  status: String,
  permissao: Boolean,
});

UsuariosSchema.pre("save", async function (next) {
  const usuario = this;

  if (usuario.isModified("senha")) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(usuario.senha, salt);

    usuario.senha = hash;
  }

  next();
});

UsuariosSchema.pre("deleteOne", { document: true, query: false }, async function () {
  const usuario = this;

  return SessoesModel.deleteOne({ id_usuario: usuario._id });
});

const UsuariosModel = mongoose.model("usuarios", UsuariosSchema);

module.exports = UsuariosModel;
