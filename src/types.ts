
export interface PokeCharacter {
    id: number;
    name?: string;
    image?: string;
    type?: string;
    type_url:string;
    height?: string;
    weight?: string;
    stats: [];
    stat_hp?:number
    stat_attack:number
    stat_defence:number
    moves: Array<any>;
    numMoves?:number 
    

}

export interface MovesParameters{
    name1: string,
    name2: string,
    name3: string,
    name4: string,

    MP1:number,
    MP2:number,
    MP3:number,
    MP4:number,

    
    PD:number,//defense
    PA:number,//attack
}

