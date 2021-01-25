<template>
    <div v-if="ListTotalPage" class="d-flex justify-content-between px-2 px-sm-3">
        <div>
            <a v-if="ListTotalPage" class="text-dark small text-decoration-none mt-2">
                Page <span>{{ListCurrentPage}}</span> of <span>{{ListTotalPage}}</span>
            </a>
        </div>

        <nav aria-label="Page navigation">
            <ul class="pagination">
                <li :class="{'page-item': true, 'disabled': (ListPrevPage === false) }">
                    <a class="btn-link page-link no-outline" aria-label="Previous" :id="ListPrevPage" @click="$emit('changePage', $event)" >
                       Prev
                    </a>
                </li>
                <li :class="{'page-item dropup': true, 'disabled': (ListNextPage === false && ListPrevPage === false) }">
                    <a class="page-link no-outline text-muted" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expaneded="false"><i class="fas fa-ellipsis-h fa-sm"></i></a>
                    <div class="dropdown-menu dropdown-menu-right text-center border-0 shadow">
                        <a v-for="page in ListPagesLength" :id="page" :class="{'dropdown-item': true, 'disabled': (page === ListCurrentPage) }" @click="$emit('changePage', $event)" >{{ page }}</a>
                    </div>
                </li>
                <li :class="{'page-item': true, 'disabled': (ListNextPage === false) }">
                    <a class="page-link no-outline" aria-label="Next" :id="ListNextPage" @click="$emit('changePage', $event)" > 
                        Next
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'PaginationLinks',
    props: [
        'ListTotalPage',
        'ListCurrentPage',
        'ListPrevPage',
        'ListNextPage',
        'ListPagesLength'
    ],
}
</script>

<style scoped>
.dropdown-menu.show {
    min-width: 30px;
    left: 6px !important;
}

.dropdown-item {
    padding: .1rem 1.5rem !important;
}
</style>
