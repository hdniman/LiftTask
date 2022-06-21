<template>
  <div class="liftShaft" :style="height">
    <div class="lift" :style="position">
    {{lift.target}}
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
    opacity: 0.5;
    width: 70px;
    height: 100px;
    background-color:aquamarine;
    border: solid 1px #000;
    box-sizing: border-box;
}

.liftShaft {
    display: inline-block;
    margin: 0 10px;
    height: 500px;
    background-color: #ccc;
}
</style>