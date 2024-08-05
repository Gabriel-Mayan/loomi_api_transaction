import { 
  Check, 
  Entity, 
  Column, 
  ManyToOne, 
  JoinColumn, 
  CreateDateColumn, 
  UpdateDateColumn, 
  DeleteDateColumn, 
  PrimaryGeneratedColumn, 
} from 'typeorm';

import { User } from './user.entity';

@Entity('transactions')
@Check(`"senderUserId" <> "receiverUserId"`)
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { nullable: true })
  senderUserId?: string;

  @Column('uuid')
  receiverUserId: string;

  @Column('decimal')
  amount: number;

  @Column('text', { nullable: true })
  description?: string;

  @Column({ type: "boolean", default: 0 })
  mailSent: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;
  
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'senderUserId' })
  senderUser?: User;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'receiverUserId' })
  receiverUser: User;
}
