const jwt = require("jsonwebtoken");

function verificarJwt(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader) return res.status(403).json({ message: "Header de autorização não encontrado" });

  const [bearer, token] = authHeader.split(" ");

  if (!/^Bearer$/.test(bearer))
    return res.status(403).json({ message: "Header de autorização mal formatado" });

  if (!token) return res.status(403).json({ message: "JWT token não encontrado" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "JWT token inválido" });
    }

    const { usuario } = decoded;

    req.usuarioId = usuario._id;
    req.permissao = usuario.permissao;

    next();
  });
}

module.exports = verificarJwt;
