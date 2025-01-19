import React from "react";
import '../styles/ConfirmComponent.css';

const ConfirmModal = ({ show, text, onClose, onConfirm }) => {
    if (!show) return null;

    return (
        <div className="modal-overalCon" onClick={onClose}>
            <div className="modal-confirm" onClick={(e) => e.stopPropagation()}>
                <p className="confirmP">{text}</p>
                <div className="form-confirm">
                    <button className="buttonConfirm" onClick={onConfirm}>
                        Edit Item
                    </button>
                    <button className="buttonConfirm" onClick={onClose}>
                        Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;