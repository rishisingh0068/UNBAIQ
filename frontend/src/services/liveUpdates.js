const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Browser EventSource reconnects automatically and each subscriber filters its own content type.
export const subscribeToContentUpdates = (contentType, onUpdate) => {
  const eventSource = new EventSource(`${API_URL}/events`);
  const handleUpdate = (event) => {
    try {
      const update = JSON.parse(event.data);
      if (update.type === contentType) onUpdate(update);
    } catch {
      // Ignore malformed stream messages and keep the live connection available.
    }
  };

  eventSource.addEventListener("content-update", handleUpdate);
  return () => {
    eventSource.removeEventListener("content-update", handleUpdate);
    eventSource.close();
  };
};
