import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

  public async validate() {
    return {
      message: 'Under Construction'
    };
  }
}
