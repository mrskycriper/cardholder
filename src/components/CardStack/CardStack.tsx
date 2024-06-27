import { useMemo, useState, useEffect } from "react";
import Stack from 'react-bootstrap/Stack';
import Card from '../Card/Card'

import PassBundle from '../../interfaces/PassBundle';

function CardStack() {
    const [cards, setCards] = useState([] as PassBundle[]);
    const worker: Worker = useMemo(
        () => new Worker(new URL("./aggregateWorker.ts", import.meta.url), { type: 'module' }),
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
                    <Card key={passBundle.id} passId={passBundle.id} passBundle={passBundle} />
                ))
            }
        </Stack>
    );
}

export default CardStack;