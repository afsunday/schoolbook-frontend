<template>
  <div v-if="loading" class="d-flex justify-content-center">
     <div class="loader mr-2" />
  </div>
</template>

<script>
export default {
  name: 'SpinLoader',
  props: {
    loading: Boolean
  }
}
</script>

<style scoped>

.loader {
   border: 3px solid #cce6ff;
   border-top: 3px solid #3498db;
   border-radius: 50%;
   width: 30px;
   height: 30px;
   -webkit-animation: spin 0.65s linear infinite;
   animation: spin 0.65s linear infinite;
}

@-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg);  }
    100% { -webkit-transform: rotate(360deg);  }
}

@keyframes spin {
    0% { transform: rotate(0deg);  }
    100% { transform: rotate(360deg);  }
}

</style>
