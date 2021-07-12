export default [
  {
    path: "/",
    component: "../layouts/BlankLayout",
    routes: [
      {
        path: "/user",
        component: "../layouts/UserLayout",
        routes: [
          {
            name: "login",
            path: "/user/login",
            component: "./User/login",
          },
        ],
      },
      {
        path: "/",
        component: "../layouts/SecurityLayout",
        routes: [
          {
            path: "/",
            component: "../layouts/BasicLayout",
            authority: ["admin", "user"],
            routes: [
              {
                path: "/",
                redirect: "/ip-extract",
              },
              {
                path: "/welcome",
                name: "welcome",
                icon: "smile",
                component: "./Welcome",
              },
              {
                path: "/admin",
                name: "admin",
                icon: "crown",
                component: "./Admin",
                authority: ["admin"],
                routes: [
                  {
                    path: "/admin/sub-page",
                    name: "sub-page",
                    icon: "smile",
                    component: "./Welcome",
                    authority: ["admin"],
                  },
                ],
              },
              // {
              //   name: 'list.table-list',
              //   icon: 'table',
              //   path: '/list',
              //   component: './TableList',
              // },
              {
                name: "set.set-difference",
                icon: "table",
                path: "/set-difference",
                component: "./SetDifference",
              },
              {
                name: "tool.ip-extract",
                icon: "table",
                path: "/ip-extract",
                component: "./IpExtract",
              },
              {
                name: "tool.line-unique",
                icon: "table",
                path: "/line-unique",
                component: "./LineUnique",
              },
              {
                name: "tool.no-moitor-ip",
                icon: "table",
                path: "/no-moitor-ip",
                component: "./NoMonitorIp",
              },
              {
                name: "tool.refresh",
                icon: "table",
                path: "/refresh",
                component: "./Refresh",
              },
              {
                component: "./404",
              },
            ],
          },
          {
            component: "./404",
          },
        ],
      },
    ],
  },
  {
    component: "./404",
  },
];
