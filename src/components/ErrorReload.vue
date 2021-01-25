<template>
    <div v-if="hasError" class="mt-4">
        <div v-if="netError" class="text-center">
            <svg viewBox="0 0 24 24" class="err-cloud"><g><path d="M1.626 17.87c.125 0 .253-.03.37-.098.36-.205.485-.663.28-1.023-.355-.627-.544-1.343-.544-2.07 0-2.218 1.732-4.02 3.913-4.172.018.282.046.564.096.84.067.36.383.614.738.614.045 0 .09-.004.136-.012.407-.074.678-.465.604-.873-.062-.34-.094-.69-.094-1.04 0-3.204 2.606-5.81 5.81-5.81.58 0 1.15.085 1.702.253.394.123.814-.103.937-.498.12-.396-.103-.815-.5-.937-.69-.21-1.41-.318-2.14-.318-3.673 0-6.714 2.727-7.225 6.262-3.04.118-5.475 2.62-5.475 5.69 0 .986.256 1.958.74 2.81.138.243.39.38.653.38zm18.554-6.802c.03-.312.063-.78.063-1.032 0-.59-.07-1.177-.21-1.745-.1-.4-.503-.645-.907-.55-.402.1-.648.506-.55.908.11.45.167.92.167 1.388 0 .203-.03.615-.055.888-2.067.132-3.816 1.567-4.306 3.603-.097.402.15.808.555.904.397.094.808-.15.904-.554.352-1.46 1.647-2.48 3.15-2.48 1.788 0 3.242 1.455 3.242 3.242s-1.454 3.24-3.24 3.24H8.454c-.414 0-.75.336-.75.75s.336.75.75.75H18.99c2.615 0 4.742-2.126 4.742-4.74 0-2.2-1.514-4.038-3.55-4.57zm.878-8.848c-.293-.293-.768-.293-1.06 0l-19 19c-.294.293-.294.768 0 1.06.145.147.337.22.53.22s.383-.072.53-.22l19-19c.293-.293.293-.767 0-1.06z"></path></g></svg>

            <div class="re-text font-weight-normal mt-2 px-2"><span>Please check your connection and try again.</span></div>
        </div>
        <div class="d-flex flex-column align-items-center">
            <div v-if="reqError" class="err-info-text text-center px-2">Oops something went wrong try again.</div>
            <button class="d-flex btn no-focus mt-3" @click="$emit('retry', $event)">
                <svg viewBox="0 0 24 24" class="btn-icon">
                    <g><path d="M12 2C6.486 2 2 6.486 2 12c0 .414.336.75.75.75s.75-.336.75-.75c0-4.687 3.813-8.5 8.5-8.5s8.5 3.813 8.5 8.5-3.813 8.5-8.5 8.5c-2.886 0-5.576-1.5-7.13-3.888l2.983.55c.402.08.798-.193.874-.6.076-.408-.194-.8-.6-.874l-4.663-.86c-.204-.04-.414.01-.58.132-.168.123-.276.31-.3.515l-.57 4.706c-.05.412.242.785.653.835.03.004.06.006.09.006.375 0 .698-.278.745-.66l.32-2.63C5.673 20.36 8.728 22 12 22c5.514 0 10-4.486 10-10S17.514 2 12 2z"></path></g>
                </svg>
                <span class="btn-text text-nowrap">Try again</span>
            </button>
        </div>
    </div>
</template>

<script>

export default {
    name: 'ErrorReload',
    props: ['hasError', 'netError', 'reqError']
}
</script>

<style scoped>
.btn {
   border-radius: 30px;
   background-color: rgb(24, 145, 240);
   color: #fff;
}

.btn:hover {
    background-color: rgb(24, 145, 219);
}

.no-focus:focus {
    box-shadow: none;
}

.err-info-text {
    line-height: 1.3125;
    font-size: 15px;
}

.re-text {
    font-size: 15px;
    font-weight: 600;
    line-height: 1.255;
}

.btn-icon {
    font-size: 16px;
    font-weight: bolder;
    margin-right: .3rem;
    color: rgb(255, 255, 255);
    fill: rgb(255, 255, 255);
    height: 1.3rem;
    width: 1.3rem;
    user-select: none;
}

.btn-text {
    font-size: 14px;
    font-weight: 600;
    line-height: 1.3;
}

.err-cloud {
    position: relative;
    height: 2.1rem;
    max-width: 100%;
    display: inline-block;
    user-select: none;
    color: rgb(91, 112, 131);
    fill: currentColor;
}
</style>