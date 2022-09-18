import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Boss {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  canenter: Boolean;
}
