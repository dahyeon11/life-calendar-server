import { ForbiddenException, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import * as jose from "jose"

interface JWTServiceInterface {
    generate(a: jose.JWTPayload, b: string): Promise<string>
    verify(a: string): Promise<jose.JWTVerifyResult>
}

export interface Payload extends jose.JWTVerifyResult{
    _id: 'string',
    id: 'string',
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
        let payload: Payload
        try {
            payload = await jose.jwtVerify(jwt, this.EC384Keypair.josePublicKey) as Payload
        } catch (error) {
            console.log(error)
            //X-Ray
            throw new ForbiddenException({ message: 'Forbidden', errorMessage: '유효하지 않은 토큰' })
        }

        return payload
    }

}