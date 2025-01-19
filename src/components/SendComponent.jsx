import React from "react";

const SendModal = ({ show, text, onClose}) => {
    if (!show) return null;

    return (
        <div className="modal-overalCon" onClick={onClose}>
            <div className="modal-confirm" onClick={(e) => e.stopPropagation()}>
                <p className="confirmP">{text}</p>
                <div className="form-confirm">
                    <button className="buttonConfirm" onClick={onClose}>
                        Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SendModal;