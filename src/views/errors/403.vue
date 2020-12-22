<template>
   <div class="flex-body d-flex align-items-center justify-content-center position-relative height">
	    <div class="text-center">
	        <div class="title">
	            <div class="h5">403 <span class="border-left-2 px-2">Forbidden you dont have access to this resources</span></div>
	        </div>
	    </div>
	</div>
</template>

<script>
export default {
  name: 'forbidden'
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
