import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
// import { Column } from './column.entity';

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

  //   @ManyToOne(() => Column, (column) => column.cards)
  //   column: Column;

  //   @OneToMany(() => Card_comment, (card_comments) => card_comments.card)
  //   card_comments: Card_comment;
}
