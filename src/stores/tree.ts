import { defineStore } from "pinia";
import { ref } from "vue";

import axios from "@/api/axios";
import { TreeItem } from "@/types/tree";

export const useTreeViewStore = defineStore("tree-view", () => {
  const expandedItems = ref<string[]>([]);
  const treeItems = ref<TreeItem[]>([]);

  async function getTreeItems() {
    await axios
      .get<TreeItem[]>("tree/items")
      .then((res) => {
        treeItems.value = res.data;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function toggleItem(id: string) {
    const index = expandedItems.value.indexOf(id);
    if (index === -1) {
      expandedItems.value.push(id);
    } else {
      expandedItems.value.splice(index, 1);
    }
  }

  return {
    treeItems,
    expandedItems,
    toggleItem,
    getTreeItems,
  };
});
