<template>
  <div class="container">
    <div>
      <div class="liftBlock">
        <lift v-for="lift in liftsData" :key="lift.name" :lift="lift" :liftHeigth="floors.length"></lift>
        <ul>
          <li class="buttons" v-for="floor in floors" :key="floor">
            <button @click="callLift(floor)"
              :class="floor.status == 'done' ? !!liftsData.find(el => el.target == floor.name) ? 'active' : '' : 'called'">
              {{floor.name}}

            </button>
          </li>
        </ul>
      </div>
    </div>
    <div class="settings">
      <button @click="click">Добавить лифт</button>
      <button @click="removeLift" :disabled="!$store.getters['canDeleteLift']">Убрать лифт</button>
      <button @click="addFloor">Добавить этаж</button>
      <button @click="removeFloor" :disabled="!$store.getters['canDeleteFloor']">Убрать этаж</button>
      <button @click="clear">Очистить все</button>
    </div>
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
      store.commit("loadLifts", localStorage.getItem("lifts") == null ? [{
        name: "lift_0",
        position: 100,
        status: "free",
        target: 1
      }] : JSON.parse(localStorage.getItem("lifts")))
      store.commit("loadFloors", localStorage.getItem("floors") == null ? [{
        name: 5,
        status: "done"
      }, {
        name: 4,
        status: "done"
      }, {
        name: 3,
        status: "done"
      }, {
        name: 2,
        status: "done"
      }, {
        name: 1,
        status: "done"
      }] : JSON.parse(localStorage.getItem("floors")))
      store.commit("loadQueue", localStorage.getItem("queue") == null ? [] : JSON.parse(localStorage.getItem("queue")))
      const liftsData = computed(() => {
        return store.getters["liftsData"]
      })
      const floors = computed(() => {
        return store.getters["floors"]
      })
      const click = () => {
        store.commit("addLift")
      }

      const removeLift = () => {
        store.commit("removeLift")
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
        if (!liftsData.value.find(el => el.target == floor.name)) {
          floor.status = "inQueue"
          store.commit("addToQueue", floor.name)
        }
      }

      setInterval(() => {
        store.commit("checkQueue")
        store.commit("liftMovement")
      }, 20)

      window.addEventListener('beforeunload', event => {
        localStorage.setItem("lifts", JSON.stringify(liftsData.value))
        localStorage.setItem("floors", JSON.stringify(floors.value))
        localStorage.setItem("queue", JSON.stringify(store.getters['queue']))
      })



      return {
        liftsData,
        floors,
        click,
        removeLift,
        clear,
        addFloor,
        removeFloor,
        callLift
      }
    }
  }
</script>

<style>
  ul, il {
    padding: 0;
    margin: 0;
  }

  button {
    display: block;
  }

  .container {
    display: flex;
  }

  .settings {
    margin: 50px;
  }

  .liftBlock {
    display: flex;
  }

  .buttons {
    display: flex;
    height: 100px;
    flex-direction: column;
    justify-content: center;
    margin: auto;
  }

  .called {
    border-color: red;
    color: red;
    border-radius: 3px;
  }

  .called:active {
    border-color: blue;
    color: blue;
    border-radius: 3px;
  }

  .active:active {
    border-color: blue;
    color: blue;
    border-radius: 3px;
  }
</style>