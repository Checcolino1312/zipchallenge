export interface PlayerResult {
  seconds: number;
  time_str: string;
  impeccabile: boolean;
  dietrofront: number | null;
}

export interface DailyEntry {
  zip_num: number;
  date: string;
  Francesco: PlayerResult | null;
  Pierpaolo: PlayerResult | null;
  winner: "Francesco" | "Pierpaolo" | "pareggio" | "solo_Francesco" | "solo_Pierpaolo";
}

export interface PlayerStats {
  total_games: number;
  impeccabile_count: number;
  impeccabile_pct: number;
  avg_dietrofront: number | null;
  zero_dietrofront: number;
  best_time: string;
  best_time_seconds: number;
  best_dietrofront: number | null;
  best_zip: number;
  best_date: string;
  worst_time: string;
  worst_time_seconds: number;
  worst_dietrofront: number | null;
  worst_zip: number;
  worst_date: string;
  avg_time_seconds: number;
  avg_time_str: string;
  median_time_seconds: number;
  median_time_str: string;
}

export interface HeadToHead {
  total_shared_days: number;
  Francesco_wins: number;
  Pierpaolo_wins: number;
  ties: number;
  only_Francesco: number;
  only_Pierpaolo: number;
}

export interface ZipStats {
  head_to_head: HeadToHead;
  Francesco: PlayerStats;
  Pierpaolo: PlayerStats;
  daily: DailyEntry[];
}
