import React, { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import addTokenToMetamask from "../metamask/addTokenToMetamask";
import isMetamaskInstalled from "../metamask/isMetamaskInstalled";

const ContributeForm = ({ drizzle, address, data }) => {
    const [value, setValue] = useState();
    const [validated, setValidated] = useState(false);
    const [loading, setLoading] = useState(false);

    const sendTx = async () => {
        setLoading(true);
        const userAddress = drizzle.store.getState().accounts[0];
        await drizzle.contracts[address].methods
            .contribute()
            .send({ from: userAddress, value: drizzle.web3.utils.toWei(value, "ether") });
        setLoading(false);
        await addTokenToMetamask(data.tokenAddress, data.tokenSymbol, data.imageURL);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (!form.checkValidity()) {
            setValidated(true);
            return;
        }

        setValidated(false);
        sendTx();
    };

    return (
        <Form noValidate validated={validated} onSubmit={onSubmit}>
            <Form.Group>
                <Form.Label>Amount</Form.Label>
                <Form.Control
                    required
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Enter Amount"
                    type="number"
                />
                <Form.Text className="text-muted">
                    Insert the amount you want to send to the Campaign contract
                </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={!isMetamaskInstalled()}>
                {loading && (
                    <>
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />{" "}
                    </>
                )}
                Contribute
            </Button>
        </Form>
    );
};

export default ContributeForm;
