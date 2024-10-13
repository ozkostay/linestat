export class LinesDto {
  timestamp: string;
  turnament?: string;
  surface?: string;
  name1?: string;
  name2?: string;
  win1_odds: number;
  draw_odds: number;
  win2_odds: number;
  double_1x_odds: number;
  double_12_odds: number;
  double_x2_odds: number;
  handicap1_value: number;
  handicap1_odds: number;
  handicap2_value: number;
  handicap2_odds: number;
  total_value: number;
  total_under_odds: number;
  total_over_odds: number;
  turnId?: number;
  sportId?: number;
  surfaceId?: number;
  name1Id?: number;
  name2Id?: number;
  game_id?: number;
}
