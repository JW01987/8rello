import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Columns } from './column.entity';
import { Card_comment } from './card-comment.entity';

@Entity({ name: 'cards' })
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  card_name: string;

  @Column()
  description: string;

  @Column()
  card_color: string;

  @Column()
  deadline: Date;

  @Column()
  position: number;

  @ManyToOne(() => Columns, (column) => column.cards)
  column: Columns;

  @OneToMany(() => Card_comment, (card_comments) => card_comments.card)
  card_comments: Card_comment;
}
