export interface IMatch {
  match_id: number,
  dire_name: string,
  radiant_name: string
}

export interface IValueParameter {
  value: string;
  signal?: AbortSignal;
};

export interface IPlayers {
  account_id: number,
  avatarfull: string,
  personalName: string,
  profileurl: string,
  last_match_time: string,
  name: string,
  country_cod: string,
  fantasy_role: number,
  team_id: number,
  team_name: string,
  team_tag: string,
}

export interface ITeam {
  team_id: number,
  rating: number,
  wins: number,
  losses: number,
  name: string,
  tag: string,
  logo_url: string
}

export interface ITeamPlayers {
  account_id: number,
  name: string,
  games_played: number,
  wins: number,
  is_current_team_member: boolean
}

export interface IPlayer {
  solo_competitive_rank: number,
  competitive_rank: number,
  rank_tier: number,
  leaderboard_rank: number,
  account_id: number,
  personaname: string,
  name: string,
  avatarfull: string,
  loccountrycode: string
}

export interface IHeroStats {
  id: number,
  name: string,
  localized_name: string,
  primary_attr: string,
  attack_type: string,
  roles: string[],
  img: string,
  icon: string,
  base_health: number,
  base_health_regen: number,
  base_mana: number,
  base_mana_regen: number,
  base_armor: number,
  base_attack_min: number,
  base_attack_max: number,
  base_str: number,
  base_agi: number,
  base_int: number,
  str_gain: number,
  agi_gain: number,
  int_gain: number,
  attack_point: number,
  move_speed: number,
  hero_id: number,
  turbo_picks: number,
  turbo_wins: number,
  pro_pick: number,
  pro_win: number,
  attack_range: number
}