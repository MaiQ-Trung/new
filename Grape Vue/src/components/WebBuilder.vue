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
    content: '<div class="text-block">Tuấn</div>',
    category: 'Basic',
    attributes: { class: 'fa fa-font' }
  });
});

function saveAndReload() {
  // Save the changes to storage
  editor.store();
  console.log(editor.getHtml());
  // Reload the page to reflect the saved changes
}
</script>

