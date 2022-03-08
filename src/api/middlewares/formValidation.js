module.exports = {
    register : (req, res, next) => {
        const user = req.body;
        let receivedParams = 4;

        if (!user.fullName) {
            --receivedParams;
        }
        if (!user.email) {
            --receivedParams;
        }
        if (!user.password) {
            --receivedParams;
        }
        if (!user.cpf) {
            --receivedParams;
        }

        if (receivedParams < 4) {
            return res.status(400).send({ 
                status : 400,
                error : 'expected to receive 4 params. But, was gived '+ receivedParams
            }); 
        }

        next();
    },
    login : (req, res, next) => {
        const user = req.body;
        let receivedParams = 2;

        if (!user.email) {
            --receivedParams;
        }
        if (!user.password) {
            --receivedParams;
        }

        if (receivedParams < 2) {
            return res.status(400).send({ 
                status : 400,
                error : 'expected to receive 2 params. But, was gived '+ receivedParams
            }); 
        }

        next();
    }
};