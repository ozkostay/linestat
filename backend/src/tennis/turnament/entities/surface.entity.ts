import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Turnament } from "./turnament.entity";

@Entity()
export class Surface {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @OneToMany(() => Turnament, (turnament) => turnament.surface)
  public turnaments: Turnament;
}
