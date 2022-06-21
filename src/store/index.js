import { createStore } from 'vuex'

export default createStore({
  state: {
    liftsData : [],
    floors : [],
    liftQueue : []
  },
  mutations: {
    loadLifts (state, payload) {
      state.liftsData = payload
    },
    loadFloors (state, payload) {
      state.floors = payload
    },
    addLift (state) {
      state.liftsData.push({
        name: "lift_" + state.liftsData.length,
        position : 100,
        status: "free",
        target: 1
      })
    },
    clear (state) {
      state.liftsData = []
    },
    addFloor(state) {
      state.floors.unshift({
        name: state.floors.length+1,
        status:"done"
      })
    },
    removeFloor(state) {
      state.floors.splice(0,1)
    },
    addToQueue(state,payload) {
      state.liftQueue.push(payload)
    },
    checkQueue(state) {
      
      if (state.liftQueue.length != 0) {
        const target = state.liftQueue[0]
        const freeLifts = state.liftsData.filter(el => el.status == "free")
        if (freeLifts.length !=0) {
          const lift = freeLifts.reduce((prev, curr) => {
            console.log(prev.position)
            return Math.abs(prev.position-target*100) <= Math.abs(curr.position-target*100) ? prev : curr
          })
          lift.target = target
          lift.status = "inWork"
          console.log(state.liftQueue)
          state.liftQueue.shift()
          state.floors.find(el => el.name == target).status = "inWork"
        }

      }
    },

    liftMovement(state) {
      const liftsToMove = state.liftsData.filter(el => el.target*100 != el.position)
      liftsToMove.forEach(el => {
        if (el.target*100 - el.position > 0) {
          el.position += 2
        } else {
          el.position -= 2
        }
        if (el.target*100 == el.position) {
          setTimeout(() => {
            el.status = "free"
            state.floors.find(floorEl => floorEl.name == el.target).status = "done"
          },3000)
        }
      })
    }
  },
  actions: {
  },
  getters: {
    liftsData(state) {
      return state.liftsData
    },
    floors(state) {
      return state.floors
    }
  },
  modules: {
  }
})
