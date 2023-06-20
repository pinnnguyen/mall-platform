import Vue from 'vue'

register(require.context('@/components/global', true, /.vue/))
register(require.context('@/custom-schema-template', true, /.vue/))
registerComponentsSchema()

function register(context) {
  context.keys().forEach(cnt => {
    const component = context(cnt)
    let ctrl = component.default || component
    let a = ctrl.name
    let b = ctrl

    Vue.component(a, b)
  })
}

function registerComponentsSchema() {
  const files = require.context('../widgets', true, /component.json$/)
  let fields = {}
  let initializing = {}

  files.keys().forEach(key => {
    const [, name] = key.split('/')
    let config = { component: name, ...files(key) }

    fields[name] = config.fields
    initializing[name] = initDefaulValue(config)
  })

  Vue.prototype.$fields = fields
  Vue.prototype.$initializing = initializing
}

function initDefaulValue(config) {
  let { component, name, icon, fields } = config
  let temp = { component, name, icon }
  setDefaultValue(fields, temp)
  return temp
}

function setDefaultValue(fields, initializing) {
  for (let key in fields) {
    let { type, value, child } = fields[key]
    if (type == 'object') {
      initializing[key] = {}
      child && setDefaultValue(fields[key].child, initializing[key])
    } else {
      initializing[key] = value
    }
  }
  return initializing
}
