import CloudNavigation from "@/pages/cloud/CloudNavigation";
import { Outlet } from "react-router-dom";

function ClusterLayout() {
    return (
        <div className="clusterlayout m-5 p-2">
            <Outlet />
        </div>
    )


}

export default ClusterLayout;