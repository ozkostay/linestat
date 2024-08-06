// import { Users } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, Double } from 'typeorm';

@Entity()
export class Tennis {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public timestamp: Date;
  
  // @Column()
  // public gameId: number;

  @Column({ nullable: true })
  public game_id: number;

  @Column({ type: 'real', nullable: true })
  public win1_odds: number;

  @Column({ type: 'real', nullable: true })
  public win2_odds: number;

  @Column({ type: 'real', nullable: true })
  public handicap1_value: number;

  @Column({ type: 'real', nullable: true })
  public handicap1_odds: number;

  @Column({ type: 'real', nullable: true })
  public handicap2_value: number;

  @Column({ type: 'real', nullable: true })
  public handicap2_odds: number;

  @Column({ type: 'real', nullable: true })
  public total_value: number;

  @Column({ type: 'real', nullable: true })
  public total_under_odds: number;

  @Column({ type: 'real', nullable: true })
  public total_over_odds: number;
}
