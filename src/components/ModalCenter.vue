<template>
	<div class="modal" :id="modalBadge" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content border-0">
                <div class="modal-header py-2">
                    <h6 class="modal-title mt-1" :id="modalBadge">Filter</h6>
                    <button type="button" class="btn-close outline-0 small" data-bs-dismiss="modal" aria-label="close"></button>
                </div>
                <div class="modal-body">
                	<slot/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ModalCenter',
  props: ['modalBadge']
}	
</script>

<style scoped>

@media (max-width: 500px) {
	.modal-dialog {
		position: absolute !important;
		bottom: 0;
		margin: 0;
		width: 100% !important;
	}

	.modal-content {
		border-bottom-left-radius: 0px;
		border-bottom-right-radius: 0px;
		border-top-right-radius: 0.5rem;
		border-top-left-radius: 0.5rem;
	}

}
</style>