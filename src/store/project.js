import { fixedPages } from '@/config/project'
import { getProject, settingProject, removeProject } from '@/utils/auth'

export default {
    state: {
        project: getProject(),
        fixedPages,             // Thu thập trang tĩnh
        curPage: null,          // Trang hiện tại
        curComponent: null,     // Vật liệu hiện tại
        dragComponent: null,    // Kéo vật liệu
        dragStatus: false,      // Kéo vào trạng thái trang
    },
    getters: {
        project: state => state.project,
        fixedPages: state => state.fixedPages,
        curPage: state => state.curPage || state.project?.pages?.find(page => page.home) || null,
        curComponent: state => state.curComponent,
        dragComponent: state => state.dragComponent,
        dragStatus: state => state.dragStatus,
    },
    mutations: {
        setProject(state, project) {
            state.project = project
            settingProject(state.project)
            state.curPage = state.project.pages.find(page => page.home)
        },

        dropProject(state) {
            state.project = {}
            state.curPage = {}
            state.curComponent = null
            state.dragComponent = null
            state.dragStatus = false
            removeProject()
        },

        setHomePage(state, page) {
            state.curPage = state.project.pages.find(page => page.home)
        },

        setCurPage(state, page) {
            console.log('Đặt trang hiện tại');
            console.log(JSON.stringify(page));
            state.curPage = page
        },

        setcurComponent(state, component) {
            state.curComponent = component
        },

        setDragComponent(state, component) {
            state.dragComponent = component
        },

        addComponentList(state, component) {
            state.curPage.componentList.push(component)
        },

        delComponent(state, id) {
            let index = state.curPage.componentList.reduce((pre, cur, i) => {
                if (cur.id == id)
                    pre = i

                return pre
            }, -1)

            state.curPage.componentList.splice(index, 1)
            state.curComponent = null
        },

        setDragStatus(state, status) {
            state.dragStatus = status
        },
    },
}
