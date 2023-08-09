import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Card } from './card.entity';

@Entity()
export class CardMember {
  @PrimaryGeneratedColumn()
  id: number;

  //   @ManyToOne(() => User, (user) => user.card_members)
  //   user: User;

  //   @ManyToOne(() => Card, (card) => card.card_members)
  //   card: Card;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
