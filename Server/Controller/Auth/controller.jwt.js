import * as jose from 'jose';

// export class JWTController {
//     constructor(params) {
//         this.secret = new TextEncoder().encode(params.secret);
//     }
    
//     createJWT = async (payload) => {
//         const token = await new jose.SignJWT(payload) //payload = client id
//         .setProtectedHeader({ alg: 'HS256' })
//         .setIssuedAt()
//         .setExpirationTime('1d')
//         .sign(this.secret);
//         return token;
//     }

//     varifyJWT = async (token) => {
        
//         let result = await jose.jwtVerify(token, this.secret);
//         return result.payload;
//         console.log(error);
//         return null;
//     }

//     decodeJWTResult = async (result) => {
//             let clientID = this.varifyJWT(result).payload.clientID;

//     }
// }

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

const createJWT = async (payload) => {
    const token = await new jose.SignJWT(payload) //payload = client id
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(secret);
    return token;
}

const unpackJWT = async (token) => {
    let result = await jose.jwtVerify(token, secret)
    .then((result) => {return result.payload;})
    .catch((err)=>{console.log(err); return null;} );
}



export { createJWT, unpackJWT }