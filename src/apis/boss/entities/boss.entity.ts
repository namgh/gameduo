import { User } from 'src/apis/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Boss {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  level0: number;

  @Column({ default: 0 })
  level1: number;

  @Column({ default: 0 })
  level2: number;

  @Column({ default: 0 })
  second: number;

  @ManyToOne(() => User)
  user: User;
}
