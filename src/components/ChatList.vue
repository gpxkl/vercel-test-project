<template>
  <div class="chat-list">
    <div class="chat-list-header">
      <span class="header-title">聊天列表</span>
    </div>
    <div class="chat-item">
      <div class="avatar"></div>
      <div class="chat-info">
        <span class="user-name">用戶A</span>
        <span class="last-message">最近在做什麼項目？</span>
      </div>
    </div>
    <div class="chat-item">
      <div class="avatar"></div>
      <div class="chat-info">
        <span class="user-name">用戶B</span>
        <span class="last-message">明天一起吃飯嗎？</span>
      </div>
    </div>
    <div class="chat-item">
      <div class="avatar"></div>
      <div class="chat-info">
        <span class="user-name">用戶C</span>
        <span class="last-message">已收到，謝謝！</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatList',
};
</script>

<style scoped>
.chat-list {
  width: 420px;
  height: 100%;
  background-color: var(--background);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.chat-list-header {
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-bottom: 1px solid var(--border);
}

.header-title {
  font-size: 16px;
  font-weight: bold;
  color: var(--foreground);
}

.chat-item {
  width: 100%;
  height: 72px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 12px;
  border-bottom: 1px solid var(--border);
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--muted);
  flex-shrink: 0;
}

.chat-info {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 4px;
}

.user-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--foreground);
}

.last-message {
  font-size: 12px;
  color: var(--muted-foreground);
}

/* Hide on mobile when chat/tool selected (as per SDD) - but for this prototype, just hide on mobile */
@media (max-width: 1023px) {
  .chat-list {
    display: none;
  }
}
</style>