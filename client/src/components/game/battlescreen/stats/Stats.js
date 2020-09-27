import React from 'react';

const Stats = ({ dmg, def, eva }) =>
    <div className="stats">
        <h3>Stats:</h3>
        <p>Damage: <span>{ dmg }</span></p>            
        <p>Defense: <span>{ def }</span></p>            
        <p>Evasion: <span>{ eva }</span></p>           
    </div>

export default Stats;
