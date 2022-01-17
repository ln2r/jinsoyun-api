import { Schema } from "mongoose";

export const CharacterSchema = new Schema({
  metadata: {
    updated: {
      type: Number,
    },
    source: {
      type: String,
    },
  },
  name: {
    type: String,
  },
  server: {
    type: String,
  },
  lastSeen: {
    type: String,
  },
  race: {
    type: String,
  },
  gender: {
    type: String,
  },
  class: {
    type: String,
  },
  level: {
    type: String,
  },
  faction: {
    name: {
      type: String,
    },
    rank: {
      type: String,
    },
  },
  characters: [
    {
      name: {
        type: String,
      },
      class: {
        type: String,
      },
      level: {
        type: String,
      },
      guild: {
        type: String,
      },
    },
  ],
  guild: {
    type: String,
  },
  profileImage: {
    type: String,
  },
  equipments: {
    head: {
      type: String,
    },
    eye: {
      type: String,
    },
    outfit: {
      type: String,
    },
    adornment: {
      type: String,
    },
    soul: {
      type: String,
    },
    talisman: {
      type: String,
    },
    weapon: {
      type: String,
    },
    gloves: {
      type: String,
    },
    bracelet: {
      type: String,
    },
    belt: {
      type: String,
    },
    necklace: {
      type: String,
    },
    ring: {
      type: String,
    },
    earring: {
      type: String,
    },
    soulBadge: {
      type: String,
    },
    mysticBadge: {
      type: String,
    },
    pet: {
      name: {
        type: String,
      },
      appearance: {
        type: String,
      },
    },
    gems: [String],
    soulshields: [String],
  },
  stats: {
    hp: {
      value: {
        type: Number,
      },
      regen: {
        type: Number,
      },
      regenCombat: {
        type: Number,
      },
      recovery: {
        type: Number,
      },
      recoveryRate: {
        type: Number,
      },
    },
    defense: {
      value: {
        type: Number,
      },
      pvp: {
        type: Number,
      }, 
      boss: {
        type: Number,
      }, 
    },
    attackPower: {
      value: {
        type: Number,
      }, 
      pvp: {
        type: Number,
      }, 
      boss: {
        type: Number,
      },     },
    critical: {
      value: {
        type: Number,
      }, 
      rate: {
        type: Number,
      }, 
      damage: {
        type: Number,
      }, 
      damageRate: {
        type: Number,
      }, 
    },
    mystic: {
      value: {
        type: Number,
      }, 
      rate: {
        type: Number,
      },  
    },
    block: {
      value: {
        type: Number,
      }, 
      rate: {
        type: Number,
      }, 
      reduction: {
        type: Number,
      }, 
      enhancedBlock: {
        type: Number,
      }, 
    },
    evasion: {
      value: {
        type: Number,
      }, 
      rate: {
        type: Number,
      }, 
      counter: {
        type: Number,
      }, 
    },
  },
})