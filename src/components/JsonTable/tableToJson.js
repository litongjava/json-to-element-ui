// 创建元组
export function createRecord(uri, request, data) {
  if (!uri) {
    uri = '/table/json/create';
  }
  return request({
    url: uri,
    method: 'post',
    data: data
  })
}

// 更新元组
export function updateRecord(uri, request, data) {
  if (!uri) {
    uri = '/table/json/update'
  }
  return request({
    url: uri,
    method: 'put',
    data: data
  })
}

// 删除元组
export function deleteRecord(uri, request, tableName, id) {
  if (!uri) {
    uri = '/table/json/delete'
  }
  return request({
    url: uri + '?tableName=' + tableName + '&id=' + id,
    method: 'delete'
  })
}

// 获得元组
export function getRecord(uri, request, tableName, id) {
  if (!uri) {
    uri = '/table/json/get'
  }
  return request({
    url: uri + '?tableName=' + tableName + '&id=' + id,
    method: 'get'
  })
}

// 获得元组分页
export function pageRecord(uri, request, query) {
  if (!uri) {
    uri = '/table/json/page'
  }
  return request({
    url: uri,
    method: 'post',
    data: query
  })
}

// 导出Excel
export function exportExcel(uri, request, query) {
  if (!uri) {
    uri = '/table/json/export-excel'
  }
  return request({
    url: uri,
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}

// 导出Excel
export function exportTableExcel(uri, request, tableName) {
  if (!uri) {
    uri = '/table/json/export-table-excel'
  }
  return request({
    url: uri + '?tableName=' + tableName,
    method: 'get',
    responseType: 'blob'
  })
}

// 导出 Excel
export function exportAllTableExcel(uri, request) {
  if (!uri) {
    uri = '/table/json/export-all-table-excel'
  }
  return request({
    url: uri,
    method: 'get',
    responseType: 'blob'
  })
}

export function exportAlarmAiExcel(uri, query) {
  if (!uri) {
    uri = '/cf/alarm-ai/export-excel'
  }
  return request({
    url: uri,
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}

export function getTableNames(uri, request) {
  if (!uri) {
    uri = '/table/json/table-names'
  }
  return request({
    url: uri,
    method: 'get',
  })
}

export function getTableConfig(uri, request, query) {
  if (!uri) {
    uri = '/table/json/table-config'
  }
  return request({
    url: uri,
    method: 'post',
    data: query,
  })
}