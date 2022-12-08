import React, { useEffect } from 'react';
import '../../../App.css';
import { PokeCharacter } from '../../../types';
import {MovesParameters} from '../../../types';
import { BattleResult } from './BattleResult';
import { MyPokeIcon } from './PokeIcon';
import { OppenentPokeMoves } from './OppenentPokeMoves';
import { MyPokeMoves } from './MyPokeMoves';

export interface BattleProps {
  myPokeCharacter: PokeCharacter,
  setPokeCurrentCharacter: React.Dispatch<React.SetStateAction<PokeCharacter>>;

  oppenentPokecharacter: PokeCharacter;
  setPokeOpponentCharacter: React.Dispatch<React.SetStateAction<PokeCharacter>>;

  poke_characters: PokeCharacter[];
  setPokeCharacters: React.Dispatch<React.SetStateAction<PokeCharacter[]>>;
  changePage(newPage: number): void;
  
  count_for_id:number,
  setCountForId: React.Dispatch<React.SetStateAction<number>>;
}

export const Battle: React.FC<BattleProps> = ({
    myPokeCharacter,
    setPokeCurrentCharacter,
    poke_characters,
    setPokeCharacters,
    changePage,
    
    oppenentPokecharacter,
    setPokeOpponentCharacter,
    count_for_id,
    setCountForId

  
}) => {
  const[disable_for_butt, setButt] = React.useState<boolean>(false)
  const[myMovesParameters, setMyMovesParameters] = React.useState<MovesParameters>(
    {
      name1:"", name2:"", name3:"", name4:"",
      MP1:-1, MP2:-1, MP3:-1, MP4:-1,
      PA:-1, PD:-1
    }
  );
  const[oppMovesParameters, setOppMovesParameters] = React.useState<MovesParameters>(
    {
      name1:"", name2:"", name3:"", name4:"",
      MP1:-1, MP2:-1, MP3:-1, MP4:-1,
      PA:-1, PD:-1
    }
  );
  const[total_power_my_poke, setTotalPowerMyPoke] = React.useState<number>(0);
  const[total_power_opp, setTotalPowerOpp] = React.useState<number>(0);
  const[isTotalPowerCalculated, setIsTotalPowerCalculated] = React.useState<boolean>(false);
  const[flag, setFlag] = React.useState<number>(0);
  
  const handleButtonClick = ()=>{
    if(total_power_my_poke>=total_power_opp){
      const  temp_list = [...poke_characters, oppenentPokecharacter];
      setPokeCharacters(temp_list)
      setPokeCurrentCharacter({id:-1, name:"", moves:[], stats:[],type_url:"",stat_attack:-1,stat_defence:-1})
      changePage(0)
    }else{
      const index = poke_characters.indexOf(myPokeCharacter, 0);
      if (index > -1) {
        poke_characters.splice(index, 1);
      }
      setPokeCharacters(poke_characters)
      setPokeCurrentCharacter({id:-1, name:"", moves:[], stats:[],type_url:"",stat_attack:-1,stat_defence:-1})
      changePage(0)
    }
  }
  
  const handleMove = async (power_my_poke:number)=>{ 
    setButt(true)
    setFlag(1);
    let newStatMyPoke;
    let newStatOppPoke;

    let double_to_poke;
    let half_to_poke;
    let no_to_poke;
    let TF_poke;
   

    let double_to_opp;
    let half_to_opp;
    let no_to_opp;
    let TF_opp;
   
    try{
      newStatMyPoke=await fetch(myPokeCharacter.type_url);
      newStatMyPoke=await newStatMyPoke.json();
      double_to_poke=newStatMyPoke.damage_relations.double_damage_to;
      half_to_poke=newStatMyPoke.damage_relations.half_damage_to;
      no_to_poke=newStatMyPoke.damage_relations.no_damage_to;
    
      let TF_poke_flag = double_to_poke.some((obj :any) => {
        return obj.name ===oppenentPokecharacter.type;
      });

      if(TF_poke_flag===true){
        TF_poke=2;
      }
      else{
        TF_poke_flag = half_to_poke.some((obj :any) => {
          return obj.name === oppenentPokecharacter.type;
        });
        if(TF_poke_flag===true){
          TF_poke=0.5;
        }
        else{
          TF_poke_flag = no_to_poke.some((obj :any) => {
            return obj.name === oppenentPokecharacter.type;
          });
          if(TF_poke_flag===true){
            TF_poke=0;
          }
          else{
            TF_poke=1;
          }
        }
      }

      newStatOppPoke=await fetch(oppenentPokecharacter.type_url);
      newStatOppPoke=await newStatOppPoke.json();
      double_to_opp=newStatOppPoke.damage_relations.double_damage_to;
      half_to_opp=newStatOppPoke.damage_relations.half_damage_to;
      no_to_opp=newStatOppPoke.damage_relations.no_damage_to;

      let TF_opp_flag = double_to_opp.some((obj :any) => {
        return obj.name === myPokeCharacter.type;
      });
      if(TF_opp_flag===true){
        TF_opp=2;
      }
      else{
        TF_opp_flag = half_to_opp.some((obj :any) => {
          return obj.name === myPokeCharacter.type;
        });
        if(TF_opp_flag===true){
          TF_opp=0.5;
        }
        else{
          TF_opp_flag = no_to_opp.some((obj :any) => {
            return obj.name === myPokeCharacter.type;
          });
          if(TF_opp_flag===true){
            TF_opp=0;
          }
          else{
            TF_opp=1;
          }
        }
      }
    
      let total_power_my_poke= (power_my_poke+myPokeCharacter.stat_attack)*TF_poke - oppenentPokecharacter.stat_defence;
      setTotalPowerMyPoke(total_power_my_poke)
        
      let count_of_moves_of_opponent=0;
      if( oppMovesParameters.MP1!==-1){
        count_of_moves_of_opponent++;
      }
      if( oppMovesParameters.MP2!==-1){
        count_of_moves_of_opponent++;
      }
      if( oppMovesParameters.MP3!==-1){
        count_of_moves_of_opponent++;
      }
      if( oppMovesParameters.MP4!==-1){
        count_of_moves_of_opponent++;
      }

      let power_opp=0;
      let randomNumber = Math.floor(Math.random() * count_of_moves_of_opponent);
      power_opp= randomNumber===0?oppMovesParameters.MP1:
      randomNumber===1?oppMovesParameters.MP2:
      randomNumber===2?oppMovesParameters.MP3:
      randomNumber===3?oppMovesParameters.MP4:0;

      let total_power_opp=(power_opp+oppenentPokecharacter.stat_attack)*TF_opp -myPokeCharacter.stat_defence;
      setTotalPowerOpp(total_power_opp)
    } catch(e) {
      console.error(e);
    } 
    setIsTotalPowerCalculated(true);   
  }

  const addOpponentPokemon = async() => {
    let randomNumber = (Math.floor(Math.random() * 151))+1;
    
    let newPokeCharacter;
    let newStat;
        
    try {
      newPokeCharacter = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber}`);
      newPokeCharacter = await newPokeCharacter.json();
    } catch(e) {
      console.error(e);
    }    
     
    const newPoke: PokeCharacter = {
      id: count_for_id,
      name: newPokeCharacter.name,
      image: newPokeCharacter.sprites.front_default,
      weight: newPokeCharacter.weight,
      height: newPokeCharacter.height,
      type: newPokeCharacter.types[0].type.name,
      type_url:newPokeCharacter.types[0].type.url,
      stats: newPokeCharacter.stats,
      stat_hp:newPokeCharacter.stats[0].base_stat,
      stat_attack:newPokeCharacter.stats[1].base_stat,
      stat_defence:newPokeCharacter.stats[2].base_stat,
      moves: newPokeCharacter.moves,
      numMoves:newPokeCharacter.moves.length,  
    }

    setPokeOpponentCharacter(newPoke);
    setCountForId(count_for_id+1)
  }
     
  useEffect(() => {
    setIsTotalPowerCalculated(false);
    addOpponentPokemon();
  }, []);

  return (   
    <>  
      <h2>Battle</h2>
                      
      <div className='flex-container-profile'>
        <div>
          <div className='text'>
            Your Enemy :
          </div>
          <MyPokeIcon icon={oppenentPokecharacter} />
        </div>
 
        {
          oppenentPokecharacter.id == -1?
            <h4> Loading... </h4> 
          :
            <div className='moves'>
              <OppenentPokeMoves poke_character={oppenentPokecharacter}
                handleMove={handleMove}
                movesParameters={oppMovesParameters}
                setMovesParameters={setOppMovesParameters} />
            </div>
        }
      </div>

      { 
        flag !== 0?
          <BattleResult total_power_my_poke={total_power_my_poke}
            total_power_opp={total_power_opp}
            handleButtonClick={handleButtonClick}
            isTotalPowerCalculated={isTotalPowerCalculated}
          />
        :
          <div className='result'>  
            choose a move from your moves pokemon 👇🏾👇🏾
          </div>
      }
             
      <div className= 'flex-container-profile'>
        {
          myPokeCharacter.id == -1?
            <h3> Loading... </h3>
          :
            <div className='moves'>
              <MyPokeMoves poke_character={myPokeCharacter}
                handleMove={handleMove}
                movesParameters={myMovesParameters}
                setMovesParameters={setMyMovesParameters}
                disable_for_butt={disable_for_butt}
                setButt={setButt} />
            </div>
        }

        <div>
          <div className='text'>
            Your Pokemon:
          </div>
          <MyPokeIcon icon={myPokeCharacter} />
        </div>
      </div>
    </>     
  );
}

export default Battle;