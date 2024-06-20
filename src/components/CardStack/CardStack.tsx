import { useMemo, useState, useEffect } from "react";
import Stack from 'react-bootstrap/Stack';
import BasicCard from '../Card/BasicCard'

interface Entry {
    name: string,
    file: File
}

function CardStack() {
    const worker: Worker = useMemo(
        () => new Worker(new URL("./worker.ts", import.meta.url)),
        []
    );

    useEffect(() => {
        if (window.Worker) {
            worker.postMessage('get default');
            worker.onmessage = async (e: MessageEvent<Entry[]>) => {
                console.log("Message posted from webworker: " + e.data);
                for (const entry of e.data) {
                    console.log(`${entry.name}: ${await entry.file.text()}`);
                }
            };
        }
      }, []);

    return (
        <Stack gap={2} className='align-items-center py-2'>
            <BasicCard />
            <BasicCard />
        </Stack>
    );
}

export default CardStack;