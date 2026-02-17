<template>
  <div class="relative w-full aspect-video bg-brand-dark rounded-lg overflow-hidden border border-brand-border">
    <video
      ref="videoRef"
      class="w-full h-full object-contain"
      :src="src"
      :poster="poster"
      playsinline
      @timeupdate="onTimeUpdate"
      @loadedmetadata="onLoadedMetadata"
      @loadeddata="onLoadedData"
      @error="onVideoError"
      @play="isPlaying = true"
      @pause="isPlaying = false"
    />
    <div
      v-if="isLoading"
      class="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/60 pointer-events-none"
      aria-live="polite"
      aria-busy="true"
    >
      <Icon name="heroicons:arrow-path" class="w-10 h-10 text-brand-primary animate-spin shrink-0" aria-hidden="true" />
      <span class="mt-3 text-sm font-medium text-white">Carregando vídeo...</span>
    </div>
    <div
      class="absolute inset-x-0 bottom-0 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent pt-12 pb-2 px-3"
    >
      <input
        v-model.number="progress"
        type="range"
        min="0"
        max="100"
        step="0.1"
        class="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-brand-surface accent-brand-primary [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-primary"
        aria-label="Progresso do vídeo"
        :aria-valuenow="Math.round(progress)"
        aria-valuemin="0"
        aria-valuemax="100"
        @input="onSeek"
      >
      <div class="flex items-center justify-between gap-2 mt-1">
        <div class="flex items-center gap-2">
          <button
            type="button"
            class="p-1.5 text-text-primary hover:text-brand-primary transition-colors rounded focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
            :aria-label="isPlaying ? 'Pausar' : 'Reproduzir'"
            @click="togglePlay"
          >
            <Icon :name="isPlaying ? 'heroicons:pause' : 'heroicons:play'" class="w-5 h-5" />
          </button>
          <button
            type="button"
            class="p-1.5 text-text-primary hover:text-brand-primary transition-colors rounded focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
            aria-label="Volume"
            @click="toggleMute"
          >
            <Icon :name="isMuted ? 'heroicons:speaker-x-mark' : 'heroicons:speaker-wave'" class="w-5 h-5" />
          </button>
          <span class="text-xs text-text-secondary tabular-nums">{{ timeDisplay }}</span>
        </div>
        <div class="flex items-center gap-1">
          <button
            type="button"
            class="p-1.5 text-text-primary hover:text-brand-primary transition-colors rounded focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
            aria-label="Legendas"
          >
            <Icon name="heroicons:chat-bubble-bottom-center-text" class="w-5 h-5" />
          </button>
          <button
            type="button"
            class="p-1.5 text-text-primary hover:text-brand-primary transition-colors rounded focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
            aria-label="Configurações"
          >
            <Icon name="heroicons:cog-6-tooth" class="w-5 h-5" />
          </button>
          <button
            type="button"
            class="p-1.5 text-text-primary hover:text-brand-primary transition-colors rounded focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
            :aria-label="isFullscreen ? 'Sair da tela cheia' : 'Tela cheia'"
            @click="toggleFullscreen"
          >
            <Icon :name="isFullscreen ? 'heroicons:arrows-pointing-in' : 'heroicons:arrows-pointing-out'" class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="!src && !poster"
      class="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-brand-surface"
    >
      <Icon name="heroicons:play-circle" class="w-16 h-16 text-brand-primary shrink-0" />
      <span v-if="placeholderLabel" class="text-sm text-text-secondary text-center px-4">{{ placeholderLabel }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
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
const isMuted = ref(false)
const isFullscreen = ref(false)
const progress = ref(0)
const currentTime = ref(0)
const duration = ref(0)

const timeDisplay = computed(() => {
  const c = Math.floor(currentTime.value)
  const d = Math.floor(duration.value)
  const cm = Math.floor(c / 60)
  const cs = c % 60
  const dm = Math.floor(d / 60)
  const ds = d % 60
  return `${String(cm).padStart(2, '0')}:${String(cs).padStart(2, '0')} / ${String(dm).padStart(2, '0')}:${String(ds).padStart(2, '0')}`
})

function onTimeUpdate() {
  const v = videoRef.value
  if (!v)
    return
  currentTime.value = v.currentTime
  duration.value = v.duration
  if (v.duration > 0 && Number.isFinite(v.duration))
    progress.value = (v.currentTime / v.duration) * 100
}

function onLoadedMetadata() {
  const v = videoRef.value
  if (v)
    duration.value = v.duration
}

function onLoadedData() {
  isLoading.value = false
}

function onVideoError() {
  isLoading.value = false
}

function togglePlay() {
  const v = videoRef.value
  if (!v)
    return
  if (v.paused)
    v.play()
  else
    v.pause()
}

function toggleMute() {
  const v = videoRef.value
  if (!v)
    return
  v.muted = !v.muted
  isMuted.value = v.muted
}

function onSeek(e: Event) {
  const v = videoRef.value
  const target = e.target as HTMLInputElement
  if (!v || !target)
    return
  const p = Number(target.value) / 100
  v.currentTime = p * v.duration
  progress.value = Number(target.value)
}

function toggleFullscreen() {
  const container = videoRef.value?.parentElement
  if (!container)
    return
  if (!document.fullscreenElement) {
    container.requestFullscreen().then(() => { isFullscreen.value = true }).catch(() => {})
  }
  else {
    document.exitFullscreen().then(() => { isFullscreen.value = false }).catch(() => {})
  }
}

watch(
  () => props.src,
  (newSrc) => {
    if (newSrc?.trim())
      isLoading.value = true
    else
      isLoading.value = false
  },
)

onMounted(() => {
  if (props.src?.trim())
    isLoading.value = true
  document.addEventListener('fullscreenchange', () => {
    isFullscreen.value = !!document.fullscreenElement
  })
})
</script>
