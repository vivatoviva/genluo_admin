import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import RendererWrapper0 from 'D:/github/GenluoAdmin/src/pages/.umi/LocaleWrapper.jsx'

let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/user",
    "redirect": "/user/login",
    "exact": true
  },
  {
    "path": "/",
    "redirect": "/article/list",
    "exact": true
  },
  {
    "path": "/user",
    "component": dynamic({ loader: () => import('../../layouts/UserLayout'), loading: require('D:/github/GenluoAdmin/src/components/PageLoading/index').default  }),
    "routes": [
      {
        "path": "/user/login",
        "component": dynamic({ loader: () => import('../User/Login'), loading: require('D:/github/GenluoAdmin/src/components/PageLoading/index').default  }),
        "exact": true
      },
      {
        "path": "/user/register",
        "component": dynamic({ loader: () => import('../User/Register'), loading: require('D:/github/GenluoAdmin/src/components/PageLoading/index').default  }),
        "exact": true
      },
      {
        "path": "/user/register-result",
        "component": dynamic({ loader: () => import('../User/RegisterResult'), loading: require('D:/github/GenluoAdmin/src/components/PageLoading/index').default  }),
        "exact": true
      },
      {
        "component": () => React.createElement(require('D:/github/GenluoAdmin/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "path": "/",
    "component": dynamic({ loader: () => import('../../layouts/BasicLayout'), loading: require('D:/github/GenluoAdmin/src/components/PageLoading/index').default  }),
    "Routes": [require('../Authorized').default],
    "authority": [
      "admin",
      "user"
    ],
    "routes": [
      {
        "name": "article",
        "icon": "profile",
        "path": "/article",
        "authority": [
          "admin"
        ],
        "routes": [
          {
            "path": "/article/list",
            "name": "list",
            "component": dynamic({ loader: () => import('../Article/Articles'), loading: require('D:/github/GenluoAdmin/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/article/operate",
            "name": "operate",
            "component": dynamic({ loader: () => import('../Article/Operate'), loading: require('D:/github/GenluoAdmin/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/article/operate/:id",
            "component": dynamic({ loader: () => import('../Article/Operate'), loading: require('D:/github/GenluoAdmin/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "exact": true
          },
          {
            "component": () => React.createElement(require('D:/github/GenluoAdmin/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "component": dynamic({ loader: () => import('../404'), loading: require('D:/github/GenluoAdmin/src/components/PageLoading/index').default  }),
        "exact": true
      },
      {
        "component": () => React.createElement(require('D:/github/GenluoAdmin/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "component": () => React.createElement(require('D:/github/GenluoAdmin/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
  }
];
window.g_plugins.applyForEach('patchRoutes', { initialValue: routes });

export default function() {
  return (
<RendererWrapper0>
          <Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
        </RendererWrapper0>
  );
}
