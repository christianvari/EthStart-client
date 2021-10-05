import React from "react";
import { useHistory } from "react-router-dom";
import { useGetImageUrl, useGetTitle } from "../utils/CampaignInterfaces";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const CampaignCard = React.memo(({ contractAddress, isFunded }) => {
    const history = useHistory();
    const title = useGetTitle(contractAddress);
    const imageUrl = useGetImageUrl(contractAddress);

    return (
        <Card>
            <CardMedia
                component="img"
                sx={{ height: "15rem" }}
                image={imageUrl}
                alt={title?.title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title?.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {title?.subtitle}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    onClick={() => {
                        history.push(`/campaign/${contractAddress}`);
                    }}
                >
                    {isFunded ? "Learn more" : "Contribute now"}
                </Button>
            </CardActions>
        </Card>
    );
});

export default CampaignCard;
