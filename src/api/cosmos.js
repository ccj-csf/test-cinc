import { PARAM_REPLACEMENT } from "@/constants";
import CommonApi from "./common";
import _ from 'lodash-es';

const API_URL_SUFFIX = {
  //创建集群
  CLUSTER_CREATE: "/cosmos/clusters/create",

  //创建Ray集群选项
  CLUSTER_CREATE_RAY: "/cosmos/clusters/create-cluster-data",

  //创建K8S集群选项
  CLUSTER_CREATE_K8S: "/cosmos/clusters/create-k8s-cluster-data",

  //硬件数量和价格
  CLUSTER_HARDWARE_QTY_PRICE: "/cosmos/cluster/hardware-qty-price",

  //集群详情
  CLUSTER_DETAIL: "/cosmos/clusters/{cluster_id}/details",

  //集群节点列表
  CLUSTER_NODES: "/cosmos/clusters/{cluster_id}/nodes",

  //用户集群列表
  CLUSTER_USER_RESOURCES: "/cosmos/users/{user_id}/resources",
};

class CosmosApi extends CommonApi {
  /**
   * 创建集群
   * @param {Object} cluster
   */
  createCluster(cluster) {
    return this.post({
      url: `${API_URL_SUFFIX.CLUSTER_CREATE}`,
      params: cluster,
      errorMessageMode: "none",
    });
  }

  /**
   * 获取创建Ray集群所需选项
   * @param {string} hardwareId 硬件型号ID
   * @param {Array<String>} locations 设备地理位置ID列表，例如[1,2]
   * @param {string} brandLevelId 带宽级别ID
   * @returns Object
   */
  createClusterRay(hardwareId = "", locations = [], bandLevelId = "") {
    let query = "";
    if (!_.isEmpty(hardwareId)) {
      query += `hardware_id=${hardwareId}`;
    }
    if (!_.isEmpty(locations)) {
      query += `location_ids=${locations}`;
    }
    if (!_.isEmpty(bandLevelId)) {
      query += `band_width_level_id=${bandLevelId}`;
    }
    return this.get({
      url: `${API_URL_SUFFIX.CLUSTER_CREATE_RAY}`,
      params: query,
      errorMessageMode: "none",
    });
  }

  /**
   * 获取创建k8s集群所需选项
   * @param {string} hardwareId 硬件型号ID
   * @returns Object
   */
  createClusterK8s(hardwareId) {
    return this.post({
      url: `${API_URL_SUFFIX.CLUSTER_CREATE_K8S}`,
      params: `hardware_id=${hardwareId}`,
      errorMessageMode: "none",
    });
  }

  /**
   * 硬件数量及价格
   * @param {string} hardwareId
   * @param {[1,2]} locations ids
   */
  loadHardwareQtyPrice(hardwareId, locations) {
    return this.get({
      url: `${API_URL_SUFFIX.CLUSTER_HARDWARE_QTY_PRICE}`,
    });
  }
  /**
   * 集群详情
   * @param {string} clusterId
   */
  loadClusterDetail(clusterId) {
    return this.get({
      url: `${API_URL_SUFFIX.CLUSTER_DETAIL}`.replace(
        PARAM_REPLACEMENT.CLUSTER_ID,
        clusterId
      ),
    });
  }
  /**
   * 集群nodes列表
   * @param {string} clusterId
   */
  loadClusterNodes(clusterId) {
    return this.get({
      url: `${API_URL_SUFFIX.CLUSTER_NODES}`.replace(
        PARAM_REPLACEMENT.CLUSTER_ID,
        clusterId
      ),
    });
  }
  /**
   * 用户集群列表
   * @param {string} userId
   */
  loadUserCluster(userId, resourceType = "", pager = { page: 1, page_size: 10 }) {
    let _url = `${API_URL_SUFFIX.CLUSTER_USER_RESOURCES}`.replace(PARAM_REPLACEMENT.USER_ID, userId);
    _url += `?user_id=${userId}`;
    if (!_.isEmpty(resourceType)) {
      _url += `&resource_type=${resourceType}`;
    }
    if (!_.isEmpty(pager)) {
      _url += `&page=${pager.page}&page_size=${pager.page_size}`;
    }
    return this.get({
      url: _url,
    });
  }
}

const CosmosApiInstance = new CosmosApi();
export default CosmosApiInstance;
