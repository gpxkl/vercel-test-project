<template>
  <div class="nav-tabs">
    <div class="icon-wrapper" :style="{ fill: iconColor('home') }" v-html="icons.home"></div>
    <div class="icon-wrapper" :style="{ fill: iconColor('message-circle') }" v-html="icons.messageCircle"></div>
    <div class="icon-wrapper active" :style="{ fill: iconColor('rss') }" v-html="icons.rss"></div>
    <span class="tab-text">動態</span>
    <div class="icon-wrapper" :style="{ fill: iconColor('user') }" v-html="icons.user"></div>
    <div class="icon-wrapper" :style="{ fill: iconColor('settings') }" v-html="icons.settings"></div>
  </div>
</template>

<script>
export default {
  name: 'NavTabs',
  data() {
    return {
      icons: {
        home: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-house"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" /><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>',
        messageCircle: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>',
        rss: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rss"><path d="M4 11a9 9 0 0 1 9 9" /><path d="M4 4a16 16 0 0 1 16 16" /><circle cx="5" cy="19" r="1" /></svg>',
        user: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>',
        settings: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>',
      },
    };
  },
  methods: {
    iconColor(iconName) {
      return iconName === 'rss' ? 'var(--primary)' : 'var(--muted-foreground)';
    },
  },
};
</script>

<style scoped>
.nav-tabs {
  width: 80px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 0;
  gap: 24px;
  border-right: 1px solid var(--border);
  flex-shrink: 0;
  background-color: var(--background);
}

.icon-wrapper {
  width: 24px;
  height: 24px;
  color: var(--muted-foreground); /* Default color */
  display: flex; /* To center SVG if it's smaller */
  justify-content: center;
  align-items: center;
}

.icon-wrapper.active {
  color: var(--primary); /* Active color */
}

.tab-text {
  font-size: 10px;
  color: var(--primary);
}

/* Hide on mobile, show on larger screens */
@media (max-width: 1023px) {
  .nav-tabs {
    display: none;
  }
}
</style>