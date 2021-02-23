<template>
  	<div v-if="loading" class="d-flex justify-content-center">
	    <div class="dot-pulse"></div>
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
  width: 6px;
  height: 6px;
  border-radius: 100%;
  background-color: #666666;
  color: #666666;
  box-shadow: 9999px 0 0 -5px #666666;
  animation: dot-pulse 1.2s infinite linear;
  animation-delay: .20s;
}

.dot-pulse::before, .dot-pulse::after {
  content: '';
  display: inline-block;
  position: absolute;
  top: 0;
  width: 6px;
  height: 6px;
  border-radius: 100%;
  background-color: #666666;
  color: #666666;
}

.dot-pulse::before {
  box-shadow: 9984px 0 0 -5px #666666;
  animation: dot-pulse-before 2s infinite linear;
  animation-delay: 0s;
}

.dot-pulse::after {
  box-shadow: 10014px 0 0 -5px #666666;
  animation: dot-pulse-after 2s infinite linear;
  animation-delay: .5s;
}

@keyframes dot-pulse-before {
  0% {
    box-shadow: 9984px 0 0 -5px #666666;
  }
  30% {
    box-shadow: 9984px 0 0 2px #666666;
  }
  60%,
  100% {
    box-shadow: 9984px 0 0 -5px #666666;
  }
}

@keyframes dot-pulse {
  0% {
    box-shadow: 9999px 0 0 -5px #666666;
  }
  30% {
    box-shadow: 9999px 0 0 2px #666666;
  }
  60%,
  100% {
    box-shadow: 9999px 0 0 -5px  #666666;
  }
}

@keyframes dot-pulse-after {
  0% {
    box-shadow: 10014px 0 0 -5px #666666;
  }
  30% {
    box-shadow: 10014px 0 0 2px  #666666;
  }
  60%,
  100% {
    box-shadow: 10014px 0 0 -5px #666666;
  }
}
</style>