import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Entity
} from 'typeorm';

@Entity()
export class Abstract {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamp with time zone'
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone'
  })
  updatedAt: Date;
}
