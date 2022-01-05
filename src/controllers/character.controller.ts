import { Request, Response } from "express";
import get from 'axios'

import { CharacterModel } from "../models/character.model";

// flow: hit db > check update > return
//                             > hit api > update db > return
export class CharacterController {
  public async query (req: Request, res: Response) {
    console.log(`hitting ${req.baseUrl}/${req.params.region}/${req.params.query}`);

    try {
      const currentTime = new Date().getTime();

      const query = new RegExp(req.params.query, "i")
      const db = await CharacterModel.findOne({name: query});
      
      // check for outdated
      const outdated = (!db)? true : ((((db as any).updated + parseInt(process.env.CHARACTER_EXPIRE as string)) - currentTime) < 0)? true : false;
      console.log(`Outdated? ${outdated}`);
      
      let response;      
      if (outdated) {
        console.log(`Refreshing data`);

        const infoApi = await get(`http://${req.params.region}-bns.ncsoft.com/ingame/api/character/info.json?c=${req.params.query}`);
        const equipmentApi = await get(`http://${req.params.region}-bns.ncsoft.com/ingame/api/character/equipments.json?c=${req.params.query}`);
        const abilitiesApi = await get(`http://${req.params.region}-bns.ncsoft.com/ingame/api/character/abilities.json?c=${req.params.query}`);

        // api would respond with empty object when
        // character not found
        if (Object.entries(infoApi.data).length !== 0 && Object.entries(equipmentApi).length !== 0 && Object.entries(abilitiesApi).length !== 0) {        
          response = {
            metadata: {
              updated: currentTime,
              source: 'plaync',
            },
            name: infoApi.data.name,
            server: infoApi.data.server_name,
            lastSeen: infoApi.data.geo_zone_name,
            race: infoApi.data.race_name,
            gender: infoApi.data.gender_name,
            class: infoApi.data.class_name,
            level: `Level ${infoApi.data.level} HM ${infoApi.data.mastery_level}`,
            faction: {
              name: infoApi.data.faction_name,
              rank: infoApi.data.faction_grade_name,
            },
            guild: (infoApi.data.guild)? infoApi.data.guild.guild_name : 'n/a',
            profileImage: infoApi.data.profile_url,
            equipments: {
              head        : (equipmentApi.data.head)? equipmentApi.data.head.equip.item.name : 'n/a',
              eye         : (equipmentApi.data.eye)? equipmentApi.data.eye.equip.item.name : 'n/a',
              outfit      : (equipmentApi.data.body)? equipmentApi.data.body.equip.item.name : 'n/a',
              adornment   : (equipmentApi.data.body_accessory)? equipmentApi.data.body_accessory.equip.item.name : 'n/a',
              soul        : (equipmentApi.data.soul)? equipmentApi.data.soul.equip.item.name : 'n/a',
              talisman    : (equipmentApi.data.nova)? equipmentApi.data.nova.equip.item.name : 'n/a',
              weapon      : (equipmentApi.data.hand)? equipmentApi.data.hand.equip.item.name : 'n/a',
              gloves      : (equipmentApi.data.gloves)? equipmentApi.data.gloves.equip.item.name : 'n/a',
              bracelet    : (equipmentApi.data.bracelet)? equipmentApi.data.bracelet.equip.item.name : 'n/a',
              belt        : (equipmentApi.data.belt)? equipmentApi.data.belt.equip.item.name : 'n/a',
              necklace    : (equipmentApi.data.neck)? equipmentApi.data.neck.equip.item.name : 'n/a',
              ring        : (equipmentApi.data.finger_left)? equipmentApi.data.finger_left.equip.item.name : 'n/a',
              earring     : (equipmentApi.data.ear_left)? equipmentApi.data.ear_left.equip.item.name : 'n/a',
              soulBadge   : (equipmentApi.data.soul_badge)? equipmentApi.data.soul_badge.equip.item.name : 'n/a',
              mysticBadge : (equipmentApi.data.swift_badge)? equipmentApi.data.swift_badge.equip.item.name : 'n/a',
              pet: {
                name      : (equipmentApi.data.pet)? equipmentApi.data.pet.equip.item.name : 'n/a',
                appearance: (equipmentApi.data.pet)? (equipmentApi.data.pet.equip.appearance)? equipmentApi.data.pet.equip.appearance.name : 'n/a' : 'n/a',
              },
              gems: equipmentApi.data.hand.detail.added_gems.map((gem:string) => {
                return (gem as any).name || 'n/a'
              }),
              soulshields: [
                (equipmentApi.data.soulshield_1)? equipmentApi.data.soulshield_1.equip.item.name : 'n/a',
                (equipmentApi.data.soulshield_2)? equipmentApi.data.soulshield_2.equip.item.name : 'n/a',
                (equipmentApi.data.soulshield_3)? equipmentApi.data.soulshield_3.equip.item.name : 'n/a',
                (equipmentApi.data.soulshield_4)? equipmentApi.data.soulshield_4.equip.item.name : 'n/a',
                (equipmentApi.data.soulshield_5)? equipmentApi.data.soulshield_5.equip.item.name : 'n/a',
                (equipmentApi.data.soulshield_6)? equipmentApi.data.soulshield_6.equip.item.name : 'n/a',
                (equipmentApi.data.soulshield_7)? equipmentApi.data.soulshield_7.equip.item.name : 'n/a',
                (equipmentApi.data.soulshield_8)? equipmentApi.data.soulshield_8.equip.item.name : 'n/a',
              ],
            },
            stats: {
              hp: {
                value: abilitiesApi.data.total_ability.max_hp,
                regen: abilitiesApi.data.total_ability.hp_regen,
                regenCombat: abilitiesApi.data.total_ability.hp_regen_combat,
                recovery: abilitiesApi.data.total_ability.heal_power_value,
                recoveryRate: abilitiesApi.data.total_ability.heal_power_rate,
              },
              defense: {
                value: abilitiesApi.data.total_ability.defend_power_value,
                pvp: abilitiesApi.data.total_ability.pc_defend_power_value,
                boss: abilitiesApi.data.total_ability.boss_defend_power_value,
              },
              attackPower: {
                value: abilitiesApi.data.total_ability.attack_power_value,
                pvp: abilitiesApi.data.total_ability.pc_attack_power_value,
                boss: abilitiesApi.data.total_ability.boss_attack_power_value
              },
              critical: {
                value: abilitiesApi.data.total_ability.attack_critical_value,
                rate: abilitiesApi.data.total_ability.attack_critical_rate,
                damage: abilitiesApi.data.total_ability.attack_critical_damage_value,
                damageRate: abilitiesApi.data.total_ability.attack_critical_damage_rate,
              },
              mystic: {
                value: abilitiesApi.data.total_ability.attack_attribute_value,
                rate: abilitiesApi.data.total_ability.attack_attribute_rate, 
              },
              block: {
                value: abilitiesApi.data.total_ability.defend_parry_value,
                rate: abilitiesApi.data.total_ability.defend_parry_rate,
                reduction: abilitiesApi.data.total_ability.defend_parry_reduce_rate,
                enhancedBlock: abilitiesApi.data.total_ability.defend_parry_reduce_damage_value,
              },
              evasion: {
                value: abilitiesApi.data.total_ability.defend_dodge_value,
                rate: abilitiesApi.data.total_ability.defend_dodge_rate,
                counter: abilitiesApi.data.total_ability.counter_damage_reduce_rate,
              },
            },
          }
        } else {
          res.status(404).json({
            status: 404,
            body: {
              message: 'Not Found'
            }
          })
        }

        if (!db) {
          await CharacterModel.create(response);
        } else {
          await CharacterModel.findOneAndUpdate({name: query}, response);
        }

      } else {
        response = db;
      }

      console.log('Returning result');
      res.status(200).json({
        status: 200,
        body: {
          message: response
        },
      });
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
        res.status(500).json({
          status: 500,
          body: {
            message: err.message
          }
        })
      }
    }
  }
}

export const characterController = new CharacterController()