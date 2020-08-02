import React from 'react'

export default function Stats({ dmg, def, eva }) {
    return (
        <div className="stats">
            <h3>Stats:</h3>
            <p>Damage: <span>{dmg}</span></p>            
            <p>Defense: <span>{def}</span></p>            
            <p>Evasion: <span>{eva}</span></p>           
        </div>
    )
}
