<template>
	<div>
		<div class="card border-0 shadow-sm">
			<div class="card-header bg-white d-flex justify-content-between px-2">
				<div class="mr-auto">
	                <div class="input-group">
                        <div class="input-group-text bg-light">
                            <a href="" class="text-dark text-decoration-none small" data-bs-toggle="modal" data-bs-target="">
                                <i class="fas fa-calendar-week fa-lg"></i>
                            </a>
                        </div>
	                    <select class="form-select">
	                    	<option value="">select</option>
							<option value="">2020/2021 first term</option>
							<option value="">2020/2021 second term</option>
						</select>
	                </div>
               </div>
            </div>				
			
			<div class="card-body px-2">
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'StudentAttendance',
	data() {
		return {
			//
		}
	}
}
</script>

<style scoped>
.item-box {

}
</style>