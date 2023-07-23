const { createRouter, createWebHashHistory } = VueRouter

import homePage from './pages/home-page.js'
import todoApp from './pages/todo-app.js'
import todoEdit from './pages/todo-edit.js'
import userProfile from './pages/user-profile.js'

const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/todo',
        component: todoApp
    },
    {
        path: '/todo/edit/:id?',
        component: todoEdit
    },
    {
        path: '/user',
        component: userProfile
    },
]

export const router = createRouter({
    routes,
    history: createWebHashHistory()
})