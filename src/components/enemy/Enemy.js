import React from 'react';
import EnemyCard from './EnemyCard';
import Stats from '../stats/Stats';
import AttackSpeed from '../stats/AttackSpeed';

export default function Enemy(props) {
    const { name, hp, dmg, attSpd, def, eva } = props.enemy;
    const { currentEnemyHp, enemyHpBar, loadingEnemy, enemyAttProgressDiv, enemyDiv } = props;
    return (
        <div className="enemy" ref={enemyDiv}>
            <EnemyCard currentEnemyHp={currentEnemyHp} maxHp={hp} name={name} enemyHpBar={enemyHpBar} loadingEnemy={loadingEnemy} />
            <AttackSpeed attSpd={attSpd} enemyAttProgressDiv={enemyAttProgressDiv} />
            <Stats dmg={dmg} def={def} eva={eva} />
        </div>
    )
}
