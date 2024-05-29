<template>
  <div class="tree-view">
    <TreeNode
      v-for="(item, index) in rootItems"
      :index="index"
      :key="item.id"
      :node="item"
      :all-nodes="items"
      :level="0" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import TreeNode from "@/components/tree/tree-node.vue";
import { TreeItem } from "@/types/tree";

const props = defineProps<{
  items: TreeItem[];
}>();

const rootItems = computed(() => {
  return props.items.filter((item) => item.parent_id === null);
});
</script>

<style scoped>
.tree-view {
  width: 300px;
  background-color: #f0f0f0;
  height: 100%;
  min-height: 100dvh;
  border-right: 1px solid #ccc;
}
</style>
