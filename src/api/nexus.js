import { PARAM_REPLACEMENT } from "@/constants";
import CommonApi from "./common";

const API_URL_SUFFIX = {
  //创建节点
  NODE_CREATE: "/nexus/nodes",

  //删除节点
  NODE_DELETE: "/nexus/nodes/{node_id}",

  //节点服务信息
  NODE_CONNECTED_SERVICES: "/nexus/nodes/{node_id}/connected-services",

  //节点详情
  NODE_DETAIL: "/nexus/nodes/{node_id}/details",

  //节点Jobs信息
  NODE_JOBS: "/nexus/nodes/{node_id}/jobs",

  //节点notifications信息
  NODE_NOTIFICATIONS: "/nexus/nodes/{node_id}/notifications",

  //节点重命名
  NODE_RENAME: "/nexus/nodes/{node_id}/rename",

  //节点关闭
  NODE_TERMINATE: "/nexus/nodes/{node_id}/terminate",

  //用户设备列表
  NODE_USER: "/nexus/users/{user_id}/nodes",
};

class NexusApi extends CommonApi {
  /**
   * 创建节点
   * @param {Object} node
   */
  nodeCreate(node) {
    return this.post({
      url: `${API_URL_SUFFIX.NODE_CREATE}`,
      params: node,
      errorMessageMode: "none",
    });
  }

  /**
   * 删除节点
   * @param {string} nodeId
   */
  nodeDelete(nodeId) {
    return this.delete({
      url: `${API_URL_SUFFIX.NODE_DELETE}`.replace(
        PARAM_REPLACEMENT.NODE_ID,
        nodeId
      ),
      errorMessageMode: "none",
    });
  }

  nodeRename(nodeId, nodeName) {
    return this.put({
      url: `${API_URL_SUFFIX.NODE_RENAME}`.replace(
        PARAM_REPLACEMENT.NODE_ID,
        nodeId
      ),
      params: {
        name: nodeName,
      },
      errorMessageMode: "none",
    });
  }

  nodeTerminate(nodeId) {
    return this.put({
      url: `${API_URL_SUFFIX.NODE_TERMINATE}`.replace(
        PARAM_REPLACEMENT.NODE_ID,
        nodeId
      ),
      errorMessageMode: "none",
    });
  }

  /**
   * 节点服务信息
   * @param {string} nodeId
   */
  loadNodeServices(nodeId) {
    return this.get({
      url: `${API_URL_SUFFIX.NODE_CONNECTED_SERVICES}`.replace(
        PARAM_REPLACEMENT.NODE_ID,
        nodeId
      ),
    });
  }

  /**
   * 节点详情
   * @param {string} nodeId
   */
  loadNodeDetails(nodeId) {
    return this.get({
      url: `${API_URL_SUFFIX.NODE_DETAIL}`.replace(
        PARAM_REPLACEMENT.NODE_ID,
        nodeId
      ),
    });
  }

  /**
   * 设备运行过的集群列表
   * @param {string} nodeId
   */
  loadNodeJobs(nodeId) {
    return this.get({
      url: `${API_URL_SUFFIX.NODE_JOBS}`.replace(
        PARAM_REPLACEMENT.NODE_ID,
        nodeId
      ),
    });
  }

  /**
   * Worker 服务信息
   * @param {*} nodeId
   */
  loadNodeNotifications(nodeId) {
    return this.get({
      url: `${API_URL_SUFFIX.NODE_NOTIFICATIONS}`.replace(
        PARAM_REPLACEMENT.NODE_ID,
        nodeId
      ),
    });
  }

  /**
   * 用户设备列表
   * @param {string} userId
   */
  loadUserNodes(userId) {
    return this.get({
      url: `${API_URL_SUFFIX.NODE_USER}`.replace(
        PARAM_REPLACEMENT.USER_ID,
        userId
      ),
    });
  }
}

const NexusApiInstance = new NexusApi();
export default NexusApiInstance;
