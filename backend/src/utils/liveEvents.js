const clients = new Set();

// Keep one lightweight SSE response open per active frontend browser tab.
export const openLiveEventStream = (request, response) => {
  response.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
    "X-Accel-Buffering": "no",
  });
  response.flushHeaders?.();
  response.write("retry: 3000\n\n");
  clients.add(response);

  const heartbeat = setInterval(() => response.write(": keep-alive\n\n"), 25000);
  request.on("close", () => {
    clearInterval(heartbeat);
    clients.delete(response);
  });
};

// Notify every open frontend tab after a managed content mutation succeeds.
export const publishContentUpdate = (type) => {
  const payload = JSON.stringify({ type, updatedAt: new Date().toISOString() });
  clients.forEach((client) => client.write(`event: content-update\ndata: ${payload}\n\n`));
};
