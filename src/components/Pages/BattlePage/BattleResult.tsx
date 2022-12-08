import React from 'react';
import '../../../App.css';
import { PokeCharacter } from '../../../types';

export interface BattleResProps {
    total_power_my_poke: number,
    total_power_opp:number,
    handleButtonClick(): void, 
    isTotalPowerCalculated: boolean,
}

export const BattleResult: React.FC<BattleResProps> = ({
    total_power_my_poke,
    total_power_opp,
    handleButtonClick,
    isTotalPowerCalculated,
}) => {
    return (  
        <div className='result'>                  
            TOTAL POWERS: 
            <br></br>
            ✴ YOUR POKEMON TOTAL POWER IS: {total_power_my_poke} 
            <br></br>
            ✴ YOU OPPONENT TOTAL POWER IS: {total_power_opp} 
            <br></br>
            {
                isTotalPowerCalculated == true?
                    (total_power_my_poke >= total_power_opp)? 
                        <>
                            <h1>You Win!! 👏🏾 </h1>
                            <button className='move-button' onClick={handleButtonClick}> click here continue the game</button>
                        </>
                    :
                        <>
                            <h1>You loose </h1> 
                            <button className='move-button' onClick={handleButtonClick}> click here continue the game</button>
                        </>
                :
                <></>
            }            
        </div>    
    );
}