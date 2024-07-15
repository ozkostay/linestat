// import { Users } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Turnaments {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name_ru: string;
  
  @Column()
  public name_en: string;

  @Column()
  public surface: number;
}