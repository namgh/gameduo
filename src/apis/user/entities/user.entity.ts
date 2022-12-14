import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  // 초깃값 0으로 설정
  @Column({ default: 0 })
  totalscore: number;
}
