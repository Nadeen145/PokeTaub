
import React from 'react';
import {MyPokemon} from './components/Pages/MyPokemonPage/MyPokemon';
import './App.css';
import { PokeCharacter } from './types';
import { PageLayout } from './components/PageLayout';


function App() {
  const [poke_current_character, setPokeCurrentCharacter] = React.useState<PokeCharacter>({id:-1, name:"", moves:[], stats:[],type_url:"",stat_attack:-1,stat_defence:-1});
  const [poke_characters, setPokeCharacters] = React.useState<PokeCharacter[]>([]);
  const[poke_oppenent_character,setPokeOpponentCharacter]=React.useState<PokeCharacter>({id: -1, name:"", moves:[], stats:[],type_url:"",stat_attack:-1,stat_defence:-1});
  const[flag, setFlag] = React.useState<number>(0);
  const[count_for_id, setCountForId] = React.useState<number>(0);
  const [page, setPage] = React.useState<number>(0);
  const changePage = (newPage: number) => {
    setPage(newPage);   
  }

  return (
    <div className="root">
      
        <PageLayout 
          page={page} 
          pokeCharacter={poke_current_character} 
          setPokeCurrentCharacter={setPokeCurrentCharacter} 
          poke_characters={poke_characters}
          setPokeCharacters={setPokeCharacters}
          changePage={changePage}
          poke_oppenent_character={poke_oppenent_character}
          setPokeOpponentCharacter={setPokeOpponentCharacter}
          flag={flag}
          setFlag={setFlag}
          count_for_id={count_for_id}
          setCountForId={setCountForId}
        />

    </div>
  );
}

export default App;
