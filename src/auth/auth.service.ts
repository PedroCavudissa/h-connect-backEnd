import * as bcrypt from 'bcrypt';
import { UsuarioService } from '../usuario/usuario.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usuarioService: UsuarioService
  ) {}
  async validateUser(email: string, senha: string): Promise<any> {
    const user = await this.usuarioService.findByEmail(email);
  
    if (!user || !user.senha) return null;
  
    // Comparação direta, sem hash
    if (senha !== user.senha) return null;
  
    return {
      userId: user.id,
      email: user.email,
      role_id: user.role_id
    };
  }
  async login(user: any) {
    const payload = { sub: user.userId, email: user.email, role_id: user.role_id };
    const token = this.jwtService.sign(payload);
  
    return {
      token,
      email: user.email,
      role_id: user.role_id
    };
  }
  
}
