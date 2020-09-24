import React from 'react';
import ActionButtons from './ActionButtons.js';
import Enemy from './enemy/Enemy.js';
import Player from './player/Player.js';

const BattleScreen = React.memo(({ playerAttProgressDiv, playerHpBar, playerDiv, enemyHpBar, enemyDiv, enemyAttProgressDiv, playerAttStatus, enemyAttStatus, handleUseItem, stopCombat }) => {
    return (
        <div className="battle-screen">
            <Player
                playerAttProgressDiv={playerAttProgressDiv}
                playerHpBar={playerHpBar}
                playerDiv={playerDiv}
                playerAttStatus={playerAttStatus}
                handleUseItem={handleUseItem}
            />

            <Enemy
                enemyHpBar={enemyHpBar}
                enemyDiv={enemyDiv}
                enemyAttProgressDiv={enemyAttProgressDiv}
                enemyAttStatus={enemyAttStatus}
            />

            <ActionButtons stopCombat={stopCombat} />
        </div>
    )
});

export default BattleScreen;