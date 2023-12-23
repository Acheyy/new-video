// stores/routeHistory.js
import { defineStore } from 'pinia';

export const useRouteHistoryStore = defineStore('routeHistory', {
  state: () => ({
    history: [],
  }),
  actions: {
    addRoute(route: never) {
      if (this.history.length > 0 && this.history[this.history.length - 1] === route) {
        return;
      }
      this.history.push(route);
    },
    clearHistory() {
      this.history = [];
    },
  },
});
