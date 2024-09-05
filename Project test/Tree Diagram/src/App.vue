<template>
  <div id="app">
    <div class="flex w-screen h-screen p-20">
      <UserTree :users="users" :ceoName="users[0].name"/>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import UserTree from "@/components/UserTree.vue";

const users = ref([
  {
    name: "Chủ tịch",
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
                    children: [
                      { name: "User 1", children: [{ name: "0" }] },
                      { name: "User 2", children: [{ name: "0" }] },
                    ],
                  },
                  {
                    name: "Group 1",
                    children: [
                      { name: "User 1", children: [{ name: "0" }] },
                      { name: "User 2", children: [{ name: "0" }] },
                    ],
                  },
                  {
                    name: "Group 2",
                    children: [
                      { name: "User 3", children: [{ name: "0" }] },
                      { name: "User 4", children: [{ name: "0" }] },
                    ],
                  },
                   {
                    name: "Group 3",
                    children: [
                      { name: "User 3", children: [{ name: "0" }] },
                      { name: "User 4", children: [{ name: "0" }] },
                    ],
                  },
                  {
                    name: "Group 4",
                    children: [
                      { name: "User 3", children: [{ name: "0" }] },
                      { name: "User 4", children: [{ name: "0" }] },
                    ],
                  }
                ],
              },
              {
                name: "Phòng Kinh Doanh 2",
                children: [
                  {
                    name: "Group 1",
                    children: [
                      { name: "User 5", children: [{ name: "0" }] },
                      { name: "User 6", children: [{ name: "0" }] },
                    ],
                  },
                  {
                    name: "Group 2",
                    children: [
                      { name: "User 7", children: [{ name: "0" }] },
                      { name: "User 8", children: [{ name: "0" }] },
                    ],
                  },
                ],
              },
              {
                name: "Phòng Kinh Doanh 2",
                children: [
                  {
                    name: "Group 1",
                    children: [
                      { name: "User 5", children: [{ name: "0" }] },
                      { name: "User 6", children: [{ name: "0" }] },
                    ],
                  },
                  {
                    name: "Group 2",
                    children: [
                      { name: "User 7", children: [{ name: "0" }] },
                      { name: "User 8", children: [{ name: "0" }] },
                    ],
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
                    children: [
                      { name: "User 9", children: [{ name: "0" }] },
                      { name: "User 10", children: [{ name: "0" }] },
                    ],
                  },
                  {
                    name: "Group 2",
                    children: [
                      { name: "User 11", children: [{ name: "0" }] },
                      { name: "User 12", children: [{ name: "0" }] },
                    ],
                  },
                ],
              },
              {
                name: "Phòng Kỹ Thuật 2",
                children: [
                  {
                    name: "Group 1",
                    children: [
                      { name: "User 13", children: [{ name: "0" }] },
                      { name: "User 14", children: [{ name: "0" }] },
                    ],
                  },
                  {
                    name: "Group 2",
                    children: [
                      { name: "User 15", children: [{ name: "0" }] },
                      { name: "User 16", children: [{ name: "0" }] },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Ban Vận Hành",
            children: [
              {
                name: "Phòng Vận Hành 1",
                children: [
                  {
                    name: "Group 1",
                    children: [
                      { name: "User 17" },
                      { name: "User 18" }
                    ]
                  },
                  {
                    name: "Group 2",
                    children: [
                      { name: "User 19" },
                      { name: "User 20" }
                    ]
                  }
                ]
              },
              {
                name: "Phòng Vận Hành 2",
                children: [
                  {
                    name: "Group 1",
                    children: [
                      { name: "User 21" },
                      { name: "User 22" }
                    ]
                  },
                  {
                    name: "Group 2",
                    children: [
                      { name: "User 23" },
                      { name: "User 24" }
                    ]
                  }
                ]
              }
            ]
          }
        ],
      },
    ],
  },
]);
</script>
