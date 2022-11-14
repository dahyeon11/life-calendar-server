import { Injectable, CanActivate, ExecutionContext, PreconditionFailedException } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { JWTService } from '../global/jwt.service';

@Injectable()
export class AuthorizationGuard implements CanActivate {
    constructor(
        private readonly JWTService: JWTService,
    ) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request: { user: any } & Request = context.switchToHttp().getRequest();

    const regex = /bearer+ ?/i;

    let token = request.headers.authorization

    if(!token) {
        throw new PreconditionFailedException({ message: 'Precondition Failed', errorMessage: `토큰 정보가 없습니다.` })
    }

    const payload = await this.JWTService.verify(token.replace(regex, ''))

    request.user = payload.payload

    if(payload) {
        return true
    } else {
        return false
    }
  }
}