// import { Users } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Players {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name_ru: string;

  @Column()
  public name_en: string;

}
