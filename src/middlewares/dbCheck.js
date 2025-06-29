// Middleware para verificar conexión a la base de datos
export function checkDbConnection(req, res, next) {
    // Si mongoose no está conectado, devolver error 503
    if (!global.dbConnected) {
        return res.status(503).json({
            success: false,
            error: 'Database connection not available',
            message: 'El servicio está temporalmente no disponible. La base de datos no está conectada.'
        })
    }
    next()
}
