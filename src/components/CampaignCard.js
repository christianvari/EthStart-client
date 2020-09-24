import React from "react";
import { Button, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function CampaignCard({ drizzleState, elem }) {
    const history = useHistory();
    const storeData = drizzleState.contracts[elem.address].getSummary[elem.key];
    if (!storeData) return null;
    const data = {
        title: storeData.value[4],
        imageURL: storeData.value[6],
        description: storeData.value[5],
    };

    console.log("elem", storeData);

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
