// import { Users } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Games {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public timestamp: Date;
  
  @Column()
  public sport: number;

  @Column()
  public turnament: number;

  @Column()
  public player1: number;

  @Column()
  public player2: number;

  @Column()
  public surface: number;

  @Column({ nullable: true })
  public result: string;

  @Column({ nullable: true })
  public date: Date;
}