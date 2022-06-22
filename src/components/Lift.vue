<template>
  <div class="liftShaft" :style="height">
    <div class="lift" :style="position" :class="lift.status == 'awaiting'? 'blink': ''">
    {{lift.target*100 > lift.position ? "▲" : lift.target*100 < lift.position ? "▼" : "&emsp;"}} {{lift.target}}
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'

export default {
    props: ['lift','liftHeigth'],
    setup(prop) {
        const height = computed(() => {
            return {
                "height" : `${100*prop.liftHeigth}px`
            }
        })
        const position = computed(() => {
            return {
                "margin-top" : `${100*prop.liftHeigth - prop.lift.position}px`
            }
        })
        return {
            height,
            position
        }
    }

}
</script>

<style scoped>
.lift {
    width: 70px;
    height: 100px;
    background-color:aquamarine;
    border: solid 1px #000;
    box-sizing: border-box;
    text-align: center;
    color: rgb(224, 138, 138);
    font-size: 1.5em;
}

.liftShaft {
    display: inline-block;
    margin: 0 10px;
    height: 500px;
    background-color: #ccc;
}

.blink {
  -webkit-animation: blink 1s linear infinite;
  animation: blink 1s linear infinite;
}
@-webkit-keyframes blink {
  0% { opacity: 1; }
  50% { opacity: 0.3; }
  100% { opacity: 1; }
}
@keyframes blink {
  0% { opacity: 1; }
  50% { opacity: 0.3; }
  100% { opacity: 1; }
}

</style>