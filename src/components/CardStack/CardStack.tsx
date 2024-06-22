import { useMemo, useState, useEffect } from "react";
import Stack from 'react-bootstrap/Stack';
import BasicCard from '../Card/BasicCard'

import PassBundle from '../../interfaces/PassBundle';

function CardStack() {
    const [cards, setCards] = useState([] as PassBundle[]);
    const worker: Worker = useMemo(
        () => new Worker(new URL("./worker.ts", import.meta.url), {type: 'module'}),
        []
    );

    useEffect(() => {
        if (window.Worker) {
            worker.postMessage('get default');
            worker.onmessage = async (e: MessageEvent<PassBundle[]>) => {
                setCards(e.data);
            };
        }
    }, []);

    return (
        <Stack gap={2} className='align-items-center py-2'>
            {
                cards.map((passBundle) => (
                    <BasicCard key={passBundle.id} passBundle={passBundle} />
                ))
            }
        </Stack>
    );
}

export default CardStack;