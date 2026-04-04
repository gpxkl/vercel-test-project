<template>
  <div class="top-bar">
    <span class="text">LV80</span>
    <div class="spacer"></div>
    <span class="text">GP200</span>
    <div class="spacer"></div>
    <span class="text">EXP</span>
  </div>
</template>

<script>
export default {
  name: 'TopBar',
};
</script>

<style scoped>
.top-bar {
  width: 100%;
  height: 92px;
  background-color: var(--background);
  display: flex;
  align-items: center;
  padding: 0 24px;
  border-bottom: 1px solid var(--border);
  z-index: 20;
  flex-shrink: 0;
}

.text {
  font-size: 14px;
  font-weight: bold;
  color: var(--foreground);
}

.spacer {
  flex: 1;
  height: 1px;
}
</style>