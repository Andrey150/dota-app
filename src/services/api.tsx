import axios from 'axios';
import { IMatch, IValueParameter, IPlayers, ITeam, ITeamPlayers, IPlayer, IHeroStats } from '../types/data'


export const useService = () => {
  const _apiBase = 'https://api.opendota.com/api';
  const _idBase = '3703866531';

  const getMatch = async ({ value }: IValueParameter): Promise<{ id: number, dire: string, radiant: string } | undefined> => {
    try {
      const res = await axios.get(`${_apiBase}/matches/${value}`);
      const match = res.data as IMatch;
      const id = match.match_id;
      const dire = match.dire_name;
      const radiant = match.radiant_name;
      return { id, dire, radiant };

    } catch (e) {
      console.log(`Error ${e}`)
      return undefined
    }
  }

  const getProPlayersList = async (): Promise<IPlayers[] | undefined> => {
    try {
      const res = await axios.get(`${_apiBase}/proPlayers`);

      const playersList: IPlayers[] = res.data.map((player: any) => ({
        account_id: player.account_id,
        avatarfull: player.avatarfull,
        personalName: player.personalname,
        profileurl: player.profileurl,
        last_match_time: player.last_match_time,
        name: player.name,
        country_cod: player.country_code,
        fantasy_role: player.fantasy_role,
        team_id: player.team_id,
        team_name: player.team_name,
        team_tag: player.team_tag,
      }));
      return playersList
    } catch (e) {
      return undefined
    }
  }

  const getTeamPlayers = async ({ value }: IValueParameter) => {
    try {
      const res = await axios.get(`${_apiBase}/teams/${value}/players`);
      const players: ITeamPlayers[] = res.data.map((player: any) => ({
        account_id: player.account_id,
        name: player.name,
        games_played: player.games_played,
        wins: player.wins,
        is_current_team_member: player.is_current_team_member
      }));
      return players
    } catch (error) {

    }
  }

  const getPlayer = async ({ value }: IValueParameter) => {
    try {
      const res = await axios.get(`${_apiBase}/players/${value}`)
      const player = res.data;
      const currentPlayer: IPlayer = {
        solo_competitive_rank: player.solo_competitive_rank,
        competitive_rank: player.competitive_rank,
        rank_tier: player.rank_tier,
        leaderboard_rank: player.leaderboard_rank,
        account_id: player.profile.account_id,
        personaname: player.profile.personaname,
        name: player.profile.name,
        avatarfull: player.profile.avatarfull,
        loccountrycode: player.profile.loccountrycode
      }

      return currentPlayer
    } catch (error) {
      return undefined
    }
  }

  const getAllTeams = async (): Promise<ITeam[] | undefined> => {
    try {
      const res = await axios.get(`${_apiBase}/teams`);

      const allTeamsList: ITeam[] = res.data.map((team: any) => ({
        team_id: team.team_id,
        rating: team.rating,
        wins: team.wins,
        losses: team.losses,
        name: team.name,
        tag: team.tag,
        logo_url: team.logo_url
      }));
      return allTeamsList
    } catch (e) {
      return undefined
    }
  }

  const getOneTeam = async ({ value }: IValueParameter): Promise<ITeam | undefined> => {
    try {
      const res = await axios.get(`${_apiBase}/teams/${value}`);
      const team = res.data;

      const currentTeam: ITeam = {
        team_id: team.team_id,
        rating: team.rating,
        wins: team.wins,
        losses: team.losses,
        name: team.name,
        tag: team.tag,
        logo_url: team.logo_url
      };

      return currentTeam;
    } catch (e) {
      return undefined
    }
  }

  const getHeroStats = async (): Promise<IHeroStats[] | undefined> => {
    try {
      const res = await axios.get(`${_apiBase}/heroStats`);

      const heroesStats: IHeroStats[] = res.data.map((hero: any) => ({
        id: hero.id,
        name: hero.name,
        localized_name: hero.localized_name,
        primary_attr: hero.primary_attr,
        attack_type: hero.attack_type,
        roles: hero.roles,
        img: hero.img,
        icon: hero.icon,
        base_health: hero.base_health,
        base_health_regen: hero.base_health_regen,
        base_mana: hero.base_mana,
        base_mana_regen: hero.base_mana_regen,
        base_armor: hero.base_armor,
        base_attack_min: hero.base_attack_min,
        base_attack_max: hero.base_attack_max,
        base_str: hero.base_str,
        base_agi: hero.base_agi,
        base_int: hero.base_int,
        str_gain: hero.str_gain,
        agi_gain: hero.agi_gain,
        int_gain: hero.int_gain,
        attack_point: hero.attack_point,
        move_speed: hero.move_speed,
        hero_id: hero.hero_id,
        turbo_picks: hero.turbo_picks,
        turbo_wins: hero.turbo_wins,
        pro_pick: hero.pro_pick,
        pro_win: hero.pro_win,
        attack_range: hero.attack_range
      }))

      return heroesStats;

    } catch (error) {
      return undefined
    }
  }

  return { getMatch, getProPlayersList, getAllTeams, getOneTeam, getTeamPlayers, getPlayer, getHeroStats }
}