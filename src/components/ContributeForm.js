import React, { useState } from "react";
import { Button, Form, InputGroup, Spinner } from "react-bootstrap";
import isMetamaskInstalled from "../metamask/isMetamaskInstalled";

const ContributeForm = ({ drizzle, address, data }) => {
    const [value, setValue] = useState({ eth: "", token: "" });
    const [validated, setValidated] = useState(false);
    const [loading, setLoading] = useState(false);

    const sendTx = async () => {
        setLoading(true);
        const userAddress = drizzle.store.getState().accounts[0];
        await drizzle.contracts[address].methods.contribute().send({
            from: userAddress,
            value: drizzle.web3.utils.toWei(String(value.eth), "ether"),
        });
        setLoading(false);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (!form.checkValidity()) {
            console.log("invalid");
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
                <InputGroup className="mb-3">
                    <Form.Control
                        required
                        value={value.eth}
                        onChange={(e) =>
                            setValue({
                                eth: e.target.value,
                                token: e.target.value / data.tokenPrice,
                            })
                        }
                        placeholder="Enter ETH amount"
                        type="number"
                    />
                    <InputGroup.Append>
                        <InputGroup.Text>ETH</InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
                <InputGroup className="mb-3">
                    <Form.Control
                        required
                        value={value.token}
                        onChange={(e) =>
                            setValue({
                                eth: e.target.value * data.tokenPrice,
                                token: e.target.value,
                            })
                        }
                        placeholder={`Enter ${data.tokenSymbol} amount`}
                        type="number"
                    />
                    <InputGroup.Append>
                        <InputGroup.Text>{data.tokenSymbol}</InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
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
