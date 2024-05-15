import { AppContext } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import User from "@/components/user";
import { usePathname } from "next/navigation";
import { cs } from "@/utils";
import { Drawer } from "antd";
import { CloseOutlined, RightOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";

export interface Tab {
  title: string;
  name?: string;
  url?: string;
}

const navigation: Tab[] = [
  { name: "home", title: "Explore", url: "/" },
  { name: "create", title: "Create", url: "/create" },
];

export default function () {
  const { user } = useContext(AppContext);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <header>
      <div className="h-auto w-screen">
        <nav className="font-inter mx-auto h-auto w-full max-w-[1600px] lg:relative lg:top-0">
          <div className="flex flex-row items-center px-6 py-8 lg:flex-row lg:items-center justify-between lg:px-10 lg:py-8 xl:px-20">
            <div className="md:hidden text-black">
              <Image
                onClick={showDrawer}
                src={"/icons/menu.svg"}
                alt="menu"
                width={48}
                height={48}
              ></Image>
            </div>
            <Link
              href="/"
              className=" md:text-xl md:font-medium md:flex md:items-center"
            >
              <img
                src="/logo.png"
                className="h-4 md:w-auto md:h-10"
                alt="WAV Music"
              />
            </Link>
            <div className="md:hidden">
              {user === undefined ? (
                <>loading...</>
              ) : (
                <>
                  {user ? (
                    <User user={user} />
                  ) : (
                    <Link className="cursor-pointer" href="/si">
                      <Button>Sign In</Button>
                    </Link>
                  )}
                </>
              )}
            </div>
            <div className="hidden md:flex ml-16 flex-1 gap-x-10 text-black items-center">
              {navigation.map((tab, idx: number) => (
                <Link
                  key={idx}
                  href={tab?.url as any}
                  className={cs("text-md font-medium leading-6 text-black", {
                    "text-secondary bg-white px-6 py-2 rounded-[22px]":
                      pathname === tab.url,
                  })}
                >
                  {tab.title}
                </Link>
              ))}
            </div>
            <Drawer
              title=""
              onClose={onClose}
              open={open}
              placement="left"
              className="!bg-black !opacity-70"
              extra={
                <div className="flex justify-start text-left">
                  <CloseOutlined onClick={onClose} className="text-[24px]" />
                </div>
              }
            >
              <main className="space-y-4 flex flex-col text-[40px]">
                <Link
                  className="flex justify-between items-center text-[28px]  pb-4 text-white"
                  href="/"
                >
                  <span>home</span>
                </Link>
                <Link
                  className="flex justify-between items-center text-[28px]  pb-4 text-white"
                  href="/explore"
                >
                  <span>explore</span>
                </Link>
              </main>
            </Drawer>
            <div className="hidden flex flex-row items-center lg:flex lg:flex-row lg:space-x-3 lg:space-y-0">
              {user === undefined ? (
                <>loading...</>
              ) : (
                <>
                  {user ? (
                    <User user={user} />
                  ) : (
                    <a className="cursor-pointer" href="/si">
                      <Button>Sign In</Button>
                    </a>
                  )}
                </>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
