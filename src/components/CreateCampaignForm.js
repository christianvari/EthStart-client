import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { utils } from "ethers";
import { useCreateCampaign } from "../utils/CampaignFactoryInterfaces";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { Grid, InputAdornment } from "@mui/material";
import { useEthers } from "@usedapp/core";
import IPFSFileLoader from "./IPFSFileLoader";
import MDEditor from "@uiw/react-md-editor";

function CreateCampaignForm() {
    const [formData, setFormData] = useState({
        title: null,
        subTitle: null,
        imageURL: null,
        description: "Description",
        tokenName: null,
        tokenSymbol: null,
        tokenMaxSupply: null,
        endBlock: null,
    });
    const [validated, setValidated] = useState(false);
    const history = useHistory();
    const { chainId, library } = useEthers();
    const { state, send } = useCreateCampaign(chainId);

    const sendTx = async () => {
        send(
            `${formData.title}%%%%%${formData.subTitle}`,
            formData.imageURL,
            formData.description,
            utils.parseUnits(formData.tokenMaxSupply, "ether"),
            formData.tokenName,
            formData.tokenSymbol,
            (await library.getBlockNumber()) +
                Math.floor((parseInt(formData.endBlock) * 86400) / 13),
        );
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

    if (state.status === "Success") {
        history.push("/");
    }

    return (
        <div style={{ margin: "1rem" }}>
            <Box
                sx={{
                    "& .MuiTextField-root": { mb: 1 },
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
                <Box sx={{ mb: 1 }}>
                    <MDEditor
                        value={formData.description}
                        onChange={(description) =>
                            setFormData((old) => {
                                return { ...old, description };
                            })
                        }
                    />
                </Box>
                {/* <TextField
                    required
                    error={validated}
                    label="Description"
                    placeholder="Enter description"
                    multiline
                    maxRows={4}
                    minRows={2}
                    fullWidth
                    onChange={(e) => handleChange(e, "description")}
                /> */}
                <Grid container columnSpacing={1}>
                    <Grid item xs={10}>
                        <TextField
                            error={validated}
                            label="Image ID"
                            placeholder="Enter image URL"
                            fullWidth
                            disabled
                            value={formData.imageURL}
                        />
                    </Grid>
                    <Grid item xs>
                        <IPFSFileLoader
                            setImageURL={(imageURL) =>
                                setFormData((old) => {
                                    return { ...old, imageURL };
                                })
                            }
                        />
                    </Grid>
                </Grid>
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
                <LoadingButton
                    variant="contained"
                    type="submit"
                    loading={state.status === "Mining"}
                    sx={{ mt: 2 }}
                >
                    Submit
                </LoadingButton>
            </Box>
        </div>
    );
}

export default CreateCampaignForm;
