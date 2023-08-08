import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Card } from './card.entity';

@Entity({ name: 'card_comment' })
export class Card_comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @ManyToOne(() => User, (user) => user.card_comments)
  user: User;

  @ManyToOne(() => Card, (card) => card.card_comments)
  card: Card;
}
