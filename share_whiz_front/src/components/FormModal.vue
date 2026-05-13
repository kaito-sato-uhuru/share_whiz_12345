<script setup>
import { computed } from 'vue'
import PostForm from './PostForm.vue'

const props = defineProps({
  body: String
})

const component = computed(() => {
  return props.body === 'newPost' ? PostForm : null
});

const emit = defineEmits('close-modal')

// closeModal関数を追加
const closeModal = () => {
  emit('close-modal')
}
</script>

<template>
  <Modal v-model="showModal">
    <h2 class="modal-title">新規投稿</h2>
    <component :is="component" @close-modal="closeModal" />
  </Modal>
</template>


<style>
.vm {
  height: 75vh;
  padding: 2vw 10vw;
  text-align: center;
  overflow-y: auto;
}
</style>