// 创建元组
export function createRecord(request, data) {
  return request({
    url: '/table/json/create',
    method: 'post',
    data: data
  })
}

// 更新元组
export function updateRecord(request, data) {
  return request({
    url: '/table/json/update',
    method: 'put',
    data: data
  })
}

// 删除元组
export function deleteRecord(request, tableName, id) {
  return request({
    url: '/table/json/delete?tableName=' + tableName + '&id=' + id,
    method: 'delete'
  })
}

// 获得元组
export function getRecord(request, tableName, id) {
  return request({
    url: '/table/json/get?tableName=' + tableName + '&id=' + id,
    method: 'get'
  })
}

// 获得元组分页
export function pageRecord(request, query) {
  return request({
    url: '/table/json/page',
    method: 'post',
    data: query
  })
}

// 导出Excel
export function exportExcel(request, query) {
  return request({
    url: '/table/json/export-excel',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}

// 导出Excel
export function exportTableExcel(request, tableName) {
  return request({
    url: '/table/json/export-table-excel?tableName=' + tableName,
    method: 'get',
    responseType: 'blob'
  })
}

// 导出 Excel
export function exportAllTableExcel(request) {
  return request({
    url: '/table/json/export-all-table-excel',
    method: 'get',
    responseType: 'blob'
  })
}

export function exportAlarmAiExcel(query) {
  return request({
    url: '/cf/alarm-ai/export-excel',
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}

export function getTableNames(request) {
  return request({
    url: '/table/json/table-names',
    method: 'get',
  })
}

export function getTableConfig(request, query) {
  return request({
    url: '/table/json/table-config',
    method: 'post',
    data: query,
  })
}