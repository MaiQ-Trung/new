// store.js
import { ref } from "vue";


export const useStore = () => {
  const sidebarItems = ref([
    {
      id: 0,
      image: "https://littlealchemy.com/hints/icons-png/1.png",
      name: "Water",
    },
    {
      id: 1,
      image: "https://littlealchemy.com/hints/icons-png/2.png",
      name: "Fire",
    },
    {
      id: 2,
      image: "https://littlealchemy.com/hints/icons-png/3.png",
      name: "Earth",
    },
    {
      id: 3,
      image: "https://littlealchemy.com/hints/icons-png/4.png",
      name: "Air",
    },
    
  ]);


  return {
    sidebarItems,
  };
};
