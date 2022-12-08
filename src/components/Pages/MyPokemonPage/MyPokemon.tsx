import { render } from '@testing-library/react';
import { wait } from '@testing-library/user-event/dist/utils';
import { log } from 'console';
import React, { useEffect } from 'react';
import '../../../App.css';
import { PokeCharacter } from '../../../types';
import { Battle } from '../BattlePage/Battle';
import { PokeCard } from './PokeCard';
import { PokeInfo } from './PokeInfo';

export interface MyPokemonProps {
  poke_current_character: PokeCharacter,
  setPokeCurrentCharacter: React.Dispatch<React.SetStateAction<PokeCharacter>>;
  poke_characters: PokeCharacter[];
  setPokeCharacters: React.Dispatch<React.SetStateAction<PokeCharacter[]>>;
  changePage(newPage: number): void;
 
  flag:number
  setFlag: React.Dispatch<React.SetStateAction<number>>;
  count_for_id:number,
  setCountForId: React.Dispatch<React.SetStateAction<number>>;
}

export const MyPokemon: React.FC<MyPokemonProps> = ({
  poke_current_character,
  setPokeCurrentCharacter,
  poke_characters,
  setPokeCharacters,
  changePage,
  flag,
  setFlag,
  count_for_id,
  setCountForId
}) => {
 
  const addRandom3PokeCharacter = async() => {
    
    let randomNumber1 = (Math.floor(Math.random() * 151))+1;
    let randomNumber2 = (Math.floor(Math.random() * 151))+1;
    let randomNumber3 = (Math.floor(Math.random() * 151))+1;

    let newPokeCharacter1;
    let newPokeCharacter2;
    let newPokeCharacter3;

    try {
      newPokeCharacter1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber1}`);
      newPokeCharacter1 = await newPokeCharacter1.json();
      

      newPokeCharacter2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber2}`);
      newPokeCharacter2 = await newPokeCharacter2.json();


      newPokeCharacter3 = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomNumber3}`);
      newPokeCharacter3 = await newPokeCharacter3.json();

    } catch(e) {
      console.error(e);
    }     
      
  const newPoke1: PokeCharacter = {
    id: count_for_id,
    name: newPokeCharacter1.name,
    image: newPokeCharacter1.sprites.front_default,
    weight: newPokeCharacter1.weight,
    height: newPokeCharacter1.height,
    type: newPokeCharacter1.types[0].type.name,
    type_url:newPokeCharacter1.types[0].type.url,
    stats: newPokeCharacter1.stats,
    stat_hp:newPokeCharacter1.stats[0].base_stat,
    stat_attack:newPokeCharacter1.stats[1].base_stat,
    stat_defence:newPokeCharacter1.stats[2].base_stat,
    moves: newPokeCharacter1.moves,
    numMoves: (newPokeCharacter1.moves).length,
  }
      
  const newCharactersList1 = [...poke_characters, newPoke1];
  const newPoke2: PokeCharacter = {
    id: count_for_id+1,
    name: newPokeCharacter2.name,
    image: newPokeCharacter2.sprites.front_default,
    weight: newPokeCharacter2.weight,
    height: newPokeCharacter2.height,
    type: newPokeCharacter2.types[0].type.name,
    type_url:newPokeCharacter2.types[0].type.url,
    stats: newPokeCharacter2.stats,
    stat_hp:newPokeCharacter2.stats[0].base_stat,
    stat_attack:newPokeCharacter2.stats[1].base_stat,
    stat_defence:newPokeCharacter2.stats[2].base_stat,
    moves: newPokeCharacter2.moves,
    numMoves: newPokeCharacter2.moves.length,
  }

  const newCharactersList2 = [...newCharactersList1, newPoke2];
  const newPoke3: PokeCharacter = {
    id: count_for_id+2,
    name: newPokeCharacter3.name,
    image: newPokeCharacter3.sprites.front_default,
    weight: newPokeCharacter3.weight,
    height: newPokeCharacter3.height,
    type: newPokeCharacter3.types[0].type.name,
    type_url:newPokeCharacter3.types[0].type.url,
    stats: newPokeCharacter3.stats,
    stat_hp:newPokeCharacter3.stats[0].base_stat,
    stat_attack:newPokeCharacter3.stats[1].base_stat,
    stat_defence:newPokeCharacter3.stats[2].base_stat,
    moves: newPokeCharacter3.moves,
    numMoves: newPokeCharacter3.moves.length,
  }
  
  const newCharactersList3 = [...newCharactersList2, newPoke3];
  setPokeCharacters(newCharactersList3);
  setFlag(1)
  setCountForId(3)
  }

  useEffect(() => {
    if(flag == 0){
      addRandom3PokeCharacter();
    }
  }, []);
      
  return (
    <> 
      <div >
        <h2> Your Pokemons ({poke_characters.length}) </h2>
        <div className='flex-container'>
          {
            poke_characters.length > 0 ? 
              poke_characters.map((character,index)  => 
                <div key={character.id}>
                  <PokeCard key={character.id}
                   pokeCharacter={character}
                   pokeCurrentCharacter={poke_current_character}
                   setPokeCurrentCharacter={setPokeCurrentCharacter}  />
                </div>
              ) 
            :
              <>
                <h3 > You have lost all your Pokemon! Refresh for a new game </h3>
              </>
          }
        </div>
        <div className='vertical-line'>
          {
            poke_current_character.name != ""?
              <PokeInfo  pokeCharacter={poke_current_character} changePage={changePage} />
            :
              <div className='flex-container text'>
                Please select a pokemon 👈🏾 
              </div>
          }
        </div>
      </div>
    </>
  );
}
