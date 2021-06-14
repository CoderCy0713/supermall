<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="isActive">
      <slot name="item-icon-active"></slot>
    </div>
    <div v-else>
      <slot name="item-icon"></slot>
    </div>
    <div :style="activeColor">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "TabBarItem",
  props: {
    path: {
      type: String,
      required: true,
    },
    activityColor: {
      type: String,
      default: "red",
    },
  },
  data() {
    return {
      // isActive: true,
    };
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path)
    },
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeColor() {
      return this.isActive ? { color: this.activityColor } : {};
    },
  },
  mounted() {
    console.log(this.$route)
  },
};
</script>
<style scoped>
.tab-bar-item {
  text-align: center;
  flex: 1;
  font-size: 14px;
  margin-top: 3px;
}
.tab-bar-item img {
  width: 24px;
  vertical-align: middle;
}
.active {
  color: #fd728d;
}
</style>
