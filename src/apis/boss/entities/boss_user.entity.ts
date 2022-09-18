import { User } from 'src/apis/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Boss } from './boss.entity';

@Entity()
export class BossUserJoin {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Boss)
  boss: Boss;

  @Column({ default: 0 })
  totalscore: number;
}
