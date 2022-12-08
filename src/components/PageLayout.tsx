import React from 'react';
import '../App.css';
import { PokeCharacter } from '../types';
import Battle from './/Pages/BattlePage/Battle';
import { MyPokemon } from './Pages/MyPokemonPage/MyPokemon';


export interface PageLayoutProps {
    page: number;
    pokeCharacter: PokeCharacter;
    setPokeCurrentCharacter: React.Dispatch<React.SetStateAction<PokeCharacter>>;
    poke_characters: PokeCharacter[];
    setPokeCharacters: React.Dispatch<React.SetStateAction<PokeCharacter[]>>;
    poke_oppenent_character: PokeCharacter;
    setPokeOpponentCharacter: React.Dispatch<React.SetStateAction<PokeCharacter>>;
    changePage(newPage: number): void;
    flag:number,
    setFlag: React.Dispatch<React.SetStateAction<number>>;
    count_for_id:number,
    setCountForId: React.Dispatch<React.SetStateAction<number>>;

}
export const PageLayout: React.FC<PageLayoutProps> = ({
    page,
    pokeCharacter,
    setPokeCurrentCharacter,
    poke_characters,
    setPokeCharacters,
    poke_oppenent_character,
    setPokeOpponentCharacter,
    changePage,
    flag,
    setFlag,
    count_for_id,
    setCountForId
}) => {

    switch(page) { 
        case 0:
          return <MyPokemon 
            poke_current_character = {pokeCharacter}    
            setPokeCurrentCharacter = {setPokeCurrentCharacter}
            poke_characters = {poke_characters} 
            setPokeCharacters = {setPokeCharacters}
            changePage = {changePage}
            flag={flag}
            setFlag={setFlag}
            count_for_id={count_for_id}
            setCountForId={setCountForId}

        />       
        case 1:
            return <Battle 
             myPokeCharacter = {pokeCharacter} 
             setPokeCurrentCharacter = {setPokeCurrentCharacter}
             poke_characters = {poke_characters} 
             setPokeCharacters = {setPokeCharacters} 
             oppenentPokecharacter = {poke_oppenent_character}
             setPokeOpponentCharacter = {setPokeOpponentCharacter}
             changePage = {changePage}
             count_for_id={count_for_id}
             setCountForId={setCountForId}
             />
        default:
            return null;            
    }
}