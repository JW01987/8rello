import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Card } from './card.entity';

@Entity()
export class Columns {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  position: number;

  @Column()
  boardId: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  //   @ManyToOne(() => Board, (board) => board.columns)
  //   board: Board;

  @OneToMany(() => Card, (cards) => cards.column, { cascade: true })
  cards: Card[];
}
