const { Router } = require("express");
const UsuariosController = require("./Controllers/UsuariosController");
const SessoesController = require("./Controllers/SessoesController");
const AuthController = require("./Controllers/AuthController");
const UsuarioValidator = require("./Validators/UsuarioValidator");
const SessaoValidator = require("./Validators/SessaoValidator");
const AuthValidator = require("./Validators/AuthValidator");

const rotas = Router();

rotas.post("/usuarios", UsuarioValidator.create, UsuariosController.create);
rotas.get("/usuarios", UsuariosController.read);
rotas.put("/usuarios/:id", UsuarioValidator.destroy, UsuariosController.update);
rotas.delete("/usuarios/:id", UsuarioValidator.update, UsuariosController.delete);

rotas.post("/sessoes", SessaoValidator.create, SessoesController.create);
rotas.get("/sessoes", SessoesController.read);
rotas.delete("/sessoes/:id", SessaoValidator.destroy, SessoesController.delete);

rotas.post("/login", AuthValidator.login, AuthController.login);

module.exports = rotas;
