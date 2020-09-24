import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import isMetamaskInstalled from "./isMetamaskInstalled";

const MetamaskOnboardingModal = ({ show }) => {
    const history = useHistory();
    return (
        <Modal
            show={show}
            backdrop="static"
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    MetaMask Alert
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>You need MetaMask in order to interact with the Ethereum Blockchain</p>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={() => {
                        history.push("/");
                    }}
                >
                    Go back
                </Button>
                <Button
                    onClick={() => {
                        isMetamaskInstalled(true);
                    }}
                >
                    Install MetaMask
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default MetamaskOnboardingModal;
