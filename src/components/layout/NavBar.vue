<template>
  <teleport to="#navbar-container">

    <nav class="navbar is-success" aria-label="main navigation" role="navigation">
      <div class="container is-max-desktop px-2">
        <div class="navbar-brand">
          <div class="navbar-item is-size-4 is-family-monospace">
            Noteballs
          </div>

          <a @click.prevent="isMobileMenu = !isMobileMenu" ref="burgerButtonRef" role="button" class="navbar-burger"
            :class="{ 'is-active': isMobileMenu }" aria-label="menu" aria-expanded="false"
            data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" ref="navbarMenuRef" class="navbar-menu" :class="{ 'is-active': isMobileMenu }">
          <div class="navbar-start">
            <div class="navbar-item buttons" v-if="storeAuth.user.id">
              <button @click="logoutButtonHandle" class="button is-small is-info" 
                active-class="is-active">
                Logout {{ storeAuth.user.email }}
              </button>
            </div>
          </div>
          <div class="navbar-end">
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
    </nav>
  </teleport>
</template>

<script setup>
import { ref } from "vue"
import { onClickOutside } from '@vueuse/core'
import { useAuthStore } from "../../stores/storeAuth";

const storeAuth = useAuthStore();

const navbarMenuRef = ref(null)
const isMobileMenu = ref(false)
const burgerButtonRef = ref(null)

function logoutButtonHandle() {
  storeAuth.logoutUser()
  isMobileMenu.value = !isMobileMenu.value
}

onClickOutside(navbarMenuRef, () => isMobileMenu.value = false, { ignore: [burgerButtonRef] })

</script>

<style>
@media (max-width: 1023px) {
  .navbar-menu {
    position: absolute;
    left: 0;
    width: 100%;
  }
}
</style>