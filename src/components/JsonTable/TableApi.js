import qs from "qs"

// 创建元组
export function createRecord(uri, request, data) {
  data = {...data};
  if (!uri) {
    uri = `/api/table/${data.f}/create`;
    delete data.f;
  }
  return request({
    url: uri,
    method: 'post',
    data: qs.stringify(data)
  })
}

// 更新元组
export function updateRecord(uri, request, data) {
  data = {...data};
  if (!uri) {
    uri = `/api/table/${data.f}/update`;
    delete data.f;
  }
  return request({
    url: uri,
    method: 'post',
    data: qs.stringify(data)
  })
}

// 删除元组
export function deleteRecordById(uri, request, f, id) {
  if (!uri) {
    uri = `/api/table/${f}/delete`;
  }
  return request({
    url: uri + '?id=' + id,
    method: 'delete'
  })
}

// 删除元组
export function deleteRecord(uri, request, f, name, value, type) {
  if (!uri) {
    uri = `/api/table/${f}/delete`;
  }
  return request({
    url: uri + '?' + name + '=' + value + '&' + name + 'Type' + '=' + type,
    method: 'delete'
  })
}


// 获得元组
export function getRecordById(uri, request, f, id) {
  if (!uri) {
    uri = `/api/table/${f}/get`;
  }
  return request({
    url: uri + '?id=' + id,
    method: 'get'
  })
}

export function getRecord(uri, request, f, name, value, type) {
  if (!uri) {
    uri = `/api/table/${f}/get`;
  }
  return request({
    url: uri + '?' + name + '=' + value + '&' + name + 'Type' + '=' + type,
    method: 'get'
  })
}

// 获得元组分页
export function pageRecord(uri, request, data) {
  data = {...data};
  if (!uri) {
    uri = `/api/table/${data.f}/page`;
    delete data.f;
  }
  return request({
    url: uri,
    method: 'post',
    data: qs.stringify(data)
  })
}

// 导出Excel
export function exportExcel(uri, request, data) {
  data = {...data};
  if (!uri) {
    uri = `/api/table/${data.f}/export-excel`;
    delete data.f;
  }
  return request({
    url: uri,
    method: 'get',
    params: data,
    responseType: 'blob'
  })
}

// 导出Excel
export function exportTableExcel(uri, request, f) {
  if (!uri) {
    uri = `/api/table/${f}/export-table-excel`;
  }
  return request({
    url: uri,
    method: 'get',
    responseType: 'blob'
  })
}

export function getTableConfig(uri, request, data) {
  //这是一行很有用的代码,用于复制一份data,防止后面对data的值进行操作影响上级
  data = {...data};
  if (!uri) {
    uri = `/api/table/${data.f}/config`;
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
    uri = '/api/table/names';
  }
  return request({
    url: uri,
    method: 'get',
  })
}

// 导出 所有Table
export function exportAllTableExcel(uri, request) {
  if (!uri) {
    uri = `/api/table/export-all-table-excel`;
  }
  return request({
    url: uri,
    method: 'get',
    responseType: 'blob'
  })
}
