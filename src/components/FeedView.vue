<template>
  <div class="feed-view">
    <div class="feed-header">
      <span class="header-title">社交動態</span>
    </div>

    <div class="tab-bar">
      <div class="tab-item active">
        <span class="tab-text">推薦</span>
      </div>
      <div class="tab-item">
        <span class="tab-text">關注</span>
      </div>
      <div class="tab-item">
        <span class="tab-text">最新</span>
      </div>
    </div>

    <div class="feed-content">
      <!-- Placeholder for FeedCreateInput -->
      <div class="create-post-input-placeholder">
        <div class="avatar"></div>
        <div class="input-area">
          <p class="placeholder-text">開始新討論串...</p>
          <div class="action-row">
            <div class="icon-wrapper" data-lucide="hash"></div>
            <span>添加話題標籤</span>
            <button class="publish-button">發布</button>
          </div>
        </div>
      </div>

      <!-- FeedPostCard instances will go here -->
      <FeedPostCard />
      <FeedPostCard type="image" />
    </div>
  </div>
</template>

<script>
import FeedPostCard from './FeedPostCard.vue';

export default {
  name: 'FeedView',
  components: {
    FeedPostCard,
  },
  mounted() {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  },
};
</script>

<style scoped>
.feed-view {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background-color: var(--background);
  color: var(--foreground);
}

.feed-header {
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}

.header-title {
  font-size: 18px;
  font-weight: bold;
  color: var(--foreground);
}

.tab-bar {
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  padding: 8px 16px;
  gap: 8px;
  flex-shrink: 0;
}

.tab-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 16px;
  border-radius: 20px;
  background-color: var(--muted);
  cursor: pointer;
}

.tab-item.active {
  background-color: var(--primary);
}

.tab-item.active .tab-text {
  color: #FFFFFF;
}

.tab-text {
  font-size: 13px;
  font-weight: 600;
  color: var(--muted-foreground);
}

.tab-item:not(.active) .tab-text {
  font-weight: normal;
}

.feed-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: var(--background);
}

/* Create Post Input Placeholder Styles */
.create-post-input-placeholder {
  padding: 16px;
  display: flex;
  gap: 16px;
  flex-shrink: 0;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-bottom: 1px solid var(--border);
  background-color: var(--card);
  border-radius: 16px;
  margin-bottom: 12px; /* Gap from first post */
}

.create-post-input-placeholder:hover {
  background-color: rgba(var(--muted), 0.3); /* This needs to be adjusted since --muted is a hex */
  background-color: #DED6D34D; /* A rough equivalent of rgba(--muted, 0.3) for a hex color */
}

.create-post-input-placeholder .avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--muted);
  flex-shrink: 0;
}

.create-post-input-placeholder .input-area {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.create-post-input-placeholder .placeholder-text {
  font-size: 14px;
  font-weight: 500;
  color: var(--muted-foreground);
  padding: 10px 0;
  margin: 0;
}

.create-post-input-placeholder .action-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}

.create-post-input-placeholder .action-row .icon-wrapper {
  width: 20px;
  height: 20px;
  color: var(--muted-foreground);
}

.create-post-input-placeholder .action-row span {
  font-size: 14px;
  font-weight: 500;
  color: var(--muted-foreground);
}

.create-post-input-placeholder .publish-button {
  margin-left: auto;
  padding: 6px 16px;
  border-radius: 20px;
  background-color: rgba(var(--muted), 0.3); /* Similar adjustment needed */
  background-color: #DED6D34D;
  color: var(--muted-foreground);
  font-size: 14px;
  font-weight: 600;
  pointer-events: none;
  border: none;
  cursor: default;
}
</style>