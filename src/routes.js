const { Router } = require("express");
const UsuariosController = require("./Controllers/UsuariosController");
const SessoesController = require("./Controllers/SessoesController");
const UsuarioValidator = require("./Validators/UsuarioValidator");
const SessaoValidator = require("./Validators/SessaoValidator");

const rotas = Router();

rotas.post("/usuarios", UsuarioValidator.create, UsuariosController.create);
rotas.get("/usuarios", UsuariosController.read);
rotas.put("/usuarios/:id", UsuarioValidator.destroy, UsuariosController.update);
rotas.delete("/usuarios/:id", UsuarioValidator.update, UsuariosController.delete);

rotas.post("/sessoes", SessaoValidator.create, SessoesController.create);
rotas.get("/sessoes", SessoesController.read);
rotas.delete("/sessoes/:id", SessaoValidator.destroy, SessoesController.delete);

module.exports = rotas;
