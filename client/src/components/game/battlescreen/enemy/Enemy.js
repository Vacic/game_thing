import React from 'react';
import { connect } from 'react-redux';
import EnemyCard from './EnemyCard';
import Stats from '../stats/Stats';
import AttackSpeed from '../stats/AttackSpeed';

const Enemy = (props) => {
    const { name, hp, dmg, attSpd, def, eva } = props.gameData.currentEnemy;
    const { currentEnemyHp, loadingEnemy } = props.gameData;
    const { enemyHpBar, enemyAttProgressDiv, enemyDiv, enemyAttStatus } = props; // DOM element refs
    return (
        <div className="enemy" ref={enemyDiv}>
            <EnemyCard 
                currentEnemyHp={currentEnemyHp} 
                maxHp={hp} name={name} 
                enemyHpBar={enemyHpBar} 
                loadingEnemy={loadingEnemy}
                enemyAttStatus={enemyAttStatus}
            />
            <AttackSpeed attSpd={attSpd} enemyAttProgressDiv={enemyAttProgressDiv} />
            <Stats dmg={dmg} def={def} eva={eva} />
        </div>
    )
}

const mapStateToProps = state => ({
    gameData: state.gameData
});

export default connect(mapStateToProps)(Enemy);