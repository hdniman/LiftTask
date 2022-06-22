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
    loadQueue (state, payload) {
      state.liftQueue = payload
    },
    addLift (state) {
      state.liftsData.push({
        name: "lift_" + state.liftsData.length,
        position : 100,
        status: "free",
        target: 1
      })
    },
    removeLift (state) {
      if (state.liftsData[state.liftsData.length-1].status == "free") {
        state.liftsData.pop()
      }
    },
    addFloor(state) {
      state.floors.unshift({
        name: state.floors.length+1,
        status:"done"
      })
    },
    removeFloor(state) {
      if (state.floors[0].status == "done" && !state.liftsData.find(el => el.target == state.floors.length)) {
        state.floors.shift()
      }
    },
    clear(state) {
      state.floors = []
      state.liftQueue = []
      state.liftsData = []
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
            return Math.abs(prev.position-target*100) <= Math.abs(curr.position-target*100) ? prev : curr
          })
          lift.target = target
          lift.status = "inWork"
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
          el.status = "awaiting"
          state.floors.find(floorEl => floorEl.name == el.target).status = "done"
          setTimeout(() => {
            el.status = "free"
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
    },
    queue(state) {
      return state.liftQueue
    },
    canDeleteLift(state) {
      if (state.liftsData.length == 0) {
        return false
      } else {
        if (state.liftsData[state.liftsData.length-1].status == "free") {
          return true
        } else {
          return false
        }
      }
    },    
    canDeleteFloor(state) {
      if (state.floors.length == 0) {
        return false
      } else {
        if (state.floors[0].status == "done" && !state.liftsData.find(el => el.target == state.floors.length)) {
          return true
        } else {
          return false
        }
      }
    }
  },
  modules: {
  }
})
