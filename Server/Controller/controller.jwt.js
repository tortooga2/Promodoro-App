import * as jose from 'jose';

class JWTController {
    constructor(params) {
        this.secret = new TextEncoder().encode(params.secret);
    }
    
    createJWT = async (payload) => {
        const token = await new jose.SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('2d')
        .sign(this.secret);
        return token;
    }

    varifyJWT = async (token) => {
        
        let result = await jose.jwtVerify(token, this.secret);
        return result;    
        console.log(error);
        return null;
    }

    decodeJWTResult = async (result) => {
            let clientID = result.payload.clientID;

    }
    
}

export default JWTController;