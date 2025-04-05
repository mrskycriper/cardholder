import { useEffect, useMemo } from "react";
import Stack from "react-bootstrap/Stack";
import PreviewCard from "../preview-card";
import { PassBundleShort } from "../../interfaces/pass";
import { setCards } from "../../store";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { WORKER_GET } from "../../constants/workers";

function CardStack() {
  const dispatch = useAppDispatch();
  const cards = useAppSelector((state) => state.cards);

  const aggregateWorker: Worker = useMemo(
    () =>
      new Worker(new URL("./aggregate-worker.ts", import.meta.url), {
        type: "module",
      }),
    []
  );

  aggregateWorker.onmessage = async (e: MessageEvent<PassBundleShort[]>) => {
    dispatch(setCards(e.data));
  };

  useEffect(() => {
    aggregateWorker.postMessage(WORKER_GET);
  }, []);

  return (
    <Stack
      gap={2}
      className="align-items-center py-2 container-sm"
      style={{
        maxWidth: "540px",
      }}
    >
      {cards.map((passBundle) => (
        <PreviewCard key={passBundle.id} passBundle={passBundle} />
      ))}
    </Stack>
  );
}

export default CardStack;
