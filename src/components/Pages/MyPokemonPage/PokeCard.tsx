
import React from 'react';
import '../../../App.css';
import { PokeCharacter } from '../../../types';

export interface PokeCardProps {
    pokeCharacter: PokeCharacter,
    pokeCurrentCharacter: PokeCharacter,
    setPokeCurrentCharacter: React.Dispatch<React.SetStateAction<PokeCharacter>>;
}

export const PokeCard: React.FC<PokeCardProps> = ({
    pokeCharacter,
    pokeCurrentCharacter,
    setPokeCurrentCharacter,
}) => {

    const { name, image } = pokeCharacter;

    const setPokeCurrentCharacterAfterClick = () =>{
        const btnPokeCharacter = document.getElementById('btn'+pokeCharacter.name);
        const btnPokeCurrentCharacter = document.getElementById('btn'+pokeCurrentCharacter.name);

        if(pokeCharacter.name == pokeCurrentCharacter.name){
            setPokeCurrentCharacter({id: -1, name:"", moves:[], stats:[],type_url:"",stat_attack:-1,stat_defence:-1});
            if(btnPokeCharacter != null){
                btnPokeCharacter.style.backgroundColor = 'rgb(25, 84, 124)';
            }
        } else{
            setPokeCurrentCharacter(pokeCharacter);
            if(btnPokeCharacter != null){
                btnPokeCharacter.style.backgroundColor = 'rgb(140, 15, 15)';
            }
            if(btnPokeCurrentCharacter != null){
                btnPokeCurrentCharacter.style.backgroundColor = 'rgb(25, 84, 124)';
            }
        }
    }

    return (                  
        <button id={'btn'+pokeCharacter.name} className='poke-button' onClick={setPokeCurrentCharacterAfterClick}>
            {image ? <img src={image} alt={name} width="100%" height="100%" /> : null}
        </button>
    );
}