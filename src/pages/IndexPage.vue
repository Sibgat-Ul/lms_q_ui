<template>
  <q-page class="w-full h-20rem">
    <div class="p-2em grid gap-1em grid-cols-[repeat(auto-fit,minmax(12em,1fr))]">
      <q-card flat bordered class="w-full" v-for="(course, i) in courses" :key="i">
        <img src="https://cdn.quasar.dev/img/mountains.jpg">

        <q-card-section >
          <div class="text-h6"> {{ course.title }}.{{ course.sec }} </div>
          <div class="text-subtitle2"> by {{ course.instructor_initial }} </div>
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

export default defineComponent({
  name: 'IndexPage',
  
  setup() {
    let courses = [{
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
    
    return {
      courses
    }
  }
})


</script>
