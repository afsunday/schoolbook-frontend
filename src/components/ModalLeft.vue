<template>
    <div class="modal" :id="badge" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content border-0">
                <div class="modal-header pt-2 pb-3">

                    <div class="modal-title mt-1" id="modal">
                        <slot name="title"></slot>
                    </div>

                    <button type="button" class="btn-close outline-0 small" data-bs-dismiss="modal" aria-label="close">
                    </button>
                </div>

                <slot name="preloader"></slot>

                    <slot name="body"></slot>                           

                <div class="modal-footer d-block pb-0 px-0">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ModalLeft',
  props: ['badge']
}	
</script>

<style scoped>

.modal.show {
    padding: 0px !important;
}

.modal-dialog {
    margin: 0px;
    max-width: 450px;
}

.modal-dialog > .modal-content {
    height: 100vh;
    border-radius: 0px;
}

.modal-dialog-scrollable .modal-content {
    max-height: unset; 
    overflow: hidden;
}

</style>