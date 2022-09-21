import { User } from 'src/apis/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Boss {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  level0: number;

  @Column()
  level1: number;

  @Column()
  level2: number;

  @Column()
  second: number;

  @ManyToOne(() => User)
  user: User;
}
