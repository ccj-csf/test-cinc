/**
 * 导入Navigate组件和其他必要路由信息
 */
import { Navigate, useRoutes } from "react-router-dom";
import WrapperRouteComponent from "./WrapperRouteComponent";
import {
  HOME_ROUTE,
  ABOUT_ROUTE,
  CONTACT_ROUTE,
  FAQ_ROUTE,
  LOGIN_ROUTE,
  LOGIN_EMAIL_ROUTE,
  DASHBOARD_ROUTE,
  CLOUD,
  CLUSTER_ROUTE,
  WORKER,
  WORKER_ID,
  WORKER_CREATE,
  EXPLORER,
  CLOUD_CLUSTER,
} from "@/constants";
import HomeLayout from "@/layouts/HomeLayout";
import Home from "@/pages/home";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Faq from "@/pages/faq";
import Login from "@/pages/login";
import LoginEmail from "@/pages/login/LoginEmail";

import DashboardLayout from "@/layouts/default";
import CloudLayout from "@/layouts/cloud";
import WorkerLayout from "@/layouts/worker";
import ExplorerLayout from "@/layouts/explorer";

import WorkerList from "@/pages/worker/list/WorkerList";
import WorkerCreate from "@/pages/worker/WorkerCreate";
import WorkerDetail from "@/pages/worker/detail/WorkerDetail";
import ClusterLayout from "@/layouts/cloud/ClusterLayout";
import Clusters from "@/pages/cloud/UserClusters";
import ClusterInformation from "@/pages/cloud/ClusterInformation";
import HomeExplorer from "@/pages/explorer/home/HomeExplorer";
import ClusterExplorer from "@/pages/explorer/clusters/ClusterExplorer";
import WorkerExplorer from "@/pages/explorer/workers/WorkerExplorer";
import InferenceExplorer from "@/pages/explorer/inferences/InferenceExplorer";
import NetworkMapExplorer from "@/pages/explorer/map/NetworkMapExplorer";
import { element } from "prop-types";
import Dashboard from "@/pages/cloud/Dashboard";
import { Outlet } from "react-router-dom";
import DefaultLayout from "@/layouts/default";
import UserClusters from "@/pages/cloud/UserClusters";

/**
 * 应用的路由配置
 */
const routes = [
  {
    path: "",
    element: <HomeLayout />,
    children: [
      {
        path: HOME_ROUTE,
        element: (
          <WrapperRouteComponent auth={false} title="home">
            <Home />
          </WrapperRouteComponent>
        ),
      },
      {
        path: ABOUT_ROUTE,
        element: (
          <WrapperRouteComponent auth={false} title="about-us">
            <About />
          </WrapperRouteComponent>
        ),
      },
      {
        path: CONTACT_ROUTE,
        element: (
          <WrapperRouteComponent auth={false} title="contact-us">
            <Contact />
          </WrapperRouteComponent>
        ),
      },
      {
        path: FAQ_ROUTE,
        element: (
          <WrapperRouteComponent auth={false} title="faqs">
            <Faq />
          </WrapperRouteComponent>
        ),
      },
    ],
  },
  {
    path: "/cvn",
    element: <DefaultLayout />,
    children: [
      {
        path: "cluster",
        element: <CloudLayout />,
        children: [
          {
            index: true,
            path: "",
            element: (
              <WrapperRouteComponent auth={true} title="cluster">
                <Dashboard />
              </WrapperRouteComponent>
            ),
          },
          {
            path: "clusters", // 指定集群ID的路径
            element: (
              <WrapperRouteComponent auth={true} title="cluster-detail">
                <UserClusters />
              </WrapperRouteComponent>
            ), // 集群详情组件
          },
          {
            path: `:clusterId`, // 指定集群ID的路径
            id: "cluster-detail", // 路由ID
            element: (
              <WrapperRouteComponent auth={true} title="cluster-detail">
                <ClusterInformation />
              </WrapperRouteComponent>
            ), // 集群详情组件
          },
        ],
      },

      {
        path: EXPLORER,
        element: <ExplorerLayout />,
        children: [
          {
            path: "",
            element: (
              <WrapperRouteComponent auth={true} title="worker">
                <HomeExplorer />
              </WrapperRouteComponent>
            ),
          },
          {
            path: "networkMap",
            element: (
              <WrapperRouteComponent auth={true} title="worker">
                <NetworkMapExplorer />
              </WrapperRouteComponent>
            ),
          },
          {
            path: "clusters",
            element: (
              <WrapperRouteComponent auth={true} title="worker">
                <ClusterExplorer />
              </WrapperRouteComponent>
            ),
          },
          {
            path: "workers",
            element: (
              <WrapperRouteComponent auth={true} title="worker">
                <WorkerExplorer />
              </WrapperRouteComponent>
            ),
          },
          {
            path: "inferences",
            element: (
              <WrapperRouteComponent auth={true} title="worker">
                <InferenceExplorer />
              </WrapperRouteComponent>
            ),
          },
        ],
      },
      {
        path: WORKER,
        element: <WorkerLayout />,
        children: [
          {
            path: "",
            element: (
              <WrapperRouteComponent auth={true} title="worker">
                <WorkerList />
              </WrapperRouteComponent>
            ),
          },
          {
            path: WORKER_ID,
            element: (
              <WrapperRouteComponent auth={true} title="worker">
                <WorkerDetail />
              </WrapperRouteComponent>
            ),
          },
          {
            path: WORKER_CREATE,
            element: (
              <WrapperRouteComponent auth={true} title="worker">
                <WorkerCreate />
              </WrapperRouteComponent>
            ),
          },
        ],
      },
    ],
  },

  {
    path: LOGIN_ROUTE, // 登录路由
    element: <Login />, // 登录组件
  },
  {
    path: LOGIN_EMAIL_ROUTE,
    element: <LoginEmail />,
  },
  {
    path: "*",
    element: <Navigate to={HOME_ROUTE} />,
  },
];

export const RenderRouter = () => {
  const element = useRoutes(routes);
  return element;
};
