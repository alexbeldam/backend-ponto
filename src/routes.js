const { Router } = require("express");

const UsuariosController = require("./Controllers/UsuariosController");
const SessoesController = require("./Controllers/SessoesController");
const AuthController = require("./Controllers/AuthController");

const UsuarioValidator = require("./Validators/UsuarioValidator");
const SessaoValidator = require("./Validators/SessaoValidator");
const AuthValidator = require("./Validators/AuthValidator");

const verificarJwt = require("./Middlewares/verificarJwt");
const verificarUsuario = require("./Middlewares/verificarUsuario");
const verificarAcesso = require("./Middlewares/verificarAcesso");

const rotas = Router();

rotas.post("/usuarios", UsuarioValidator.create, UsuariosController.create);
rotas.get("/usuarios", verificarJwt, UsuariosController.read);
rotas.put(
  "/usuarios/:id",
  verificarJwt,
  verificarAcesso,
  UsuarioValidator.update,
  UsuariosController.update
);
rotas.delete(
  "/usuarios/:id",
  verificarJwt,
  verificarAcesso,
  UsuarioValidator.destroy,
  UsuariosController.delete
);

rotas.post(
  "/sessoes",
  verificarJwt,
  verificarUsuario,
  SessaoValidator.create,
  SessoesController.create
);
rotas.get("/sessoes", verificarJwt, SessoesController.read);
rotas.delete(
  "/sessoes/:id_usuario",
  verificarJwt,
  verificarUsuario,
  SessaoValidator.destroy,
  SessoesController.delete
);

rotas.post("/login", AuthValidator.login, AuthController.login);

module.exports = rotas;
