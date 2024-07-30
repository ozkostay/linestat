// import { Users } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, Double } from 'typeorm';

@Entity()
export class Tennis {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public timestamp: Date;
  
  @Column()
  public gameId: number;

  @Column({ type: 'numeric', precision: 5, scale: 3, nullable: true })
  public win1_odds: number;

  @Column({ type: 'numeric', precision: 5, scale: 3, nullable: true })
  public win2_odds: number;

  @Column({ type: 'numeric', precision: 3, scale: 1, nullable: true })
  public handicap1_value: number;

  @Column({ type: 'numeric', precision: 5, scale: 3, nullable: true })
  public handicap1_odds: number;

  @Column({ type: 'numeric', precision: 3, scale: 1, nullable: true })
  public handicap2_value: number;

  @Column({ type: 'numeric', precision: 5, scale: 3, nullable: true })
  public handicap2_odds: number;

  @Column({ type: 'numeric', precision: 3, scale: 1, nullable: true })
  public total_value: number;

  @Column({ type: 'numeric', precision: 5, scale: 3, nullable: true })
  public total_under_odds: number;

  @Column({ type: 'numeric', precision: 5, scale: 3, nullable: true })
  public total_over_odds: number;
}
