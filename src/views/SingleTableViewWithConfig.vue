<template>
<json-single-table :config="config"></json-single-table>
</template>

<script>
import config from './SingleTableViewConfig'

export default {
  name: 'HomeView',
  data() {
    return {
      config
    }
  }
}
</script>
