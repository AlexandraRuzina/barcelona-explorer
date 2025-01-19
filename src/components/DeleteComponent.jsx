import React from "react";
import '../styles/DeleteComponent.css';

const DeleteModal = ({ show, onClose, onConfirm }) => {
    if (!show) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <p>Are you sure you want to delete this item?</p>
                    <button className="buttonDelete" onClick={onConfirm}>
                        Yes
                    </button>
                    <button className="buttonDelete" onClick={onClose}>
                        No
                    </button>
            </div>
        </div>
    );
};

export default DeleteModal;

