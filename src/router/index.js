import Vue from 'vue'
import Router from 'vue-router'
import Dash from '@/components/Dashboard'
import DoIpfsUploader from '@/components/DoIpfsUploader'
import ProductList from '@/components/ProductList'
import ProductTable from '@/components/ProductTable'
import Profile from '@/components/Profile'
import DispensaryList from '@/components/DispensaryList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/addlink',
      name: 'Dash',
      component: Dash
    },
    {
      path: '/upload',
      name: 'DoIpfsUploader',
      component: DoIpfsUploader
    },
    {
      path: '/products',
      name: 'ProductList',
      component: ProductList
    },
    {
      path: '/productstab',
      name: 'ProductTable',
      component: ProductTable
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/dispensary/:id',
      name: 'DispensaryList',
      component: DispensaryList
    },
    {
      path: '/dispensary',
      name: 'Dispensary',
      component: DispensaryList
    }
  ]
})
