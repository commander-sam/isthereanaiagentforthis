type EventCallback = () => void;

export class EventEmitter {
  private events: Map<string, Set<EventCallback>>;

  constructor() {
    this.events = new Map();
  }

  protected on(event: string, callback: EventCallback): void {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event)!.add(callback);
  }

  protected off(event: string, callback: EventCallback): void {
    const callbacks = this.events.get(event);
    if (callbacks) {
      callbacks.delete(callback);
      if (callbacks.size === 0) {
        this.events.delete(event);
      }
    }
  }

  protected emit(event: string): void {
    const callbacks = this.events.get(event);
    if (callbacks) {
      callbacks.forEach(callback => {
        try {
          callback();
        } catch (error) {
          console.error('Error in event callback:', error);
        }
      });
    }
  }

  protected hasListeners(event: string): boolean {
    return this.events.has(event) && this.events.get(event)!.size > 0;
  }
}