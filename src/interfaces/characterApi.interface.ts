export interface CharacterApiInterface {
  account_id: string,
  id: number,
  name: string,
  server_id: number,
  server_name: string,
  clazz: string,
  class_name: string,
  level: number,
  mastery_faction: string,
  mastery_faction_name: null | string,
  mastery_level: number,
  last_play_start_time: string | null,
  last_play_end_time: string | null,
  guild: object | null,
  profile_url: string,
  playing: boolean
}