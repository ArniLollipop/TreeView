<template>
  <div class="main">
    <TreeView
      :key="rerenderKey"
      :items="treeViewStore.treeItems"
      :expandedItems="treeViewStore.expandedItems" />
    <button class="main-button" @click="rerenderKey++">rerender Tree</button>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";

import TreeView from "@/components/tree/tree-view.vue";
import { useTreeViewStore } from "@/stores/tree";

const treeViewStore = useTreeViewStore();

const rerenderKey = ref(0);

onBeforeMount(async () => {
  await treeViewStore.getTreeItems();
});
</script>

<style scoped>
.main {
  display: flex;
  align-items: flex-start;
}

.main-button {
  margin-top: 20px;
  margin-left: 20px;
  padding: 10px;
  font-size: 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
