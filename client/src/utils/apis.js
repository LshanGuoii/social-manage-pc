import { post } from './http'
// 添加规则
export let getRulesAdd = (params) => post('/api/rules/add', params)
// 添加规则
export let getRulesModify = (params) => post('/api/rules/modify', params)
// 获取微信群信息
export let getGroupChat = (params) => post('/api/groupChat/find', params)
// 查询规则
export let getRulesFind = (params) => post('/api/rules/find', params)
// 删除规则
export let getRulesDelete = (params) => post('/api/rules/delete', params)
// 获得用户userid
export let getUserId = (params) => post('/api/login/auth', params)

export let getLogin = (params) => post('/api/users/login', params)
