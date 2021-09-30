import React from "react";
import { useHistory } from "react-router-dom";
import { useGetCampaignSummary } from "../utils/CampaignInterfaces";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function CampaignCard({ contractAddress }) {
    const history = useHistory();
    const campaignSummary = useGetCampaignSummary(contractAddress);

    if (!campaignSummary) return null;

    const data = {
        title: campaignSummary[1].split("%%%%%")[0],
        imageURL: campaignSummary[3],
        subTitle: campaignSummary[1].split("%%%%%")[1],
        isFunded: campaignSummary[4],
    };

    return (
        <Card>
            <CardMedia
                component="img"
                sx={{ height: "15rem" }}
                image={data.imageURL}
                alt={data.title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {data.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {data.subTitle}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    onClick={() => {
                        history.push(`/campaign/${contractAddress}`);
                    }}
                >
                    {data.isFunded ? "Learn more" : "Contribute now"}
                </Button>
            </CardActions>
        </Card>
    );
}
