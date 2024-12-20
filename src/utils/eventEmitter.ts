export class EventEmitter {
    private events: { [key: string]: Array<() => void> } = {};
  
    protected on(event: string, callback: () => void): void {
      if (!this.events[event]) {
        this.events[event] = [];
      }
      this.events[event].push(callback);
    }
  
    protected off(event: string, callback: () => void): void {
      if (!this.events[event]) return;
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
  
    protected emit(event: string): void {
      if (!this.events[event]) return;
      this.events[event].forEach(callback => callback());
    }
  }