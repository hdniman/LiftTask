<template>
<div>
  
  {{liftsData}}
</div><div>
    {{floors}}
</div><div>
    {{$store.state.liftQueue}}
</div>

  <button @click="click">click</button>
  <button @click="clear">clear</button>
  <button @click="addFloor">addFloor</button>
  <button @click="removeFloor">removeFloor</button>
  <button @click="checkQueue">checkQueue</button>
  <div class="liftBlock">
    <lift v-for="lift in liftsData" :key="lift.name" :lift="lift" :liftHeigth="floors.length"></lift>
    <ul>
    <li class="buttons" v-for="floor in floors" :key="floor">
      <button @click="callLift(floor)" :disabled="floor.status == 'inQueue' || floor.status == 'inWork'">
    {{floor.name}}

      </button>
    </li>
    </ul>
  </div>
</template>

<script>
  import {
    computed
  } from '@vue/runtime-core'
  import {
    useStore
  } from 'vuex'
  import Lift from './components/Lift.vue'

  export default {
    name: 'App',
    components: {
      Lift
    },
    setup() {
      const store = useStore()
      store.commit("loadLifts", localStorage.getItem("lifts") == null ? [] : JSON.parse(localStorage.getItem("lifts")))
      const liftsData = computed(() => {
        return store.getters["liftsData"]
      })
      const liftHeigth = computed(() => {
        return store.getters["liftHeigth"]
      })
      const floors = computed(() => {
        return store.getters["floors"]
      })
      const click = () => {
        store.commit("addLift")
      }

      const clear = () => {
        store.commit("clear")
      }
      
      const addFloor = () => {
        store.commit("addFloor")
      }
      
      const removeFloor = () => {
        store.commit("removeFloor")
      }

      const callLift = (floor) => {
        floor.status = "inQueue"
        store.commit("addToQueue", floor.name)
      }

      setInterval(() => {
        store.commit("checkQueue")
        store.commit("liftMovement")
      },50)
      const checkQueue = () => {
        store.commit("checkQueue")
      }

      window.addEventListener('beforeunload', event => {
        localStorage.setItem("lifts", JSON.stringify(liftsData.value))
      })



      return {
        liftsData,
        floors,
        click,
        clear,
        addFloor,
        removeFloor,
        callLift,
        checkQueue
      }
    }
  }
</script>

<style>
ul, il {
  padding: 0;
  margin: 0;
}
.liftBlock{
  display: flex;
}
.buttons {
  display: flex;
  height: 100px;
  flex-direction: column;
  justify-content: center;
  margin: auto;
}
</style>