type EventHandler = (event: Event) => void;

interface ListenerOptions {
  once?: boolean;
}

interface Listener {
  handler: EventHandler;
  options: ListenerOptions;
}

export default class EventEmitter {
  private listeners: { [eventType: string]: Listener[] } = {};

  addEventListener(
    type: string,
    handler: EventHandler,
    options: ListenerOptions = {},
  ) {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }
    this.listeners[type].push({ handler, options });
  }

  removeEventListener(type: string, handler: EventHandler) {
    if (!this.listeners[type]) {
      return;
    }

    const index = this.listeners[type].findIndex(
      listener => listener.handler === handler,
    );
    if (index === -1) {
      return;
    }

    this.listeners[type].splice(index, 1);
  }

  dispatchEvent(event: Event) {
    if (!this.listeners[event.type]) {
      return;
    }

    this.listeners[event.type].forEach(listener => {
      listener.handler(event);

      if (listener.options.once) {
        this.removeEventListener(event.type, listener.handler);
      }
    });
  }
}
