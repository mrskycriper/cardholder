import Stack from 'react-bootstrap/Stack';
import BasicCard from '../Card/BasicCard'

function CardStack() {
    return (
        <Stack gap={2} className='align-items-center py-2'>
            <BasicCard />
            <BasicCard />
        </Stack>
    );
}

export default CardStack;