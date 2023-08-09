import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { BoardEntity } from './board.entity';
@Entity('board_authority')
export class BoardAuthorityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  user_id: number;

  @Column({ nullable: false })
  board_id: number;

  @CreateDateColumn({ type: 'timestamp' })
  create_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  update_at: Date;

  @ManyToOne(() => BoardEntity, (board) => board.boardAuthority)
  @JoinColumn({ name: 'board_id' })
  board: BoardEntity;
}
