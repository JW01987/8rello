import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
// import { User } from './user.entity';
import { BoardAuthorityEntity } from './board_authority.entity';

@Entity('board')
export class BoardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  user_id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  bg_color: string;

  @Column({ nullable: false })
  introduction: string;

  @CreateDateColumn({ type: 'timestamp' })
  create_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  upate_at: Date;

  // 컬러코드 유효성 검사
  @BeforeInsert()
  @BeforeUpdate()
  validatebg_color() {
    if (!/^#([0-9A-Fa-f]{5})$/.test(this.bg_color)) {
      throw new Error('컬러 코드를 입력해주세요 (ex. #00000)');
    }
  }

  // TODO :: user 테이블 연결
  // @ManyToOne(() => User, (user) => user.boards)
  // @JoinColumn({ name: 'user_id' })
  // user: User;

  @OneToMany(
    () => BoardAuthorityEntity,
    (boardAuthority) => boardAuthority.board,
    { cascade: true },
  )
  boardAuthority: BoardAuthorityEntity[];
}
