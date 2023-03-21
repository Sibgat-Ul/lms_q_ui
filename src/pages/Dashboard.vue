<template>
    <q-header class="bg-transparent">
      <q-toolbar bordered class="relative text-primary flex justify-between w-full h-4em">
       <!--
        <q-btn
          round
          @click="miniState = !miniState"
          aria-label="Menu"
          class="text-primary"
        > 
          <q-icon name="o_menu"></q-icon>
        </q-btn>
       --> 
  
        <q-input 
          rounded
          outlined
          v-model="search" 
          placeholder="Search" 
          dense
          >
          <template v-slot:append>
            <q-icon v-if="search == 'Search...'" name="o_search" />
            <q-icon v-else name="o_clear" class="cursor-pointer" @click="search = ''"/>
          </template>
        </q-input>
        

        <div class="btns flex justify-around w-auto gap-3">
          <q-btn @click="toggleDark" round color="primary">
            <q-icon v-if="darkMode == false" name="o_light_mode"></q-icon>
            <q-icon v-else name="o_dark_mode"></q-icon>
          </q-btn>

          <q-btn dark round icon="o_notifications" color="primary">
            <q-badge floating color="red" rounded />
          </q-btn>
          
          <q-btn round color="primary">
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" alt="">
            </q-avatar>
            <q-menu
              :offset="[0, 12]"
            >
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup>
                  <q-item-section>User</q-item-section>
                </q-item>

                <q-item clickable v-close-popup>
                  <q-item-section>Account</q-item-section>
                </q-item>
                
                <q-item clickable v-close-popup>
                  <q-item-section>Log out</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
        v-model="drawer"
        show-if-above

        :mini="miniState"
        @mouseover="miniState = false"
        @mouseout="miniState = true"

        :width="200"
        :breakpoint="800"
        :bordered="!miniState"
      >
        <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }">
          <q-list class="text-1rem pt-.2em">
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-avatar size="24px">
                  <img src="https://cdn.search.brave.com/serp/v1/static/brand/7aad80c1b58c70bab482ce1e3c4e332fba2eab52180bfca5b012b571a31d2696-brave-logo-small.svg" alt="">
                </q-avatar>
              </q-item-section>

              <q-item-section class="logo">
                Logo
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="o_dashboard" />
              </q-item-section>

              <q-item-section>
                Dashboard
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="o_mail" />
              </q-item-section>

              <q-item-section>
                Mail
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="o_send" />
              </q-item-section>

              <q-item-section>
                Send
              </q-item-section>
            </q-item>

            <q-separator />

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="o_settings" />
              </q-item-section>

              <q-item-section>
                Settings
              </q-item-section>
            </q-item>
            
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="o_power_settings_new" />
              </q-item-section>

              <q-item-section>
                Logout
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
    </q-drawer>

    
    <router-view />
    
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'MainLayout',

  components: {
  },

  setup () {
    let search = ref('')

    const leftDrawerOpen = ref(false)
    const miniState = ref(true)
    const searchText = ref('Search...')
    const drawer = false

    const $q = useQuasar();
    const darkMode = ref(false)
    darkMode.value = $q.dark.isActive
    
    let toggleDark = () => {
      darkMode.value = !darkMode.value
      $q.dark.set(darkMode.value)
    }

    return {
      leftDrawerOpen,
      miniState,
      searchText,
      drawer,
      toggleDark,
      darkMode,
      search
    }
  }
})
</script>

<style scoped>

</style>