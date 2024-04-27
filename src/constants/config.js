/**
 * 导出默认的每页记录数常量
 * 该常量定义了系统中默认的分页大小，用于没有指定分页大小的情况。
 *
 * @constant {number} DEFAULT_PAGE_SIZE - 默认每页记录数为20。
 */
export const DEFAULT_PAGE_SIZE = 20;
export const CLUSTER_CATEGORY = { RAY: "RAY", K8S: "K8S" };
export const PARAM_REPLACEMENT = {
  CLUSTER_ID: "{cluster_id}",
  NODE_ID: "{node_id}",
  USER_ID: "{user_id}",
};
export const CREATE_CLUSTER_STEPS = [
  { id: 'baseImage_name', name: '' },
  { id: 'type', type: '', nvLinke: false },
  { id: 'sustainableGPU_supplier', sustainableGPU: false },
  // { id: 'supplier', supplier: '' },
  { id: 'processor', processor: '' },
  { id: 'location', location: '' },
  { id: 'security', security: '' },
  { id: 'connectivity', connectivity: '' },
  // { id: 'baseImage', baseImage: '' },
  { id: 'summary', summary: {} }
];