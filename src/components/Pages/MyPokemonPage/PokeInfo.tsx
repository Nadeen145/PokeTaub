import React from 'react';
import { render } from 'react-dom';
import '../../../App.css';
import { PokeCharacter } from '../../../types';
import { Battle } from '../BattlePage/Battle';


export interface PokeInfoProps {
    pokeCharacter: PokeCharacter,
    changePage(newPage: number): void,
}

export const PokeInfo: React.FC<PokeInfoProps> = ({
    pokeCharacter,
    changePage,
    
}) => {

    const colors = ['#FC6B6E','#2196F3','#094BE8','#2196F3','#3ED1E0','#CF9B48'];
 
    return(
      <div className='card-detail'>

        <div className="card-detail-features" >
          <div className="card-detail-featuresRight">
            <span>Type: {pokeCharacter.type}</span>
          </div>
          <div className="card-detail-featuresLeft">
            <span>Height: {pokeCharacter.height}</span>
            <span>Weight: {pokeCharacter.weight}</span>
          </div>
        </div>


        <div className="card-detail-description">
          <img className='card-detail-descriptionImage' src={pokeCharacter.image} alt="" />
          <h2 className='card-detail-descriptionName'>{pokeCharacter.name}</h2>
        </div>

          
        <div className="card-detail-other">
          <div className="card-detail-otherStats">
            <h4 className='card-detail-otherStatsTitle'>Stats:</h4>
              { 
                pokeCharacter.stats.map((stat: any, index)=> (
                  <div className='card-detail-otherStat' key={index}>
                    <div className='card-detail-otherStatContent'>
                      <span className='card-detail-otherStatContentPower'>{stat.stat.name}</span>
                      <span className='card-detail-otherStatContentValue'>{stat.base_stat}</span>
                    </div>
                    <div className='card-detail-otherStatTimeLine'>
                      {
                        stat.base_stat >= 100 ?  
                        <div className='card-detail-otherStatTimeLineStat' style={{width: '100%', backgroundColor: `${colors[index]}`}}></div> :
                        <div className='card-detail-otherStatTimeLineStat' style={{width: `${stat.base_stat}%`, backgroundColor: `${colors[index]}`}}></div>
                      }
                    </div>
                  </div>
                ))
              }
          </div>
        </div>


        <br></br>
        <button className='choose-poke-button' onClick={()=>changePage(1)} >
          I choose you!
        </button>

      </div>
    )
}
