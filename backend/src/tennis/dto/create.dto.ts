export class CreateDto {
  timestamp: Date;
  gameId: number;
  win1_odds: number;
  win2_odds: number;
  handicap1_value: number;
  handicap1_odds: number;
  handicap2_value: number;
  handicap2_odds: number;
  total_value: number;
  total_under_odds: number;
  total_over_odds: number;
}
