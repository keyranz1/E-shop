const {expressjwt:expressJwt} = require('express-jwt');

function authJwt(){
    const secret = process.env.secret;
    const api = process.env.API_URL;
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: checkIfrevoked
    }).unless({
        path: [
            //{ url: `${api}/products`, methods: ['GET', 'OPTIONS'] },
            { url: /\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
            `${api}/users/login`,
            `${api}/users/register`
        ]
    });
}

async function checkIfrevoked(req, payload)
{
    if(!payload.payload.isAdmin)
    {
        return true;
    }

    return false;
}

module.exports = authJwt;