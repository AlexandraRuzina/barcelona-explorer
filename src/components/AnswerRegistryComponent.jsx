import React from "react";
import '../styles/AnswerRegistryComponent.css';

const AnswerRegistryModal = ({ show, text, onAction, buttonText}) => {
    if (!show) return null;

    return (
        <div className="modal-overalAns">
            <div className="modal-answer" onClick={(e) => e.stopPropagation()}>
                <p className="confirmAns">{text}</p>
                <div className="form-Ans">
                    <button className="buttonAns" onClick={onAction}>
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AnswerRegistryModal;