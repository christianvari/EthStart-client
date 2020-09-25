import React from "react";
import { Button, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function CampaignCard({ drizzleState, elem }) {
    const history = useHistory();
    let data;
    try {
        const contract = drizzleState.contracts[elem.address];
        const storeData = contract.getSummary[elem.key];
        data = {
            title: storeData.value[4],
            imageURL: storeData.value[6],
            subTitle: storeData.value[7],
        };
    } catch {
        return null;
    }

    console.log("elem", data);

    return (
        <Card>
            <Card.Img variant="top" src={data.imageURL} />
            <Card.Body>
                <Card.Title>{data.title}</Card.Title>
                <Card.Text>{data.description}</Card.Text>
                <Button
                    variant="primary"
                    onClick={(e) => {
                        history.push(`/campaign/${elem.address}`);
                    }}
                >
                    Learn more
                </Button>
            </Card.Body>
        </Card>
    );
}
