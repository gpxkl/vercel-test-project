<template>
  <div class="sidebar">
    <div class="icon-wrapper" data-lucide="plus-circle" style="color: var(--muted-foreground);"></div>
    <div class="icon-wrapper" data-lucide="search" style="color: var(--muted-foreground);"></div>
    <div class="icon-wrapper" data-lucide="bell" style="color: var(--muted-foreground);"></div>
    <div class="icon-wrapper" data-lucide="bookmark" style="color: var(--muted-foreground);"></div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  mounted() {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  },
};
</script>

<style scoped>
.sidebar {
  width: 60px; /* PC collapsed width */
  height: 100%;
  background-color: var(--cis-glass-white);
  backdrop-filter: blur(10px); /* Based on SDD backdrop-blur-xl */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 0;
  gap: 20px;
  border-radius: 0 24px 24px 0;
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.06);
  flex-shrink: 0;
  z-index: 10; /* Ensure it's above the content */
}

.icon-wrapper {
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Responsive adjustments */
@media (max-width: 1023px) {
  .sidebar {
    width: 48px; /* Mobile collapsed width */
  }
}
</style>