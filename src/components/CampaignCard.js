import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        maxWidth: "25vw",
    },
    media: {
        height: 140,
    },
});

export default function CampaignCard({ drizzleState, elem }) {
    const classes = useStyles();
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
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={data.imageURL}
                    title={data.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {data.title}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        {data.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button
                    size="small"
                    color="primary"
                    onClick={() => {
                        history.push(`/campaign/${elem.address}`);
                    }}
                >
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
}
