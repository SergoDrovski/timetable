<template>
  <div class="event">
    <div v-for="(event, index) in data" :key="event.__2" ref="cards" :data-time="event.__2">
      <div class="event__card" v-if="index >= activeCardIndex" :class="classObject(event, index)">
        <!-- прогресс бар  -->
        <ProgressBar
            v-if="index === activeCardIndex"
            :time="event.__2"
            :duration="event.__3"
            :isStart="isStart"
            @end-timer="updateActiveCard($event)"
        />

        <!-- время -->
        <div class="event__time-wrapper">
          <p class="event__time">{{ getDurationEvent(event.__2, event.__3) }}</p>
          <p class="event__time-left" v-if="index === activeCardIndex">
            {{ getTimeRemaining(event.__2, event.__3) }}
          </p>
        </div>

        <!-- спикер -->
        <div class="event__speakers speakers" v-if="event.__5 !== '-'">
          <div class="speakers__wrapper">
            <div class="speakers__photo">
              <img class="speakers__img" :src="event.__5" alt="speaker" />
            </div>
            <div class="speakers__description">
              <p class="speakers__name">{{ event.__4.split('/')[0] }}</p>
              <p class="speakers__profession">{{ event.__4.split('/')[1] }}</p>
            </div>
          </div>
        </div>

        <!-- событие -->
        <p class="event__name">{{ event.__1 }}</p>

        <!-- инфрмация о событии -->
        <div class="event__bottom" v-if="event.__6 !== '-'">
          <Text class="event__type" :text="event.__6" />
          <Text class="event__lang" :text="event.__7" />
          <Text class="event__theme" :text="event.__8" />
        </div>
      </div>
    </div>
    <div v-if="data.length === 0" class="event__noData">Нет данных</div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeMount, ref, watch } from 'vue'
import utils from '../utils/utils'
import Text from 'src/shared/ui/text/Text.vue'
import ProgressBar from './ProgressBar.vue'

defineProps({
  data: {
    type: Array,
    default: function () {
      return []
    }
  }
})

const isStart = ref(false)
const cards = ref([])
// const activeCard = ref(false)

const activeCardIndex = ref(0)

function updateCards() {
  const intervalId = setInterval(function () {
    const now = new Date()
    const currentTime = now.getHours() + ':' + String(now.getMinutes()).padStart(2, '0')

    cards.value.forEach((card) => {
      const cardTime = card.getAttribute('data-time')

      if (cardTime <= currentTime) {
        activeCardIndex.value++
        clearInterval(intervalId)
      }
    })
  }, 0)
}

function getDurationEvent(time, duration) {
  const dateObject = utils.timeToDate(time.split(':')[0], time.split(':')[1])
  const start = new Date(dateObject)
  const end = new Date(start.getTime() + duration * 60000)

  let startMinutes = start.getMinutes()
  let endMinutes = end.getMinutes()

  if (start.getMinutes() <= 9) {
    startMinutes = '0' + start.getMinutes()
  }
  if (end.getMinutes() <= 9) {
    endMinutes = '0' + end.getMinutes()
  }

  return `${start.getHours()}:${startMinutes} - ${end.getHours()}:${endMinutes}`
}

function getTimeRemaining(startTime, durationMinutes) {
  let x
  const [hours, minutes] = startTime.split(':').map(Number)
  const startDate = new Date()
  startDate.setHours(hours, minutes, 0, 0)

  const endDate = new Date(startDate.getTime() + durationMinutes * 60000)

  // const timeinterval = setInterval(updateClock, 1000)

  function updateClock() {
    const now = new Date()
    const t = endDate - now

    const minutesRemaining = Math.round(t / 1000 / 60)

    if (t === 0) {
      // clearInterval(timeinterval)
      console.log('Время истекло')
      return
    } else {
      x = minutesRemaining
    }
  }

  updateClock()
  return `Осталось ${x} минут `
}

function updateActiveCard(e) {
  // activeCardIndex.value++
  console.log('ok', e)
}

function classObject(obj, index) {
  return {
    'event__card--active': index === activeCardIndex.value,
    'event__card--dinner': obj.__4 && obj.__5 && obj.__6 && obj.__7 && obj.__8 === '-'
  }
}
watch(activeCardIndex, (val) => {
  return val
})

onBeforeMount(() => {
  updateCards()
})
onMounted(() => {
  isStart.value = true
})
</script>
<style>
@import 'EventCard.scss';
</style>