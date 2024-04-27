import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  LOGIN_ROUTE,
  HOME_ROUTE,
  CLUSTER_ROUTE,
  ABOUT_ROUTE,
  CONTACT_ROUTE,
  FAQ_ROUTE,
  CLOUD_ROUTE,
  WORKER_ROUTE,
  WORKER_CREATE_ROUTE,
  EXPLORER_ROUTE,
} from "@/constants";
import { HelperUtils } from "@/utils";
/**
 * 提供了通用导航功能以及特定页面的导航功能的Hook。
 * @returns 返回一个对象，包含两个方法：navigateWithParams用于通用路径导航，goToExploreCharacterDetail用于特定角色详情页的导航。
 */
export const useNavigateWithParams = () => {
  const navigate = useNavigate();

  /**
   * 使用参数导航到指定路径
   * @param path - 要导航到的路径，支持传入字符串。
   * @param options - 可选的查询参数和状态
   * @returns 无返回值。
   */
  const navigateWithParams = useCallback(
    (path, options = {}) => {
      // 构建查询字符串
      const queryString = options.query
        ? Object.keys(options.query)
            .map(
              (key) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(options.query[key])}`
            )
            .join("&")
        : "";
      // 拼接完整路径
      const fullPath = queryString ? `${path}?${queryString}` : path;
      console.log("fullPath: ", fullPath);

      // 执行导航
      navigate(fullPath, { ...options, state: options.state });
    },
    [navigate] // 依赖项，仅当navigate变化时重新计算
  );

  /**
   * 用于导航到登录页面的函数。
   * @param code - 邀请码
   * @returns 无返回值。
   */
  const goToLogin = useCallback(
    (code) => {
      navigateWithParams(`${LOGIN_ROUTE}`, {
        query: { code },
      });
    },
    [navigateWithParams]
  );

  /**
   * 用于导航到首页页面的函数。
   * @returns 无返回值。
   */
  const goToHome = useCallback(() => {
    navigateWithParams(HOME_ROUTE);
  }, [navigateWithParams]);

  const goAbout = useCallback(() => {
    navigateWithParams(ABOUT_ROUTE);
    HelperUtils.scrollToTop();
  }, [navigateWithParams]);

  const goContact = useCallback(() => {
    navigateWithParams(CONTACT_ROUTE);
    HelperUtils.scrollToTop();
  }, [navigateWithParams]);

  const goFaq = useCallback(() => {
    navigateWithParams(FAQ_ROUTE);
    HelperUtils.scrollToTop();
  }, [navigateWithParams]);

  //for cluster
  const goToCloud = useCallback(() => {
    navigateWithParams(CLOUD_ROUTE);
  }, [navigateWithParams]);

  const goToUserDashboard = useCallback(() => {
    navigateWithParams("/cvn/cluster");
  }, [navigateWithParams]);

  const goClusters = useCallback(() => {
    navigateWithParams("/cvn/cluster/clusters");
  }, [navigateWithParams]);

  const goClusterInfo = useCallback(
    (cluster_id, paramObj) => {
      if (cluster_id) {
        navigateWithParams(`/cvn/cluster/${cluster_id}`, { state: paramObj });
      }
    },
    [navigateWithParams]
  );

  //for worker
  const goToWorker = useCallback(() => {
    navigateWithParams(WORKER_ROUTE);
  }, [navigateWithParams]);

  const goToWorkerCreate = useCallback(() => {
    navigateWithParams(WORKER_CREATE_ROUTE);
  }, [navigateWithParams]);

  const goToWorkerDetail = useCallback(
    (node_id) => {
      navigateWithParams(WORKER_ROUTE + "/" + node_id);
    },
    [navigateWithParams]
  );

  //for explore
  const goToExplorer = useCallback(() => {
    navigateWithParams(EXPLORER_ROUTE);
  }, [navigateWithParams]);

  return {
    navigateWithParams,
    goToLogin,
    goToHome,
    goAbout,
    goContact,
    goFaq,
    goToCloud,
    goToUserDashboard,
    goClusters,
    goClusterInfo,
    goToWorker,
    goToWorkerCreate,
    goToWorkerDetail,
    goToExplorer,
  };
};
