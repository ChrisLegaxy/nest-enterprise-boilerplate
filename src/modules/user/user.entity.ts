import { Entity, Column, BeforeInsert } from 'typeorm';
import { Abstract } from 'src/common/abstract.entity';
import bcrypt from 'bcryptjs';
import { UnauthorizedException } from '@nestjs/common';

@Entity()
export class User extends Abstract {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  public async hashPassword(): Promise<void> {
    if (this.password) {
      this.password = await User.hashPassword(this.password);
    }
  }

  public static hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (error, salt) => {
        if (error) {
          reject(error);
        }
        bcrypt.hash(password, salt, (error, hash) => {
          if (error) {
            reject(error);
          }
          resolve(hash);
        });
      });
    });
  }

  public static async comparePassword(
    password: string,
    user: User
  ): Promise<boolean> {
    try {
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        throw new UnauthorizedException('Incorrect Email or Password');
      }

      return match;
    } catch (error) {
      throw error;
    }
  }
}
