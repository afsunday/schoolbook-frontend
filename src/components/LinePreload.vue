<template>
    <div v-if="loading" class="slider">
        <div class="line"></div>
        <div class="subline inc"></div>
        <div class="subline dec"></div>
    </div>
</template>

<script>
export default {
  name: 'LinePreload',
  props: {
    loading: Boolean
  }
}
</script>

<style scoped>


.slider {
    position: relative;
    width: 100%;
    height: 3px;
    overflow-x: hidden;
}

.line {
    position: absolute;
    opacity: 0.4;
    background: #4a8df8;
    width: 150%;
    height: 3px;
}

.subline {
    position: absolute;
    background: #4a8df8;
    height: 3px;
}

.inc {
    animation: increase 2s infinite
}

.dec {
    animation: decrease 2s 0.5s infinite
}

@keyframes increase {
    from { left: -5%; width: 5%;  }
    to { left: 130%; width: 100%;  }
}

@keyframes decrease {
    from { left: -80%; width: 80%;  }
    to { left: 110%; width: 10%;  }
}

@-webkit-keyframes increase {
    from { -webkit-left: -5%; width: 5%;  }
    to { -webkit-left: 130%; width: 100%;  }
}


@-webkit-keyframes decrease {
    from { -webkit-left: -80%; width: 80%;  }
    to { -webkit-left: 110%; width: 10%;  }
}

@media (max-width: 768px) {
}

</style>
