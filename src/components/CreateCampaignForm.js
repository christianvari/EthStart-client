import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { utils } from "ethers";
import { useCreateCampaign } from "../utils/CampaignFactoryInterfaces";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { Grid, InputAdornment } from "@mui/material";

function CreateCampaignForm() {
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
    const { state, send } = useCreateCampaign();

    const sendTx = () => {
        setLoading(true);
        send(
            utils.parseEther(formData.tokenPrice),
            `${formData.title}%%%%%${formData.subTitle}`,
            formData.imageURL,
            formData.description,
            utils.parseEther(formData.tokenMaxSupply),
            formData.tokenName,
            formData.tokenSymbol,
            parseInt(formData.fundingDays) * 86400,
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
        <Box
            sx={{
                "& .MuiTextField-root": { m: 1 },
                "& .MuiButton-root": { m: 1 },
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
                        label="Token price"
                        placeholder="Enter token price"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">Ξ</InputAdornment>
                            ),
                        }}
                        fullWidth
                        type="number"
                        onChange={(e) => handleChange(e, "tokenPrice")}
                    />
                </Grid>
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
                        label="Token max supply"
                        placeholder="Enter token max supply"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {formData.tokenSymbol}
                                </InputAdornment>
                            ),
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
                        }}
                        fullWidth
                        type="number"
                        onChange={(e) => handleChange(e, "fundingDays")}
                    />
                </Grid>
            </Grid>
            <LoadingButton variant="contained" type="submit" loading={loading}>
                Submit
            </LoadingButton>
        </Box>
    );
}

export default CreateCampaignForm;
