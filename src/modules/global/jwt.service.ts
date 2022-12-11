import {
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as jose from 'jose';

interface JWTServiceInterface {
  generate(a: jose.JWTPayload, b: string): Promise<string>;
  verify(a: string): Promise<jose.JWTVerifyResult>;
}

export interface Payload extends jose.JWTVerifyResult {
  _id: 'string';
  id: 'string';
}

@Injectable()
export class JWTService implements JWTServiceInterface {
  constructor(@Inject('EC384Keypair') private readonly EC384Keypair) {}
  private readonly alg = 'ES384';

  public async generate(payload, audience) {
    const jwt = await new jose.SignJWT(payload)
      .setProtectedHeader({ alg: this.alg })
      .setIssuedAt()
      .setExpirationTime('1h')
      .setIssuer('dahyeon.us')
      .setAudience(audience)
      .sign(this.EC384Keypair.josePrivateKey);

    return jwt;
  }

  public async verify(jwt) {
    let payload: Payload;
    try {
      payload = (await jose.jwtVerify(
        jwt,
        this.EC384Keypair.josePublicKey,
      )) as Payload;
    } catch (error) {
      let errorMessage;
      console.log(error.code);
      switch (error.code) {
        case 'ERR_JWT_EXPIRED':
          errorMessage = '토큰이 만료되었습니다.';
          break;

        default:
          errorMessage = '잘못된 토큰입니다.';
          break;
      }
      //X-Ray
      throw new UnauthorizedException({
        message: 'UnauthorizedException',
        errorMessage: errorMessage,
      });
    }

    return payload;
  }
}
