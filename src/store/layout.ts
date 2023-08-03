import { defineStore } from 'pinia'
import { LayoutState } from './type'

const useLayoutStore = defineStore('layout', {
  state: (): LayoutState => ({
    fold: false,
    refresh: false
  })
})

export default useLayoutStore