import { useMemo, useState, useEffect } from "react";
import Stack from 'react-bootstrap/Stack';
import BasicCard from '../Card/BasicCard'

import PassBundle from '../../interfaces/IPassBundle';

function CardStack() {
    const [cards, setCards] = useState([] as PassBundle[]);
    const worker: Worker = useMemo(
        () => new Worker(new URL("./worker.ts", import.meta.url)),
        []
    );

    useEffect(() => {
        if (window.Worker) {
            worker.postMessage('get default');
            worker.onmessage = async (e: MessageEvent<PassBundle[]>) => {
                // for (const entry of e.data) {
                //     console.log(`${entry.name}: ${entry.objects.pass.toString()}`);
                // }
                setCards(e.data);
            };
        }
    }, []);

    return (
        <Stack gap={2} className='align-items-center py-2'>
            {
                cards.map((pass) => (
                    <BasicCard key={pass.name} pass={pass.objects.pass} />
                ))
            }
        </Stack>
    );
}

export default CardStack;