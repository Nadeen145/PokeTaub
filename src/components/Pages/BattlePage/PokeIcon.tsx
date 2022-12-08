import React from 'react';
import '../../../App.css';
import { PokeCharacter } from '../../../types';

export interface PokeIconProps {
    icon: PokeCharacter,
}

export const MyPokeIcon: React.FC<PokeIconProps> = ({
    icon,
}) => {
    const { name, image } = icon;
    return (                    
        <div className='icon'>
            <div className='icon-text'>{name}</div>
            {image ? <img src={image} alt={name} width="130" height="130" /> : null}
        </div>        
    );
}