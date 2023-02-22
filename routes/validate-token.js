import jwt from 'jsonwebtoken'
// middleware to validate token (rutas protegidas)
export const verifyToken = (req, res, next) => {
    const token = req.header('auth-token');
    let {id} = req.params;
    if (!token) return res.status(401).json({ error: 'Acceso denegado' })

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        console.log(id,verified.id);
        if(id !== verified.id.toString()) return res.status(403).json({error: 'No autorizado'});
        
        next() // continuamos
    } catch (error) {
        res.status(400).json({error: 'token no es válido'})
    }

}
