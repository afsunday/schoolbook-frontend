<template>
	<div class="border-top mt-2 p-0" style="overflow-x: auto; scrollbar-width:thin;">
		<ul class="nav nav-pills mt-2" id="pills-tab" role="tablist" style="flex-wrap: unset;">
			<li class="nav-item" role="presentation">
				<a class="nav-link ps-0 pb-sm-3 pb-3 active" id="pills-bio-tab" data-bs-toggle="pill" href="#pills-bio" role="tab" aria-controls="pills-bio" aria-selected="true">BioData</a>
			</li>
			<li class="nav-item" role="presentation">
				<a class="nav-link px-sm-3 px-2 pb-sm-3 pb-3" id="pills-fees-tab" data-bs-toggle="pill" href="#pills-fees" role="tab" aria-controls="pills-fees" aria-selected="false">Fees</a>
			</li>
			<li class="nav-item" role="presentation">
				<a class="nav-link px-sm-3 px-2 pb-sm-3 pb-3" id="pills-attendance-tab" data-bs-toggle="pill" href="#pills-attendance" role="tab" aria-controls="pills-attendance" aria-selected="false">Attendance</a>
			</li>
			<li class="nav-item" role="presentation">
				<a class="nav-link px-sm-3 px-2 pb-sm-3 pb-3" id="pills-reports-tab" data-bs-toggle="pill" href="#pills-reports" role="tab" aria-controls="pills-reports" aria-selected="false">Reports</a>
			</li>
			<li class="nav-item" role="presentation">
				<a class="nav-link px-sm-3 px-2 pb-sm-3 pb-3 text-nowrap" id="pills-history-tab" data-bs-toggle="pill" href="#pills-history" role="tab" aria-controls="pills-history" aria-selected="false">Class History</a>
			</li>
		</ul>
	</div>
</template>
<script>
export default {
	name: 'scrollLinks',
	// props: ['links']
}
</script>