<template>
  <div class="w-full h-screen bg-blue-50 items-center p-20">
    <UserTree :users="users" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import UserTree from "./UserTree.vue";

const users = ref([
  {
    name: "CEO",
    children: [
      {
        name: "COD",
        children: [
          {
            name: "Ban Kinh Doanh",
            children: [
              {
                name: "Phòng Kinh Doanh 1",
                children: [
                  {
                    name: "Group 1",
                    children: [{ name: "User 1" }, { name: "User 2" }],
                  },
                  {
                    name: "Group 2",
                    children: [{ name: "User 3" }, { name: "User 4" }],
                  },
                ],
              },
              {
                name: "Phòng Kinh Doanh 2",
                children: [
                  {
                    name: "Group 1",
                    children: [{ name: "User 5" }, { name: "User 6" }],
                  },
                  {
                    name: "Group 2",
                    children: [{ name: "User 7" }, { name: "User 8" }],
                  },
                ],
              },
            ],
          },
          {
            name: "Ban Kỹ Thuật",
            children: [
              {
                name: "Phòng Kỹ Thuật 1",
                children: [
                  {
                    name: "Group 1",
                    children: [{ name: "User 9" }, { name: "User 10" }],
                  },
                  {
                    name: "Group 2",
                    children: [{ name: "User 11" }, { name: "User 12" }],
                  },
                ],
              },
              {
                name: "Phòng Kỹ Thuật 2",
                children: [
                  {
                    name: "Group 1",
                    children: [{ name: "User 13" }, { name: "User 14" }],
                  },
                  {
                    name: "Group 2",
                    children: [{ name: "User 15" }, { name: "User 16" }],
                  },
                ],
              },
            ],
          },
          // {
          //   name: "Ban Vận Hành",
          //   children: [
          //     {
          //       name: "Phòng Vận Hành 1",
          //       children: [
          //         {
          //           name: "Group 1",
          //           children: [
          //             { name: "User 17" },
          //             { name: "User 18" }
          //           ]
          //         },
          //         {
          //           name: "Group 2",
          //           children: [
          //             { name: "User 19" },
          //             { name: "User 20" }
          //           ]
          //         }
          //       ]
          //     },
          //     {
          //       name: "Phòng Vận Hành 2",
          //       children: [
          //         {
          //           name: "Group 1",
          //           children: [
          //             { name: "User 21" },
          //             { name: "User 22" }
          //           ]
          //         },
          //         {
          //           name: "Group 2",
          //           children: [
          //             { name: "User 23" },
          //             { name: "User 24" }
          //           ]
          //         }
          //       ]
          //     }
          //   ]
          // }
        ],
      },
    ],
  },
]);
</script>
