import React from 'react';
import Enemy from './enemy/Enemy.js';
import Player from './player/Player.js';

export default function BattleScreen({ playerAttProgressDiv, playerHpBar, playerDiv, enemyHpBar, enemyDiv, enemyAttProgressDiv, playerAttStatus, enemyAttStatus }) {
    return (
        <div className="battle-screen">
            <Player
                playerAttProgressDiv={playerAttProgressDiv}
                playerHpBar={playerHpBar}
                playerDiv = {playerDiv}
                playerAttStatus = {playerAttStatus}
            />

            <Enemy
                enemyHpBar={enemyHpBar}
                enemyDiv={enemyDiv}
                enemyAttProgressDiv={enemyAttProgressDiv}
                enemyAttStatus = {enemyAttStatus}
            />
        </div>
    )
}