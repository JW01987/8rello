import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  RelationId,
  JoinColumn,
} from 'typeorm';
import { Columns } from './column.entity';
import { Card_comment } from './card-comment.entity';
import { CardMember } from './card-member.entitiy';

@Entity({ name: 'cards' })
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  card_name: string;

  @Column()
  column_id: number;

  @Column()
  description: string;

  @Column()
  card_color: string;

  @Column()
  deadline: Date;

  @Column()
  position: number;

  @ManyToOne(() => Columns, (column) => column.cards, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'column_id' })
  column: Columns;

  @OneToMany(() => Card_comment, (card_comments) => card_comments.card)
  card_comments: Card_comment[];

  // @OneToMany(() => CardMember, (cardMember) => cardMember.card)
  // cardMember: CardMember;
}
