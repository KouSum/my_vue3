import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vitePluginImp from 'vite-plugin-imp'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vitePluginImp({
            libList: [
                {
                    libName: 'vant',
                    style(name) {
                        if (/CompWithoutStyleFile/i.test(name)) {
                            // This will not import any style file
                            return false
                        }
                        return `vant/es/${name}/index.css`
                    }
                },
                {
                    libName: 'ant-design-vue',
                    style(name) {
                        if (/popconfirm/.test(name)) {
                            // support multiple style file path to import
                            return [
                                'ant-design-vue/es/button/style/index.css',
                                'ant-design-vue/es/popover/style/index.css'
                            ]
                        }
                        if(name === "row"){
                            return `ant-design-vue/es/grid/style/index.css`
                        }
                        if(name === "col"){
                            return null
                        }
                        return `ant-design-vue/es/${name}/style/index.css`
                    }
                },
                {
                    libName: 'element-plus',
                    style: (name) => {
                        return `element-plus/lib/theme-chalk/${name}.css`
                    }
                }
            ]
        })
    ]
})
