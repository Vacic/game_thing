import React, { Component } from 'react';

export default class Equipment extends Component {
    render() {
        return (
            <div className="equipment">
                <h3>Equipment</h3>
                
                <div className="equipment-slots">
                    <div className="helmet"></div>
                    <div className="weapon"></div>
                    <div className="armor"></div>
                    <div className="shield"></div>
                    <div className="pants"></div>
                    <div className="boots"></div>
                </div>
            </div>
        )
    }
}
