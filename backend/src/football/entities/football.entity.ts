import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Football {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public timestamp: Date;
  
  @Column({ nullable: true })
  public game_id: number;

  @Column({ type: 'real', nullable: true })
  public win1_odds: number;

  @Column({ type: 'real', nullable: true })
  public draw_odds: number;

  @Column({ type: 'real', nullable: true })
  public win2_odds: number;

  @Column({ type: 'real', nullable: true })
  public double_1x_odds: number;

  @Column({ type: 'real', nullable: true })
  public double_12_odds: number;

  @Column({ type: 'real', nullable: true })
  public double_x2_odds: number;

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

// сэ63  №009081048000881         8 912 777 84 00 
