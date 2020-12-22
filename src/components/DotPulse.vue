<template>
  	<div class="d-flex justify-content-center">
	    <div v-if="loading" class="dot-pulse"></div>
	</div>
</template>

<script>
export default {
  name: 'DotPulse',
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
  background-color: #9880ff;
  color: #9880ff;
  box-shadow: 9999px 0 0 -5px #9880ff;
  animation: dot-pulse 1.5s infinite linear;
  animation-delay: .25s;
}

.dot-pulse::before, .dot-pulse::after {
  content: '';
  display: inline-block;
  position: absolute;
  top: 0;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #9880ff;
  color: #9880ff;
}

.dot-pulse::before {
  box-shadow: 9984px 0 0 -5px #9880ff;
  animation: dot-pulse-before 1.5s infinite linear;
  animation-delay: 0s;
}

.dot-pulse::after {
  box-shadow: 10014px 0 0 -5px #9880ff;
  animation: dot-pulse-after 1.5s infinite linear;
  animation-delay: .5s;
}

@keyframes dot-pulse-before {
  0% {
    box-shadow: 9984px 0 0 -5px #9880ff;
  }
  30% {
    box-shadow: 9984px 0 0 2px #9880ff;
  }
  60%,
  100% {
    box-shadow: 9984px 0 0 -5px #9880ff;
  }
}

@keyframes dot-pulse {
  0% {
    box-shadow: 9999px 0 0 -5px #9880ff;
  }
  30% {
    box-shadow: 9999px 0 0 2px #9880ff;
  }
  60%,
  100% {
    box-shadow: 9999px 0 0 -5px  #9880ff;
  }
}

@keyframes dot-pulse-after {
  0% {
    box-shadow: 10014px 0 0 -5px #9880ff;
  }
  30% {
    box-shadow: 10014px 0 0 2px  #9880ff;
  }
  60%,
  100% {
    box-shadow: 10014px 0 0 -5px #9880ff;
  }
}
</style>