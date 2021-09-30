import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { utils } from "ethers";
import { useCreateCampaign } from "../utils/CampaignFactoryInterfaces";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { Grid, InputAdornment } from "@mui/material";
import { useBlockNumber } from "@usedapp/core";

function CreateCampaignForm() {
    const [formData, setFormData] = useState({
        title: null,
        subTitle: null,
        imageURL: null,
        description: null,
        tokenName: null,
        tokenSymbol: null,
        tokenMaxSupply: null,
        endBlock: null,
    });
    const [validated, setValidated] = useState(false);
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const { state, send } = useCreateCampaign();
    const blockNumber = useBlockNumber();

    const sendTx = () => {
        setLoading(true);
        send(
            `${formData.title}%%%%%${formData.subTitle}`,
            formData.imageURL,
            formData.description,
            utils.parseUnits(formData.tokenMaxSupply, "ether"),
            formData.tokenName,
            formData.tokenSymbol,
            blockNumber + Math.floor((parseInt(formData.endBlock) * 86400) / 13),
        );
        console.log(state);

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
            console.log("Error in the form");
            return;
        }

        setValidated(false);
        sendTx();
    };

    return (
        <div style={{ margin: "1rem" }}>
            <Box
                sx={{
                    "& .MuiTextField-root": { mb: 1 },
                    "& .MuiButton-root": { mt: 2 },
                }}
                component="form"
                noValidate
                onSubmit={onSubmit}
                autoComplete="off"
            >
                <TextField
                    required
                    error={validated}
                    id="outlined-required"
                    label="Title"
                    placeholder="Enter title"
                    fullWidth
                    onChange={(e) => handleChange(e, "title")}
                />
                <TextField
                    required
                    error={validated}
                    id="outlined-required"
                    label="Subtitle"
                    placeholder="Enter subtitle"
                    fullWidth
                    onChange={(e) => handleChange(e, "subTitle")}
                />
                <TextField
                    required
                    error={validated}
                    label="Description"
                    placeholder="Enter description"
                    multiline
                    maxRows={4}
                    minRows={2}
                    fullWidth
                    onChange={(e) => handleChange(e, "description")}
                />
                <TextField
                    error={validated}
                    label="Image URL"
                    placeholder="Enter image URL"
                    fullWidth
                    onChange={(e) => handleChange(e, "imageURL")}
                />
                <Grid container columnSpacing={1}>
                    <Grid item xs>
                        <TextField
                            required
                            error={validated}
                            label="Token name"
                            placeholder="Enter token name"
                            fullWidth
                            onChange={(e) => handleChange(e, "tokenName")}
                        />
                    </Grid>
                    <Grid item xs>
                        <TextField
                            required
                            error={validated}
                            label="Token ticker"
                            placeholder="Enter token ticker"
                            fullWidth
                            onChange={(e) => handleChange(e, "tokenSymbol")}
                        />
                    </Grid>
                    <Grid item xs>
                        <TextField
                            required
                            error={validated}
                            label="Token supply"
                            placeholder="Enter token supply"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {formData.tokenSymbol}
                                    </InputAdornment>
                                ),
                                inputProps: { min: 0 },
                            }}
                            fullWidth
                            type="number"
                            onChange={(e) => handleChange(e, "tokenMaxSupply")}
                        />
                    </Grid>
                    <Grid item xs>
                        <TextField
                            required
                            error={validated}
                            label="Funding days"
                            placeholder="Enter funding days"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">Days</InputAdornment>
                                ),
                                inputProps: { min: 0 },
                            }}
                            fullWidth
                            type="number"
                            onChange={(e) => handleChange(e, "endBlock")}
                        />
                    </Grid>
                </Grid>
                <LoadingButton variant="contained" type="submit" loading={loading}>
                    Submit
                </LoadingButton>
            </Box>
        </div>
    );
}

export default CreateCampaignForm;
