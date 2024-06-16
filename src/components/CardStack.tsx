import Stack from 'react-bootstrap/Stack';
import BasicCard from './BasicCard'

function CardStack() {
  return (
    <Stack gap={2} className="col-md-5 mx-auto">
        <BasicCard/>
        <BasicCard/>
    </Stack>
  );
}

export default CardStack;