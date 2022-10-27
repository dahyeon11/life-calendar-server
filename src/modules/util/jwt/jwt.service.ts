import { Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import * as jose from "jose"

interface JWTServiceInterface {
    generate(a: jose.JWTPayload, b: string): Promise<string>
    verify(a: string): Promise<jose.JWTVerifyResult>
}

@Injectable()
export class JWTService implements JWTServiceInterface {
    constructor(
        @Inject('EC384Keypair') private readonly EC384Keypair
    ) {}
    private readonly alg = 'ES384'

    public async generate(payload, audience) {
        const jwt = await new jose.SignJWT(payload)
        .setProtectedHeader({ alg: this.alg })
        .setIssuedAt()
        .setExpirationTime('1h')
        .setIssuer('dahyeon.us')
        .setAudience(audience)
        .sign(this.EC384Keypair.josePrivateKey)
        
        return jwt
    }

    public async verify(jwt) {
        let payload
        try {
            payload = await jose.jwtVerify(jwt, this.EC384Keypair.josePublicKey)
        } catch (error) {
            console.log(error)
            //X-Ray
            throw new InternalServerErrorException({ message: 'Invalid Token' })
        }

        return payload
    }

}