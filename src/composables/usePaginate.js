import { ref, reactive } from 'vue'

export default (res) => {

	let paging = reactive({
        currentPage: null,
        nextPage: false,
        prevPage: false,
        totalPage: null,
        pagesLength: null,
    });


    if(res.data.next_page_url === null) {
        paging.nextPage = false;
    } else {
       paging.nextPage = res.data.next_page_url.split('=')[1]; 
    }

    if(res.data.prev_page_url === null) {
        paging.prevPage = false;
    } else {
        paging.prevPage = res.data.prev_page_url.split('=')[1];
    }

    paging.currentPage = res.data.current_page;
    paging.totalPage = res.data.last_page;

    let pageLinks = res.data.links;
    paging.pagesLength = pageLinks.slice(1, pageLinks.length - 1).length;

    return {
    	paging
    }
}