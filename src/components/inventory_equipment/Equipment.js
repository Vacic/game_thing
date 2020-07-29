import React, { Component } from 'react'

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

                    {/* <img className="helmet" alt=""></img>
                    <img className="weapon" alt=""></img>
                    <img className="armor" alt=""></img>
                    <img className="shield" alt=""></img>
                    <img className="pants" alt=""></img>
                    <img className="boots" alt=""></img> */}
                </div>
            </div>
        )
    }
}
