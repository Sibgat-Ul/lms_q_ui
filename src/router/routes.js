
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        redirect: 'login'
      }
      ,{ 
        path: 'dashboard', 
        component: () => import('pages/Dashboard.vue'), 
        children: [
          { 
            path: '', 
            component: () => import('pages/IndexPage.vue') 
          } 
        ],
      } 
      ,{ 
        name: 'login',
        path: 'login', 
        component: () => import('pages/LoginPage.vue') 
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
