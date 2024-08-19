<template>
  <div id="gjs"></div>
</template>

<script setup>
import {  onMounted, ref } from 'vue';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import grapesjsPresetWebpage from 'grapesjs-preset-webpage';

// Khai báo biến message như là một ref để có thể thay đổi
const message = defineModel("message");

onMounted(() => {
  const editor = grapesjs.init({
    container: '#gjs',
    fromElement: true,
    height: '690px',
    width: 'auto',
    storageManager: {
      id: 'local',
      type: 'local',
      autosave: true,
      autoload: true,
    },
    plugins: [grapesjsPresetWebpage],
    pluginsOpts: {
      'grapesjs-preset-webpage': {
        blocksBasicOpts: {
          blocks: [
            'column1',
            'column2',
            'column3',
            'column3-7',
            'text',
            'link',
            'image',
            'video',
          ],
          flexGrid: 1,
        },
        blocks: ['link-block', 'quote', 'text-basic'],
      },
    },
  });

  editor.on('component:add', (component) => {
    // Kiểm tra nếu component là thẻ section
    if (component.get('tagName') === 'blockquote') {
      // Lấy nội dung của thẻ section và gán cho message
      message.value = component.toHTML();
    }
  });

  // Optional: You might want to add a way to handle components that are already present when the editor is initialized
  editor.on('component:rendered', (component) => {
    if (component.get('tagName') === 'blockquote') {
      message.value = component.toHTML();
    }
  });
});
</script>
