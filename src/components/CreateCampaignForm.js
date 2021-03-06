import React, { useState } from "react";
import { Button, Col, Form, InputGroup, Row, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function CreateCampaignForm({ drizzle }) {
    const [formData, setFormData] = useState({
        title: "",
        subTitle: "",
        imageURL: "",
        description: "",
        tokenPrice: "",
        tokenName: "",
        tokenSymbol: "",
        tokenMaxSupply: "",
        fundingDays: "",
    });
    const [validated, setValidated] = useState(false);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const sendTx = async () => {
        setLoading(true);
        await drizzle.contracts.CampaignFactory.methods
            .createCampaign(
                drizzle.web3.utils.toWei(formData.tokenPrice, "ether"),
                `${formData.title}%%%%%${formData.subTitle}`,
                formData.imageURL,
                formData.description,
                drizzle.web3.utils.toWei(formData.tokenMaxSupply, "ether"),
                formData.tokenName,
                formData.tokenSymbol,
                parseInt(formData.fundingDays) * 86400,
            )
            .send();
        setLoading(false);
        history.push("/");
    };

    const handleChange = (event, field) => {
        const value = event.target.value;
        setFormData((old) => {
            return { ...old, [field]: value };
        });
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
                <Form.Label>Title</Form.Label>
                <Form.Control
                    required
                    value={formData.title}
                    onChange={(e) => handleChange(e, "title")}
                    placeholder="Enter Title"
                    type="text"
                />
                <Form.Text className="text-muted">
                    Insert the title of your Campaign
                </Form.Text>
            </Form.Group>

            <Form.Group>
                <Form.Label>Subtitle</Form.Label>
                <Form.Control
                    required
                    value={formData.subTitle}
                    onChange={(e) => handleChange(e, "subTitle")}
                    placeholder="Enter subTitle"
                    type="text"
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                    required
                    as="textarea"
                    rows="3"
                    placeholder="Enter Campaign description"
                    onChange={(e) => handleChange(e, "description")}
                    value={formData.description}
                    type="text"
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                    required
                    placeholder="Enter main image URL"
                    onChange={(e) => handleChange(e, "imageURL")}
                    value={formData.imageURL}
                    type="url"
                />
            </Form.Group>

            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>Token price</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control
                                required
                                placeholder="Enter token price"
                                onChange={(e) => handleChange(e, "tokenPrice")}
                                value={formData.tokenPrice}
                                type="number"
                                min="0.0000000001"
                                step="0.0000000001"
                            />
                            <InputGroup.Append>
                                <InputGroup.Text id="basic-addon2">ETH</InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>Token name</Form.Label>

                        <Form.Control
                            required
                            placeholder="Enter token name"
                            onChange={(e) => handleChange(e, "tokenName")}
                            value={formData.tokenName}
                            type="text"
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>Token symbol</Form.Label>
                        <Form.Control
                            required
                            placeholder="Enter token symbol"
                            onChange={(e) => handleChange(e, "tokenSymbol")}
                            value={formData.tokenSymbol}
                            type="text"
                            maxLength="5"
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>Token max supply</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control
                                required
                                placeholder="Enter token max supply"
                                onChange={(e) => handleChange(e, "tokenMaxSupply")}
                                value={formData.tokenMaxSupply}
                                type="number"
                                step="1"
                                min="1"
                            />
                            <InputGroup.Append>
                                <InputGroup.Text id="basic-addon2">
                                    {formData.tokenSymbol}
                                </InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>Funding Days</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control
                                required
                                placeholder="Enter funding days"
                                onChange={(e) => handleChange(e, "fundingDays")}
                                value={formData.fundingDays}
                                type="number"
                                step="1"
                                min="1"
                            />
                            <InputGroup.Append>
                                <InputGroup.Text id="basic-addon2">Days</InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>
                </Col>
            </Row>

            <Button variant="primary" type="submit" disabled={loading}>
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
                Submit
            </Button>
        </Form>
    );
}

export default CreateCampaignForm;
