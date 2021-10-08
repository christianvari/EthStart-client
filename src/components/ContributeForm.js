import React, { useState } from "react";
import { useContribute, useRedeem } from "../utils/CampaignInterfaces";
import { utils } from "ethers";
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/system";
import {
    InputAdornment,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";

const ContributeForm = ({ address }) => {
    const { state: stateContribute, send: sendContribute } = useContribute(address);
    const { state: stateRedeem, send: sendRedeem } = useRedeem(address);

    const [value, setValue] = useState({ eth: "" });
    const [validated, setValidated] = useState(false);
    const [isContribute, setIsContribute] = useState(true);

    const sendTx = async () => {
        if (isContribute) sendContribute({ value: utils.parseEther(value.eth) });
        else sendRedeem(value.eth);
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
        <Box sx={{ p: 3, bgcolor: "rgba(0,0,0,.2)", color: "white" }}>
            <Box
                sx={{
                    "& .MuiTextField-root": {
                        mb: 1,
                        "& .MuiFilledInput-root": {
                            color: "white",
                            "&.Mui-focused": {},
                        },
                    },
                    "& .MuiInputLabel-root": {
                        color: "white",
                    },
                    "& .MuiTypography-root": { color: "white" },
                }}
                component="form"
                noValidate
                onSubmit={onSubmit}
                autoComplete="off"
            >
                <ToggleButtonGroup
                    value={isContribute}
                    exclusive
                    onChange={(e, v) => {
                        if (v === null) return;
                        setIsContribute(v);
                    }}
                    sx={{
                        "& .MuiToggleButton-root": {
                            color: "white",
                            borderColor: "white",
                        },
                        "& .Mui-selected": {
                            bgcolor: "rgba(0,0,0,0.4)",
                        },
                        "& .Mui-selected:hover": {
                            bgcolor: "rgba(0,0,0,0.4)",
                        },
                    }}
                >
                    <ToggleButton value={true}>Contribute</ToggleButton>
                    <ToggleButton value={false}>Withdraw</ToggleButton>
                </ToggleButtonGroup>
                <TextField
                    required
                    variant="filled"
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
                        inputProps: {
                            min: 0,
                            step: 1e-18,
                            max: isContribute ? undefined : 10,
                        },
                    }}
                    sx={{ mt: 3 }}
                />

                <LoadingButton
                    variant="contained"
                    type="submit"
                    loading={
                        stateContribute.status === "Mining" ||
                        stateRedeem.status === "Mining"
                    }
                    sx={{ mt: 2 }}
                >
                    {isContribute ? "Contribute" : "Whitdraw"}
                </LoadingButton>
            </Box>
        </Box>
    );
};

export default ContributeForm;
