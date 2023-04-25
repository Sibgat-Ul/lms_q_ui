<template>
  <q-page class="w-full h-20rem">
    <div class="p-2em w-600px grid gap-1em grid-cols-[repeat(auto-fit,minmax(12em,1fr))]">
      <q-card flat bordered class="w-270px h-auto" v-for="(course, i) in courses" :key="i">
        <img src="https://cdn.quasar.dev/img/mountains.jpg">

        <q-card-section >
          <div class="text-h6"> {{ course.title }}.{{ course.sec }} </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          write
        </q-card-section>
      </q-card>
      </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { authStore } from 'src/stores/auth_store.js'
import { storeToRefs } from 'pinia'
import data from './../../data.json'

export default defineComponent({
  name: 'IndexPage',
  
  setup() {
		let userData = storeToRefs(authStore());
    
    function logData() {
       console.log(userData);
       console.log(data)
		}

    let example = [{
        title: 'course 1',
        sec: 'xyz',
        instructor_initial: 'ABC',
        img: "#",
      }, 
      {
        title: 'course 2',
        sec: 'efg',
        instructor_initial: 'efg',
        img: "#",
      },
      {
        title: 'course 1',
        sec: 'xyz',
        instructor_initial: 'ABC',
        img: "#",
      },
      {
        title: 'course 1',
        sec: 'xyz',
        instructor_initial: 'ABC',
        img: "#",
      },
      {
        title: 'course 1',
        sec: 'xyz',
        instructor_initial: 'ABC',
        img: "#",
      }
    ]       

    let courses = data['course'] == {} ? example : data['course'];
    
    return {
      courses,
      logData
    }
  }
})


</script>
