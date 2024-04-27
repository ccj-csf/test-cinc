import { PARAM_REPLACEMENT } from "@/constants";
import CommonApi from "./common";

const API_URL_SUFFIX = {
  //集群Worker列表
  CLUSTER_STATUS: "/voyager/clusters/status",

  //集群详情
  CLUSTER_DETAIL: "/voyager/clusters/{cluster_id}/details",

  //集群节点列表
  CLUSTER_NODES: "/voyager/clusters/{cluster_id}/nodes",

  //网络支持的设备品牌
  NETWORK_BRANDS: "/voyager/network/brands",

  //网络集群总览
  NETWORK_CLUSTER: "/voyager/network/info/clusters",

  //网络Inference总览
  NETWORK_INFERENCES: "/voyager/network/info/inferences",

  //网络节点总览
  NETWORK_NODES: "/voyager/network/info/nodes",

  //网络硬件价格总览
  NETWORK_MARKET_SNAPSHOT: "/voyager/network/market-snapshot",

  //网络设备数量统计
  NETWORK_INFO: "/voyager/network/info",

  //网络节点列表
  NODE_STATUS: "/voyager/nodes/status",

  //节点服务信息
  NODE_CONNECTED_SERVICES: "/voyager/nodes/{node_id}/connected-services",

  //节点详情
  NODE_DETAILS: "/voyager/nodes/{node_id}/details",

  //节点概览
  NODE_SUMMARY: "/voyager/nodes/{node_id}/summary",
};

class VoyagerApi extends CommonApi {
  /**
   * 集群Worker列表
   * @param {*} params 分页{page: 1, page_size: 10}
   * @returns
   */
  loadClustersStatus(params) {
    return this.get({
      url: `${API_URL_SUFFIX.CLUSTER_STATUS}`,
      params,
    });
  }

  /**
   * 用户集群列表
   */
  loadUserCluster(userId) {}

  /**
   * 集群详情
   * @param {*} clusterId
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
   * 集群节点列表
   * @param {*} clusterId
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
   * 网络支持的设备品牌
   */
  loadNetworkBrands() {
    return this.get({
      url: `${API_URL_SUFFIX.NETWORK_BRANDS}`,
    });
  }

  /**
   * 网络Inference总览
   */
  loadNetworkInferences() {
    return this.get({
      url: `${API_URL_SUFFIX.NETWORK_INFERENCES}`,
    });
  }

  /**
   * 网络集群总览
   */
  loadNetworkClusters() {
    return this.get({
      url: `${API_URL_SUFFIX.NETWORK_CLUSTER}`,
    });
  }

  /**
   * 网络节点总览
   */
  loadNetworkNodes() {
    return this.get({
      url: `${API_URL_SUFFIX.NETWORK_NODES}`,
    });
  }

  /**
   * 网络设备数量统计
   */
  loadNetworkInfo() {
    return this.get({
      url: `${API_URL_SUFFIX.NETWORK_INFO}`,
    });
  }

  /**
   * 网络硬件价格总览
   * @param {*} params: {hardware_type:"type_value", brand_name: "brand_value"}
   * @returns
   */
  loadNetworkMarketSnapshot(params) {
    return this.get({
      url: `${API_URL_SUFFIX.NETWORK_MARKET_SNAPSHOT}`,
      params,
    });
  }

  /**
   * 网络节点列表
   * @param {Object} params: 分页{page: 1, page_size: 10}
   */
  loadNodesStatus(params) {
    return this.get({
      url: `${API_URL_SUFFIX.NODE_STATUS}`,
      params,
    });
  }

  /**
   * 节点服务信息
   * @param {string} nodeId
   */
  loadNodeConnectedService(nodeId) {
    return this.get({
      url: `${API_URL_SUFFIX.NODE_STATUS}`.replace(
        PARAM_REPLACEMENT.NODE_ID,
        nodeId
      ),
    });
  }

  /**
   * 节点详情
   * @param {string} nodeId
   */
  loadNodeDetail(nodeId) {
    return this.get({
      url: `${API_URL_SUFFIX.NODE_DETAILS}`.replace(
        PARAM_REPLACEMENT.NODE_ID,
        nodeId
      ),
    });
  }

  /**
   * 节点概览
   * @param {string} nodeId
   */
  loadNodeSummary(nodeId) {
    return this.get({
      url: `${API_URL_SUFFIX.NODE_SUMMARY}`.replace(
        PARAM_REPLACEMENT.NODE_ID,
        nodeId
      ),
    });
  }
}

const VoyagerApiInstance = new VoyagerApi();
export default VoyagerApiInstance;
