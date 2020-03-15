<template lang='pug'>
  v-snackbar(
    v-model="isSnackBarShown"
    :timeout="timeout"
    :top="position === 'top'"
    :bottom="position === 'bottom'"
    :right="position === 'right'"
    :left="position === 'left'"
    :color="color"
  ) {{ snackbarText }}
</template>

<script>
  export default {
    name: 'SnackBar',
    props: {
      isShown: {
        type: Boolean,
        required: true
      },
      position: {
        type: String,
        required: false,
        default: 'bottom'
      },
      snackbarText: {
        type: String,
        required: false,
        default: ''
      },
      color: {
        type: String,
        required: false,
        default: 'success'
      },
      timeout: {
        type: Number,
        required: false,
        default: 2000
      }
    },
    data(){
      return {
        isSnackBarShown: false
      }
    },
    watch: {
      isShown(newValue){
        this.isSnackBarShown = newValue
      }
    }
  }
</script>