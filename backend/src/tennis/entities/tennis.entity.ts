// import { Users } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tennis {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public timestamp: Date;
  
  @Column()
  public game: number;

  @Column()
  public win1_odd: number;

  @Column()
  public win2_odd: number;

  @Column()
  public handicap1_value: number;

  @Column()
  public handicap1_odds: number;

  @Column()
  public handicap2_value: number;

  @Column()
  public handicap2_odds: number;

  @Column()
  public total_value: number;

  @Column()
  public total_under_odds: number;

  @Column()
  public total_over_odds: number;
}
