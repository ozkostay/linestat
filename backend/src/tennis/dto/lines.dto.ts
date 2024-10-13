export class LinesDto {
  timestamp: string;
  turnament?: string;
  surface?: string;
  name1?: string;
  name2?: string;
  win1_odds: number;
  win2_odds: number;
  handicap1_value: number;
  handicap1_odds: number;
  handicap2_value: number;
  handicap2_odds: number;
  total_value: number;
  total1_odds: number;
  total2_odds: number;
  turnId?: number;
  sportId?: number;
  surfaceId?: number;
  name1Id?: number;
  name2Id?: number;
  game_id?: number;
}
