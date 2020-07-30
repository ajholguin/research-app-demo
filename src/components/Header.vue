<template>
  <div>
    <h1>Research App Demo</h1>
    <ul class='nav justify-content-center'>
        <li class='nav-item'><a class='nav-link' @click="pageSelected='intro'">Intro</a></li>
        <li class='nav-item'><a class='nav-link' @click="pageSelected='models'">Models</a></li>
    </ul>
  </div>
</template>

<script>
export default {
    data: function() {
        return {
            pageSelected: ''
        }
    },
    watch: {
        pageSelected: function() {
            this.$emit('pageWasChanged', this.pageSelected)
        }
    }
}
</script>

<style scoped>
    .nav-item:hover {
        cursor: pointer;
    }
</style>
