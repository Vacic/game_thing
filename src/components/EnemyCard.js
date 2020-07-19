import React from 'react';
import HpBar from './HpBar';

export default function EnemyCard(props) {
    const fixName = (name) => {
        return name.replace('_', ' ');
    }
    const {hp, name} = props;
    return (
        <div className="enemy-card">
            <p className="name">{fixName(name)}</p>
            <HpBar hp={hp} />
            <img src="https://via.placeholder.com/150" alt=""/>
        </div>
    )
}
