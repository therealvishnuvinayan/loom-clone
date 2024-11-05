import { onAuthenticateUser } from "@/actions/user";
import { verifyAccessToWorkspace } from "@/actions/workspace";
import { redirect } from "next/navigation";
import React from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import {
  getWorkspaceFolders,
  getAllUserVideos,
  getWorkspaces,
  getNotifications,
} from "@/actions/workspace";
import Sidebar from "@/components/global/sidebar";

type Props = {
  params: { workspaceId: string };
  children: React.ReactNode;
};

const Layout = async ({ params: { workspaceId }, children }: Props) => {
  const auth = await onAuthenticateUser();
  if (!auth.user?.workspace || !auth.user?.workspace.length) {
    return redirect("/auth/sign-in");
  }
  const hasAccess = await verifyAccessToWorkspace(workspaceId);
  if (hasAccess.status !== 200) {
    redirect(`/dashboard/${auth.user?.workspace[0]?.id}`);
  }
  if (!hasAccess.data?.workspace) {
    return null;
  }
  const query = new QueryClient();

  await query.prefetchQuery({
    queryKey: ["workspace-folders"],
    queryFn: () => getWorkspaceFolders(workspaceId),
  });
  await query.prefetchQuery({
    queryKey: ["user-videos"],
    queryFn: () => getAllUserVideos(workspaceId),
  });
  await query.prefetchQuery({
    queryKey: ["user-workspaces"],
    queryFn: () => getWorkspaces(),
  });
  await query.prefetchQuery({
    queryKey: ["user-notifications"],
    queryFn: () => getNotifications(),
  });

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="flex w-screen h-screen">
        <Sidebar activeWorkspace={workspaceId} />
      </div>
    </HydrationBoundary>
  );
};

export default Layout;
