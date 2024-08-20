<template>
  <div>
    <div id="gjs"></div>
    <button @click="saveAndReload">Save</button>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import grapesjsPresetWebpage from "grapesjs-preset-webpage";

let editor;

const emits = defineEmits(["save"]);

const props = defineProps({
  default: {
    type: String,
    default: '<div class="text-block">Text here...</div>',
  },
});


onMounted(() => {
  editor = grapesjs.init({
    container: "#gjs",
    fromElement: true,
    height: "690px",
    width: "auto",
    storageManager: {
      id: "local",
      type: "local",
      autosave: true,
      autoload: true,
      stepsBeforeSave: 1,
    },
    plugins: [grapesjsPresetWebpage],
    pluginsOpts: {
      "grapesjs-preset-webpage": {
        blocksBasicOpts: {
          blocks: [
            "column1",
            "column2",
            "column3",
            "column3-7",
            "text",
            "link",
            "image",
            "video",
          ],
          flexGrid: 1,
        },
        blocks: ["link-block", "quote", "text-basic"],
      },
    },
  });

  // Thêm block mới
  editor.BlockManager.add('text', {
    label: 'Text',
    content: props.default,
    category: 'Basic',
    attributes: { class: 'fa fa-font' }
  });
});

function saveAndReload() {
  editor.store();
  const log = editor.getHtml();
  emits('save', log);
}
</script>