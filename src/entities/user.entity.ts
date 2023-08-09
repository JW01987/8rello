import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Card_comment } from './card-comment.entity';
import { CardMember } from './card-member.entitiy';
import { BoardEntity } from './board.entity';
import { BoardAuthorityEntity } from './board_authority.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  create_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  update_at: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany(() => Card_comment, (card_comments) => card_comments.user)
  card_comments: Card_comment;

  @OneToMany(() => CardMember, (cardMember) => cardMember.user)
  cardMember: CardMember;

  @OneToMany(() => BoardEntity, (board) => board.user)
  boards: BoardEntity[];

  // @OneToMany(
  //   () => BoardAuthorityEntity,
  //   (boardAuthority) => boardAuthority.user,
  // )
  // boardAuthorities: BoardAuthorityEntity[];
}
