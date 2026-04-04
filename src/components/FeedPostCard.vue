<template>
  <div class="feed-post-card">
    <div class="post-header">
      <div class="user-info">
        <div class="avatar"></div>
        <span class="user-name">{{ post.author }}</span>
        <div class="spacer"></div>
        <span class="post-time">{{ post.time }}</span>
      </div>
    </div>

    <p class="post-content">{{ post.content }}</p>

    <div v-if="post.type === 'text'" class="code-block">
      <p class="code-line">const result = items</p>
      <p class="code-line blue">  .filter(Boolean),</p>
      <p class="code-line blue">  .map(transform);</p>
    </div>

    <div v-if="post.type === 'image'" class="image-placeholder">
      <div class="icon-wrapper" data-lucide="image" style="color: var(--border);"></div>
    </div>

    <div class="action-bar">
      <div class="action-item">
        <div class="icon-wrapper" data-lucide="heart" style="fill: var(--muted-foreground); color: var(--muted-foreground);"></div>
        <span>{{ post.likes }}</span>
      </div>
      <div class="action-item">
        <div class="icon-wrapper" data-lucide="message-circle" style="color: var(--muted-foreground);"></div>
        <span>{{ post.comments }}</span>
      </div>
      <div class="icon-wrapper share-icon" data-lucide="share-2" style="color: var(--muted-foreground);"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FeedPostCard',
  props: {
    type: {
      type: String,
      default: 'text', // 'text' or 'image'
    },
  },
  data() {
    return {
      post: {
        author: this.type === 'text' ? 'Tech達人' : '美食博主',
        time: this.type === 'text' ? '3h' : '5h',
        content: this.type === 'text'
          ? '分享一個超棒的 TypeScript 技巧，讓你的代碼更加簡潔高效！'
          : '週末美食推薦！這家餐廳的牛排真的太好吃了，強烈推薦給大家～',
        likes: this.type === 'text' ? '456' : '234',
        comments: this.type === 'text' ? '78' : '45',
        type: this.type,
      },
    };
  },
  mounted() {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  },
};
</script>

<style scoped>
.feed-post-card {
  width: 100%;
  background-color: var(--card);
  border-radius: 16px;
  border: 1px solid var(--border);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.post-header {
  display: flex;
  align-items: center;
  width: 100%;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--primary); /* Blue for Tech達人, Orange for 美食博主 */
}
.feed-post-card:nth-child(2) .avatar { /* Specific style for the second post */
  background-color: #F59E0B; /* Orange for 美食博主 */
}

.user-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--foreground);
}

.spacer {
  flex: 1;
  height: 1px;
}

.post-time {
  font-size: 12px;
  color: var(--muted-foreground);
}

.post-content {
  font-size: 14px;
  color: var(--foreground);
  margin: 0;
  line-height: 1.5;
}

.code-block {
  width: 100%;
  background-color: #1E293B; /* Dark background for code */
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  font-family: 'Fira Code', monospace;
}

.code-line {
  font-size: 12px;
  color: #E2E8F0;
  margin: 0;
  white-space: pre;
}

.code-line.blue {
  color: #A5F3FC;
}

.image-placeholder {
  width: 100%;
  height: 160px;
  background-color: var(--muted);
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-placeholder .icon-wrapper {
  width: 32px;
  height: 32px;
  color: var(--border);
}

.action-bar {
  display: flex;
  align-items: center;
  gap: 16px;
}

.action-item {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--muted-foreground);
  font-size: 12px;
}

.action-item .icon-wrapper {
  width: 18px; /* Adjusted from 22px to fit better with text and align with pen */
  height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.action-item .icon-wrapper[data-lucide="heart"] {
  stroke-width: 1.5;
  fill: var(--muted-foreground); /* Default to filled muted */
}

.share-icon {
  margin-left: auto;
  width: 14px; /* Smaller as per pen */
  height: 14px;
  color: var(--muted-foreground);
}
</style>