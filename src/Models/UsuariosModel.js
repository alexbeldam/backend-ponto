const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
  const user = this;

  if (user.isModified("senha")) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.senha, salt);

    user.senha = hash;
  }

  next();
});

const UsuariosModel = mongoose.model("usuarios", UsuariosSchema);

module.exports = UsuariosModel;
