<template>
  <div class="tree-node">
    <div
      @click="toggle"
      class="tree-title"
      :style="`padding-left: ${10 * props.level}px; 
      background: ${backgroundColor}`">
      {{ node.title }}
      <IconChevron
        v-if="childNodes.length > 0"
        :class="isOpen && 'rotate-90'" />
    </div>
    <Transition
      name="accordion"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
      @after-leave="afterLeave">
      <div v-if="isOpen" class="tree-children">
        <TreeNode
          v-for="(child, index) in childNodes"
          :index="index"
          :key="child.id"
          :node="child"
          :all-nodes="allNodes"
          :level="level + 1" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

import { TreeItem } from "@/types/tree";
import TreeNode from "./tree-node.vue";
import IconChevron from "@/components/icons/icon-chevron.vue";
import { useTreeViewStore } from "@/stores/tree";

const props = defineProps<{
  node: TreeItem;
  allNodes: TreeItem[];
  level: number;
  index: number;
}>();

const treeViewStore = useTreeViewStore();

const isOpen = ref(treeViewStore.expandedItems.includes(props.node.id));

const childNodes = computed(() => {
  return props.allNodes.filter((n) => n.parent_id === props.node.id);
});

const backgroundColor = computed(() => {
  const colors = ["#f8f9fa", "#e9ecef", "#dee2e6", "#ced4da", "#adb5bd"];
  return colors[props.level % colors.length];
});

const toggle = () => {
  if (childNodes.value.length > 0) {
    isOpen.value = !isOpen.value;
    treeViewStore.toggleItem(props.node.id);
  }
};

const enter = (element: Element) => {
  const el = element as HTMLElement;
  el.style.height = "0";
  el.style.overflow = "hidden";
  el.style.transition = "height 0.3s ease";
  requestAnimationFrame(() => {
    el.style.height = el.scrollHeight + "px";
  });
};

const afterEnter = (element: Element) => {
  const el = element as HTMLElement;
  el.style.height = "auto";
};

const leave = (element: Element) => {
  const el = element as HTMLElement;
  el.style.height = el.scrollHeight + "px";
  el.style.overflow = "hidden";
  el.style.transition = "height 0.3s ease";
  requestAnimationFrame(() => {
    el.style.height = "0";
  });
};

const afterLeave = (element: Element) => {
  const el = element as HTMLElement;
  el.style.height = "auto";
};
</script>

<style scoped>
.tree-title {
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #f0f0f0;
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
}

.tree-title svg {
  width: 18px;
  height: 18px;
}

.tree-node {
  width: 100%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: fit-content !important;
  transition: all 0.3s;
}

.tree-children {
  width: 100%;
  position: relative;
}

.rotate-90 {
  transform: rotate(90deg);
}
</style>
