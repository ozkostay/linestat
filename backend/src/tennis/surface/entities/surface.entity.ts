import { Turnament } from "src/tennis/turnament/entities/turnament.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Surface {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @OneToMany(() => Turnament, (turnament) => turnament.surface)
  public turnaments: Turnament;
}
