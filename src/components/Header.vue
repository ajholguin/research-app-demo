<template>
    <header class="l-header header" role="banner">
        <div class="header__bar">
            <a href="#primary-nav" class="nav-toggle js-nav-toggle" aria-controls="primary-nav" aria-expanded="false" aria-label="Toggle Main Menu">
                <span class="nav-toggle__icon nav-toggle__icon--menu">Menu</span>
            </a>
            <div class="header__fixed-site-name"><a href="#">SiteFarm</a></div>
            <div class="l-container"><a href="https://www.ucdavis.edu/" class=""><img src="../assets/images/uc-logo-white.svg" class="ucd-logo" alt="UC Davis Logo" /></a>
            </div>
        </div>
        <div class="header__branding">
            <div class="l-container o-media">
                <div class="o-media__figure nav-item"><a @click="pageSelected='intro'"><img src="../assets/images/c-horse.svg" class="site-logo" alt="Site Logo" /></a>
                </div>
                <div class="o-media__body">
                    <h1 class="header__site-name">Research App Demo</h1>
                    <div class="header__slogan">Showcasing research from the &lt;something lab&gt;</div>
                </div>
            </div>
        </div>
        <div class="l-navbar navbar menu--closed">
            <div class="l-container--navigation off-canvas off-canvas--left">
                <div class="off-canvas__container">
                <nav id="primary-nav" class="primary-nav primary-nav--superfish" aria-label="Main Menu">
                    <ul class="menu sf-js-enabled sf-arrows">
                        <li class='menu-item nav-item'><a @click="pageSelected='intro'">Intro</a></li>
                        <li class='menu-item menu-item--expanded'>
                            <a class='sf-with-ul' @click="pageSelected='modelsOverview'">AWS Lambda Models<span class="submenu-toggle"><span class="submenu-toggle__icon">+</span></span></a>
                            <ul class="menu">
                                <li class='menu-item nav-item'><a @click="pageSelected='pyModel'">Python Model</a></li>
                                <li class='menu-item nav-item'><a @click="pageSelected='rModel'">R Model</a></li>
                            </ul>
                        </li>
                        <li class='menu-item nav-item'><a @click="pageSelected='pyodideModelPage'">Pyodide Model</a></li>
                    </ul>
                </nav>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import { EventBus } from '../main.js'

export default {
    data: function() {
        return {
            pageSelected: ''
        }
    },
    watch: {
        pageSelected: function() {
            EventBus.$emit('pageChanged', this.pageSelected)
        }
    }
}
</script>

<style scoped>
    .nav-item:hover {
        cursor: pointer;
    }
    .l-navbar {
        padding: 0;
    }
</style>
