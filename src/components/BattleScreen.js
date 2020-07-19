import React from 'react';
import Enemy from './Enemy';
import Player from './Player';

export default function BattleScreen(props) {
    const enemy = props.enemy;
    return (
        <div className="battle-screen">
            <Player />
            <Enemy enemy={enemy} />
        </div>
    )
}