import React, { useState } from "react";
import { create } from "ipfs-http-client";
import { LoadingButton } from "@mui/lab";
import Resizer from "react-image-file-resizer";

const client = create("https://ipfs.infura.io:5001/api/v0");

const resizeFile = (file) =>
    new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            800,
            800,
            "JPEG",
            80,
            0,
            (uri) => {
                resolve(uri);
            },
            "file",
        );
    });

const IPFSFileLoader = React.memo(({ setImageURL }) => {
    const [isLoading, setIsLoading] = useState(false);

    async function onChange(e) {
        setIsLoading(true);
        const file = e.target.files[0];
        const resizedFile = await resizeFile(file);
        try {
            const added = await client.add(resizedFile);
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
                <LoadingButton
                    variant="contained"
                    component="span"
                    loading={isLoading}
                    style={{ alignSelf: "center", width: "100%" }}
                >
                    Upload image to IPFS
                </LoadingButton>
            </label>
        </div>
    );
});

export default IPFSFileLoader;
