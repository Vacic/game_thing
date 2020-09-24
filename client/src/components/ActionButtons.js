import React from 'react'

const ActionButtons = ({ stopCombat }) => {
    return (
        <div className="action-buttons">
            <button className="stop-combat-btn danger" onClick={() => stopCombat()}>Run Away</button>
        </div>
    )
}

export default ActionButtons
