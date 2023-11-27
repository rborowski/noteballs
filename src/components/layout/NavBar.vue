<template>
  <teleport to="#navbar-container">

    <nav class="navbar is-success" aria-label="main navigation" role="navigation">
      <div class="container is-max-desktop px-2">
        <div class="navbar-brand">
          <div class="navbar-item is-size-4 is-family-monospace">
            Noteballs
          </div>

          <a @click="isMobileMenu = !isMobileMenu" ref="burgerButtonRef" role="button" class="navbar-burger"
            :class="{ 'is-active': isMobileMenu }" aria-label="menu" aria-expanded="false"
            data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" ref="navbarMenuRef" class="navbar-menu" :class="{ 'is-active': isMobileMenu }">

          <div class="navbar-end">
            <div class="navbar-item">
              <RouterLink :to="{ name: 'Notes' }" @click="isMobileMenu = !isMobileMenu" class="navbar-item"
                active-class="is-active">
                Notes
              </RouterLink>
              <RouterLink :to="{ name: 'Stats' }" @click="isMobileMenu = !isMobileMenu" class="navbar-item"
                active-class="is-active">
                Stats
              </RouterLink>

            </div>
          </div>
        </div>
      </div>
    </nav>
  </teleport>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { ref } from "vue"
import { onClickOutside } from '@vueuse/core'

const navbarMenuRef = ref(null)
const isMobileMenu = ref(false)
const burgerButtonRef = ref(null)

onClickOutside(navbarMenuRef, () => isMobileMenu.value = false, { ignore: [burgerButtonRef] })

</script>

<style>
.navbar-menu {
  position: absolute;
  left: 0;
  width: 100%;
}</style>