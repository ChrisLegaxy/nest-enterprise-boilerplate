import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Abstract } from 'src/common/abstract.entity';

@Entity()
export class User extends Abstract {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
