<template>
  <div id="app" class="app-shell">
    <TopBar />
    <div class="content-row">
      <NavTabs />
      <ChatList />
      <Sidebar />
      <FeedView />
    </div>
  </div>
</template>

<script>
import TopBar from './components/TopBar.vue';
import NavTabs from './components/NavTabs.vue';
import ChatList from './components/ChatList.vue';
import Sidebar from './components/Sidebar.vue';
import FeedView from './components/FeedView.vue';

export default {
  name: 'App',
  components: {
    TopBar,
    NavTabs,
    ChatList,
    Sidebar,
    FeedView,
  },
};
</script>

<style scoped>
.app-shell {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: var(--background);
  color: var(--foreground);
  font-family: 'Inter', sans-serif;
}

.content-row {
  display: flex;
  flex: 1;
  overflow: hidden;
  min-width: 0;
}

/* Responsive adjustments */
@media (max-width: 1023px) {
  .content-row > .sidebar, .content-row > .feed-view {
    position: absolute;
    inset: 0;
    z-index: 50;
  }
}
</style>