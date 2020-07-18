import React from 'react';
import Enemy from './Enemy';
import Player from './Player';

export default function BattleScreen() {
    return (
        <div className="battle-screen">
            <Player />
            <Enemy />
        </div>
    )
}