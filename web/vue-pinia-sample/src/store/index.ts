import { defineStore } from "pinia";
export const useStore = defineStore("main", {
  state: () => {
    return {
      username: "",
    };
  },

  actions: {
    setUserName(value: string) {
      this.username = value;
    },
  },
});
