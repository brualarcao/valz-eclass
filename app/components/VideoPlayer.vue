<template>
  <div class="relative w-full aspect-video bg-brand-dark rounded-lg overflow-hidden border border-brand-border">
   <template v-if="isYouTube">
      <iframe :src="youtubeEmbedUrl" class="w-full h-full" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen></iframe>
    </template>

    <template v-else-if="src">
      <video ref="videoRef" class="w-full h-full object-contain" :src="src" :poster="poster" autoplay muted playsinline
        @play="isPlaying = true" @pause="isPlaying = false" @timeupdate="onTimeUpdate"
        @loadedmetadata="onLoadedMetadata" @loadeddata="onLoadedData" @error="onVideoError" />

      <div v-if="isLoading" class="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/60">
        <Icon name="heroicons:arrow-path" class="w-10 h-10 text-brand-primary animate-spin" />
      </div>
   </template>

    <div v-else class="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-brand-surface">
      <Icon name="heroicons:play-circle" class="w-16 h-16 text-brand-primary shrink-0" />
      <span v-if="placeholderLabel" class="text-sm text-text-secondary text-center px-4">{{ placeholderLabel }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

const props = withDefaults(
  defineProps<{
    src?: string
    poster?: string
    placeholderLabel?: string
  }>(),
  { src: '', poster: '', placeholderLabel: '' },
)

const videoRef = ref<HTMLVideoElement | null>(null)
const isLoading = ref(false)
const isPlaying = ref(false)

const isYouTube = computed(() => {
  return props.src?.includes('youtube.com') || props.src?.includes('youtu.be')
})

const youtubeEmbedUrl = computed(() => {
  if (!props.src) return ''

  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  const match = props.src.match(regExp)
  const videoId = (match && match[2] && match[2].length === 11) ? match[2] : null

  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`
  }
  return ''
})

function onTimeUpdate() { }
function onLoadedMetadata() { }
function onLoadedData() { isLoading.value = false }
function onVideoError() { isLoading.value = false }

watch(() => props.src, (newSrc) => {
  if (newSrc?.trim() && !isYouTube.value) {
    isLoading.value = true
  } else {
    isLoading.value = false
  }
}, { immediate: true })
</script>