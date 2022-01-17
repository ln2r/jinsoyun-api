export interface AltsInterface {
  account_id: string,
  id: number,
  name: string,
  server_id: number,
  server_name: string,
  clazz: string,
  class_name: string,
  level: number,
  mastery_faction: string,
  mastery_faction_name: string | null,
  mastery_level: number,
  guild: { guild_id: number, guild_name: string } | null,
  profile_url: string,
  playing: boolean
}