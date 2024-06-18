import { Surface } from "src/tennis/surface/entities/surface.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
// import { Surface } from "./surface.entity";

@Entity()
export class Turnament {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public timestamp: Date;

  @Column()
  public name: string;

  @Column()
  public surface: string;

  @ManyToOne(() => Surface, (surface) => surface.turnaments)
  public surfaces: Surface;

}
