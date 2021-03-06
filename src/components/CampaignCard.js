import React from "react";
import { Button, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function CampaignCard({ drizzleState, elem }) {
    const history = useHistory();
    let data;
    try {
        const contract = drizzleState.contracts[elem.address];
        const storeData = contract.getCampaignSummary[elem.key];
        data = {
            title: storeData.value[3].split("%%%%%")[0],
            imageURL: storeData.value[5],
            subTitle: storeData.value[3].split("%%%%%")[1],
            isFunded: storeData.value[6],
        };
    } catch {
        return null;
    }

    console.log("elem", data);

    return (
        <Card>
            <Card.Header>{data.isFunded ? "Funded" : "Funding running"}</Card.Header>
            <Card.Img variant="top" src={data.imageURL} />
            <Card.Body>
                <Card.Title>{data.title}</Card.Title>
                <Card.Text>{data.subTitle}</Card.Text>
                <Button
                    variant="primary"
                    onClick={(e) => {
                        history.push(`/campaign/${elem.address}`);
                    }}
                >
                    {data.isFunded ? "Learn more" : "Contribute now"}
                </Button>
            </Card.Body>
        </Card>
    );
}
