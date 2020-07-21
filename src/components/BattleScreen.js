import React from 'react';
import Enemy from './Enemy';
import Player from './Player';

export default function BattleScreen(props) {
    const { player, enemy, currentEnemyHp, currentPlayerHp } = props;
    return (
        <div className="battle-screen">
            <Player player={player} currentPlayerHp={currentPlayerHp} attProgress={props.attProgress} />
            <Enemy enemy={enemy} currentEnemyHp={currentEnemyHp} enemyHpBar={props.enemyHpBar} enemyDiv={props.enemyDiv} />
        </div>
    )
}