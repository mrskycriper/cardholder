import { useMemo, useState, useEffect } from "react";
import Stack from 'react-bootstrap/Stack';
import Card from '../card'
import PreviewCard from "../preview-card";

import PassBundle from '../../interfaces/pass-bundle';

function CardStack() {
    const [cards, setCards] = useState([] as PassBundle[]);
    const worker: Worker = useMemo(
        () => new Worker(new URL("./aggregate-worker.ts", import.meta.url), { type: 'module' }),
        []
    );

    useEffect(() => {
        worker.postMessage('get default');
        worker.onmessage = async (e: MessageEvent<PassBundle[]>) => {
            setCards(e.data);
        };
    }, []);

    // return (
    //     <Stack gap={2} className='align-items-center py-2'>
    //         {
    //             cards.map((passBundle) => (
    //                 <Card key={passBundle.id} passId={passBundle.id} passBundle={passBundle} />
    //             ))
    //         }
    //     </Stack>
    // );

    return (
        <Stack gap={2} className='align-items-center py-2 container-sm' style={{
            maxWidth:"540px"
          }}>
            {
                cards.map((passBundle) => (
                    <PreviewCard key={passBundle.id} passBundle={passBundle} />
                ))
            }
        </Stack>
    );
}

export default CardStack;