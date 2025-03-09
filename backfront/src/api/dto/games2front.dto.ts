export class Games2FrontDto {
  id?: number;
  timestamp?: Date;
  sport: number;
  turnament: { id: number, name: string};
  player1: { id: number, name: string};
  player2: { id: number, name: string};
  surface?: number;
  result?: string;
  date?: Date;
  line?: any;
}
