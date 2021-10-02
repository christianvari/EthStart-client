import React, { useState } from "react";
import { useContribute } from "../utils/CampaignInterfaces";
import { utils } from "ethers";
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/system";
import { InputAdornment, TextField } from "@mui/material";

const ContributeForm = ({ address }) => {
    const { state, send } = useContribute(address);

    const [value, setValue] = useState({ eth: "" });
    const [validated, setValidated] = useState(false);

    const sendTx = async () => {
        send({ value: utils.parseEther(value.eth) });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (!form.checkValidity()) {
            console.log("invalid");
            setValidated(true);
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
                    label="ETH amount"
                    fullWidth
                    onChange={(e) =>
                        setValue({
                            eth: e.target.value,
                        })
                    }
                    placeholder="Enter ETH amount"
                    type="number"
                    InputProps={{
                        endAdornment: <InputAdornment position="end">Ξ</InputAdornment>,
                        inputProps: { min: 0, step: 0.00000001 },
                    }}
                />

                <LoadingButton
                    variant="contained"
                    type="submit"
                    loading={state.status === "Mining"}
                >
                    Submit
                </LoadingButton>
            </Box>
        </div>
    );
};

export default ContributeForm;
