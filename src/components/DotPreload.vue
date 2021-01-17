<template>
  	<div class="d-flex justify-content-center">
	    <div v-if="loading" class="dot-pulse"></div>
	</div>
</template>

<script>
export default {
  name: 'DotPreload',
  props: {
    loading: Boolean
  }
}
</script>

<style scoped>
/**
 * ==============================================
 * Dot Pulse
 * ==============================================
 */
.dot-pulse {
  position: relative;
  left: -9999px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #ccc;
  color: #ccc;
  box-shadow: 9999px 0 0 -5px #ccc;
  animation: dot-pulse 1.2s infinite linear;
  animation-delay: .20s;
}

.dot-pulse::before, .dot-pulse::after {
  content: '';
  display: inline-block;
  position: absolute;
  top: 0;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #ccc;
  color: #ccc;
}

.dot-pulse::before {
  box-shadow: 9984px 0 0 -5px #ccc;
  animation: dot-pulse-before 1.2s infinite linear;
  animation-delay: 0s;
}

.dot-pulse::after {
  box-shadow: 10014px 0 0 -5px #ccc;
  animation: dot-pulse-after 1.2s infinite linear;
  animation-delay: .5s;
}

@keyframes dot-pulse-before {
  0% {
    box-shadow: 9984px 0 0 -5px #ccc;
  }
  30% {
    box-shadow: 9984px 0 0 2px #ccc;
  }
  60%,
  100% {
    box-shadow: 9984px 0 0 -5px #ccc;
  }
}

@keyframes dot-pulse {
  0% {
    box-shadow: 9999px 0 0 -5px #ccc;
  }
  30% {
    box-shadow: 9999px 0 0 2px #ccc;
  }
  60%,
  100% {
    box-shadow: 9999px 0 0 -5px  #ccc;
  }
}

@keyframes dot-pulse-after {
  0% {
    box-shadow: 10014px 0 0 -5px #ccc;
  }
  30% {
    box-shadow: 10014px 0 0 2px  #ccc;
  }
  60%,
  100% {
    box-shadow: 10014px 0 0 -5px #ccc;
  }
}
</style>