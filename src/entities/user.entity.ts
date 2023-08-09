import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Card_comment } from './card-comment.entity';
import { CardMember } from './card-member.entitiy';

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

  @OneToMany(() => Card_comment, (card_comments) => card_comments.user)
  card_comments: Card_comment;

  // @OneToMany(() => CardMember, (cardMember) => cardMember.user)
  // cardMembers: CardMember;

  //TODO: @OneToMany() 로 연관관계 설정
}
