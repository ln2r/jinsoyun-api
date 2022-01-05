export interface CharacterInterface {
  metadata: {
    updated: number,
    source: string,
  },
  name: string,
  server: string,
  lastSeen: string,
  race: string,
  gender: string,
  class: string,
  level: string,
  faction: {
    name: string,
    rank: string,
  },
  guild: string,
  profileImage: string,
  equipments: {
    head: string,
    eye: string,
    outfit: string,
    adornment: string,
    soul: string,
    talisman: string,
    weapon: string,
    gloves: string,
    bracelet: string,
    belt: string,
    necklace: string,
    ring: string,
    earring: string,
    soulBadge: string,
    mysticBadge: string,
    pet: {
      name: string,
      appearance: string,
    },
    gems: string[],
    soulshields: string[],
  },
  stats: {
    hp: {
      value: number,
      regen: number,
      regenCombat: number,
      recovery: number,
      recoveryRate: number,
    },
    defense: {
      value: number,
      pvp: number, 
      boss: number, 
    },
    attackPower: {
      value: number, 
      pvp: number, 
      boss: number,     },
    critical: {
      value: number, 
      rate: number, 
      damage: number, 
      damageRate: number, 
    },
    mystic: {
      value: number, 
      rate: number,  
    },
    block: {
      value: number, 
      rate: number, 
      reduction: number, 
      enhancedBlock: number, 
    },
    evasion: {
      value: number, 
      rate: number, 
      counter: number, 
    },
  },
}