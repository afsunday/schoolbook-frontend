<template>
  <button :disabled="loading" @click="$emit('btnEvent', $event)" class="d-flex align-items-center justify-content-center">
    <div v-if="loading" class="btn-spinner me-2" />
    <slot />
  </button>
</template>

<script>
export default {
  name: 'LoadingButton',
  props: {
    loading: Boolean
  }
}
</script>

<style scoped>

.btn-spinner,
.btn-spinner:after {
  border-radius: 50%;
  width: 1.5em;
  height: 1.5em;
}

.btn-spinner {
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: .2em solid white;
  border-right: .2em solid white;
  border-bottom: .2em solid white;
  border-left: .2em solid transparent;
  transform: translateZ(0);
  animation: spinning 1s infinite linear;
}

@keyframes spinning {
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg) }
}

</style>
