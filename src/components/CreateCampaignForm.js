import React, { useState } from "react";
import {
    TextField,
    Button,
    InputAdornment,
    CircularProgress,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiTextField-root": {
            marginTop: theme.spacing(2),
        },
        "& .MuiButton-root": {
            marginTop: theme.spacing(4),
        },
    },
}));

function CreateCampaignForm({ drizzle }) {
    const [formData, setFormData] = useState({
        title: "",
        imageURL: "",
        description: "",
        minimumDeposit: "",
        tokenName: "",
        tokenSymbol: "",
        tokenMaxSupply: "",
    });
    const [formDataErrors, setFormDataErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const classes = useStyles();

    const sendTx = async () => {
        setLoading(true);
        const stackId = await drizzle.contracts.CampaignFactory.methods
            .createCampaign(
                parseInt(formData.minimumDeposit),
                formData.title,
                formData.imageURL,
                formData.description,
                parseInt(formData.tokenMaxSupply),
                formData.tokenName,
                formData.tokenSymbol
            )
            .send();
        setLoading(false);
        history.push(`/campaign/${stackId.to}`);
        console.log(stackId);
    };

    const handleChange = (event, field) => {
        console.log(formData);
        const value = event.target.value;
        setFormData((old) => {
            return { ...old, [field]: value };
        });
    };

    return (
        <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={(e) => {
                e.preventDefault();
                let ok = true;
                for (let element in formData) {
                    if (!formData[element]) {
                        setFormDataErrors((old) => {
                            return { ...old, [element]: true };
                        });
                        ok = false;
                    }
                }

                if (ok) {
                    setFormDataErrors({});
                    sendTx();
                }
            }}
        >
            <div>
                <TextField
                    required
                    label="Title"
                    fullWidth
                    variant="outlined"
                    value={formData.title}
                    error={formDataErrors.title}
                    onChange={(e) => handleChange(e, "title")}
                />
            </div>
            <div>
                <TextField
                    required
                    label="Image URL"
                    fullWidth
                    variant="outlined"
                    value={formData.imageURL}
                    onChange={(e) => handleChange(e, "imageURL")}
                    error={formDataErrors.imageURL}
                />
            </div>
            <div>
                <TextField
                    required
                    label="Description"
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    value={formData.description}
                    onChange={(e) => handleChange(e, "description")}
                    error={formDataErrors.description}
                />
            </div>
            <div>
                <TextField
                    required
                    label="Minimum deposit"
                    type="number"
                    variant="outlined"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">Wei</InputAdornment>
                        ),
                    }}
                    value={formData.minimumDeposit}
                    onChange={(e) => handleChange(e, "minimumDeposit")}
                    error={formDataErrors.minimumDeposit}
                />
                <TextField
                    required
                    label="Token name"
                    variant="outlined"
                    value={formData.tokenName}
                    onChange={(e) => handleChange(e, "tokenName")}
                    error={formDataErrors.tokenName}
                />
                <TextField
                    required
                    label="Token symbol"
                    variant="outlined"
                    value={formData.tokenSymbol}
                    onChange={(e) => handleChange(e, "tokenSymbol")}
                    error={formDataErrors.tokenSymbol}
                />
                <TextField
                    required
                    label="Token maxiumum supply"
                    type="number"
                    variant="outlined"
                    value={formData.tokenMaxSupply}
                    onChange={(e) => handleChange(e, "tokenMaxSupply")}
                    error={formDataErrors.tokenMaxSupply}
                />
            </div>
            <div>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={loading}
                >
                    Create
                </Button>
                {loading && <CircularProgress />}
            </div>
        </form>
    );
}

export default CreateCampaignForm;
