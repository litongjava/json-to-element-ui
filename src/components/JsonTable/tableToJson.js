// 创建元组
export function createRecord(uri, request, data) {
  if (!uri) {
    uri = `/table/json/${data.f}/create`;
    delete data.f;
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
    uri = `/table/json/${data.f}/update`;
    delete data.f;
  }
  return request({
    url: uri,
    method: 'put',
    data: data
  })
}

// 删除元组
export function deleteRecord(uri, request, f, id) {
  if (!uri) {
    uri = `/table/json/${f}/delete`;
  }
  return request({
    url: uri +'?id=' + id,
    method: 'delete'
  })
}

// 获得元组
export function getRecord(uri, request, f, id) {
  if (!uri) {
    uri = `/table/json/${f}/get`;
  }
  return request({
    url: uri + '?id=' + id,
    method: 'get'
  })
}

// 获得元组分页
export function pageRecord(uri, request, data) {
  if (!uri) {
    uri = `/table/json/${data.f}/page`;
    delete data.f;
  }
  return request({
    url: uri,
    method: 'post',
    data: data
  })
}

// 导出Excel
export function exportExcel(uri, request, query) {
  if (!uri) {
    uri = `/table/json/${data.f}/export-excel`;
    delete data.f;
  }
  return request({
    url: uri,
    method: 'get',
    params: query,
    responseType: 'blob'
  })
}

// 导出Excel
export function exportTableExcel(uri, request, f) {
  if (!uri) {
    uri = `/table/json/${f}/export-table-excel`;
  }
  return request({
    url: uri,
    method: 'get',
    responseType: 'blob'
  })
}

export function getTableConfig(uri, request, data) {
  if (!uri) {
    uri = `/table/json/${data.f}/f-config`;
    delete data.f;
  }
  return request({
    url: uri,
    method: 'get',
    params: data,
  })
}

export function getFNames(uri, request) {
  if (!uri) {
    uri = '/table/json/f-names';
  }
  return request({
    url: uri,
    method: 'get',
  })
}

// 导出 所有Table
export function exportAllTableExcel(uri, request) {
  if (!uri) {
    uri = `/table/json/export-all-table-excel`;
  }
  return request({
    url: uri,
    method: 'get',
    responseType: 'blob'
  })
}
