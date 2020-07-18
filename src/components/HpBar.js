import React, { Component } from 'react'

export default class HpBar extends Component {
    render() {
        const hp = this.props.hp;
        return (
            // should take hp from props
            <div className="bar hp-bar">
                <div className="current"></div>
                <div className="max"></div>
                <p className="hp">{hp}/{hp}</p>
            </div>
        )
    }
}
