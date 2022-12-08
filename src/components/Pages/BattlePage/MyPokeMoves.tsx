import React, { useEffect } from 'react';
import '../../../App.css';
import { PokeCharacter } from '../../../types';
import { MovesParameters } from '../../../types';
import { BattleResult } from './BattleResult';

export interface MyPokeMoveProps {
    poke_character: PokeCharacter,
    handleMove(move: number): void;
    movesParameters: MovesParameters,
    setMovesParameters: React.Dispatch<React.SetStateAction<MovesParameters>>,
    disable_for_butt:boolean,
    setButt:React.Dispatch<React.SetStateAction<boolean>>
    
}

export const MyPokeMoves: React.FC<MyPokeMoveProps> = ({
    poke_character,
    handleMove,
    movesParameters,
    setMovesParameters,
    disable_for_butt,
    setButt
   
}) => {

    let randomNumber1 = -1;
    let randomNumber2 = -1;
    let randomNumber3 = -1;
    let randomNumber4 = -1;
         
    const fetch_powers = async()=>{ 
      let numOfMoves = Number(poke_character.numMoves);
  
      if(numOfMoves >= 1){
        randomNumber1 = Math.floor(Math.random() * numOfMoves);
      }
  
      if(numOfMoves >= 2){
        randomNumber2 = Math.floor(Math.random() * numOfMoves);
        while(randomNumber1 == randomNumber2){
          randomNumber2 = Math.floor(Math.random() * numOfMoves);
        }
      }
  
      if(numOfMoves >= 3){
        randomNumber3 = Math.floor(Math.random() * numOfMoves);
        while((randomNumber1 == randomNumber3) || (randomNumber2 == randomNumber3)){
          randomNumber3 = Math.floor(Math.random() * numOfMoves);
        }
      }
  
      if(numOfMoves >= 4){
        randomNumber4 = Math.floor(Math.random() * numOfMoves);
        while((randomNumber1 == randomNumber4) || (randomNumber2 == randomNumber4) || (randomNumber3 == randomNumber4)){
          randomNumber4 = Math.floor(Math.random() * numOfMoves);
        }
      } 
        
      let newMove1 = null;
      let newMove2 = null;
      let newMove3 = null;
      let newMove4 = null;
  
      try {
          if(randomNumber1!==-1){
              newMove1 = await fetch(poke_character.moves[randomNumber1].move.url);
              newMove1 = await newMove1.json();
          }
  
          if(randomNumber2!==1){
              newMove2 = await fetch(poke_character.moves[randomNumber2].move.url);
              newMove2 = await newMove2.json();
          }
  
          if(randomNumber3!==-1){
              newMove3 = await fetch(poke_character.moves[randomNumber3].move.url);
              newMove3 = await newMove3.json();
            }
  
          if(randomNumber4!==-1){
              newMove4 = await fetch(poke_character.moves[randomNumber4].move.url);
              newMove4 = await newMove4.json();
          }
      }catch(e){
        console.error(e);
      }
  
      const newMoves: MovesParameters={
        name1: randomNumber1!==-1? poke_character.moves[randomNumber1].move.name:null,
        name2: randomNumber2!==-1? poke_character.moves[randomNumber2].move.name:null,
        name3: randomNumber3!==-1? poke_character.moves[randomNumber3].move.name:null,
        name4: randomNumber4!==-1? poke_character.moves[randomNumber4].move.name:null,
  
        MP1: newMove1!==null? (newMove1.power!==null?newMove1.power:0):-1,
        MP2: newMove2!==null? (newMove2.power!==null?newMove2.power:0):-1,
        MP3: newMove3!==null? (newMove3.power!==null?newMove3.power:0):-1,
        MP4: newMove4!==null? (newMove4.power!==null?newMove4.power:0):-1,

        PA:poke_character.stat_attack,
        PD:poke_character.stat_defence,
      }
      
        
      setMovesParameters(newMoves)
    }
          
    useEffect(() => {
      fetch_powers();
    }, []); 
          
    return (      
        <>  
        {
          ((movesParameters.MP1 == -1) && (movesParameters.MP2 == -1) &&
          (movesParameters.MP3 == -1) && (movesParameters.MP4 == -1))?
            <div className='container-text'>
              Loading...
            </div>
          :
            <>
              <div className='flex-container-moves'>     
                  <div>
                  {
                      movesParameters.MP1 != -1? 
                      <button className='move-button' id='butt' onClick={()=>handleMove(movesParameters.MP1)} disabled={disable_for_butt}>
                          <h4>
                              {movesParameters.name1} ({movesParameters.MP1})
                          </h4> 
                      </button>
                      :
                      <></>
                  }
                  </div> 
                  <div>
                  {
                      movesParameters.MP2 != -1? 
                      <button className='move-button' id='butt' onClick={()=>handleMove(movesParameters.MP2)} disabled={disable_for_butt}>
                          <h4>
                              {movesParameters.name2} ({movesParameters.MP2})
                          </h4> 
                      </button>
                      :
                      <></>
                  }
                  </div>    
              </div> 

              <div className='flex-container-moves'>     
                  <div>
                  {
                      movesParameters.MP3 != -1?
                      <button className='move-button' id='butt' onClick={()=>handleMove(movesParameters.MP3)} disabled={disable_for_butt}>
                          <h4>
                              {movesParameters.name3} ({movesParameters.MP3})
                          </h4>         
                      </button>
                      :
                      <></>
                  }
                  </div> 
                  <div>
                  {
                      movesParameters.MP4 != -1? 
                      <button className='move-button' id='butt' onClick={()=>handleMove(movesParameters.MP4)} disabled={disable_for_butt}>
                          <h4>
                              {movesParameters.name4} ({movesParameters.MP4})
                          </h4> 
                      </button>
                      :
                      <></>
                  }
                  </div>    
              </div>    
            </>
        }
      </>
    );
}
