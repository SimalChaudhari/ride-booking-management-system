import React from 'react';
import Button from './Button';

function ConfirmationDialog({ isOpen, message, onConfirm, onCancel }) {
    const dialogStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9999,
        visibility: isOpen ? 'visible' : 'hidden',
        opacity: isOpen ? 1 : 0,
        transition: 'visibility 0s linear 0.25s, opacity 0.25s',
    };

    const contentStyle = {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '4px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)',
    };

    const buttonContainerStyle = {
        display: 'flex',
        justifyContent: 'flex-end',
    };

    const buttonStyle = {
        marginLeft: '10px',
    };

    return (
        <div style={dialogStyle}>
            <div style={contentStyle}>
                <h3>Confirmation</h3>
                <p>{message}</p>
                <div style={buttonContainerStyle}>
                    <Button style={buttonStyle} className="danger" onClick={onConfirm} text="Confirm" />
                    <Button style={buttonStyle} className="secondary" onClick={onCancel} text="Cancel" />
                </div>
            </div>
        </div>
    );
}

export default ConfirmationDialog;
