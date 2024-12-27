import React from "react";
import { Modal, Button } from "react-bootstrap";
import { motion } from "framer-motion";

const SuccessModal = ({ show, onHide, title, message, actionButtonText, onAction }) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.5 }}
                    style={{ textAlign: "center" }}
                >
                    <i className="fa fa-check-circle" style={{ color: "green", fontSize: "3rem", marginBottom: "15px" }}></i>
                    <p>{message}</p>
                </motion.div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={onAction}>
                    {actionButtonText}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SuccessModal;
