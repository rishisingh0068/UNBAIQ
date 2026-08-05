import { Router } from "express";

import { openLiveEventStream } from "../utils/liveEvents.js";

const eventsRouter = Router();

// Public pages use this read-only stream to learn when their API data changed.
eventsRouter.get("/", openLiveEventStream);

export default eventsRouter;
