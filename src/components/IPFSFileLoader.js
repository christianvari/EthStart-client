import React, { useState } from "react";
import { create } from "ipfs-http-client";
import { LoadingButton } from "@mui/lab";

const client = create("https://ipfs.infura.io:5001/api/v0");

const IPFSFileLoader = React.memo(({ setImageURL }) => {
    const [isLoading, setIsLoading] = useState(false);

    async function onChange(e) {
        setIsLoading(true);
        const file = e.target.files[0];
        try {
            const added = await client.add(file);

            setImageURL(added.path);
        } catch (error) {
            console.log("Error uploading file: ", error);
        }
        setIsLoading(false);
    }

    return (
        <div>
            <input
                accept="image/*"
                style={{ display: "none" }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={onChange}
            />
            <label htmlFor="raised-button-file">
                <LoadingButton variant="contained" component="span" loading={isLoading}>
                    Upload image to IPFS
                </LoadingButton>
            </label>
        </div>
    );
});

export default IPFSFileLoader;
