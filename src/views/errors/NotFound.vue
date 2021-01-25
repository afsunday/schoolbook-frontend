<template>
   <div class="flex-body d-flex align-items-center justify-content-center position-relative height">
	    <div class="text-center">
	        <div class="title">
	            <div class="h6">404 <span class="border-left-2 px-2">Page Not Found</span></div>
	        </div>
	    </div>
	</div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>

.flex-body {
    font-family: 'Nunito', sans-serif;
    color: #636b6f;
    font-weight: 100;
    height: 100vh;
    margin: 0;
}

.height {
    height: 100vh;
}

.title {
    font-size: 36px;
    padding: 20px;
}

.border-left-2 {
	border-left: 2px solid  #636b6f;
}

</style>
