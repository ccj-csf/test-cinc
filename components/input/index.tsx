"use client";

import { KeyboardEvent, useContext, useEffect, useRef, useState } from "react";

import { AppContext } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Music } from "@/types/music";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { fetchEnhanced } from "@/utils/request";
import { useRequest } from "ahooks";
import CountUp from "react-countup";
import useMessage from "@/hooks/useMessage";

interface Props {
  setMusic: (music: Music[]) => void;
}

export default function ({ setMusic }: Props) {
  const { user, fetchUserInfo } = useContext(AppContext);
  const { showMessage, contextHolder } = useMessage();
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const router = useRouter();

  const { runAsync: generate, data: ids } = useRequest(
    async () => {
      const { code, data } = await fetchEnhanced("/api/music/generate", {
        method: "POST",
        data: {
          description: description,
        },
      });

      if (code === 401) {
        // toast.error("Please Log In First");
        showMessage.error("Please Log In First");
        router.push("/sign-in");
        return;
      }

      if (code === 0 && data) {
        return data;
      }

      throw new Error("Gen music failed");
    },
    {
      manual: true,
      onSuccess: () => getToken(),
      onError: () => {
        // toast.error("Gen music failed");
        showMessage.error("Gen music failed");
        setLoading(false);
      },
    }
  );

  const { run: getToken, data: token } = useRequest(
    async () => {
      const { code, data } = await fetchEnhanced("/api/music/token");

      if (code !== 0) {
        throw new Error("fetch token failed");
      }

      return data;
    },
    {
      manual: true,
      onSuccess: () => {
        setTimeout(async () => await getFeed(), 100);
      },
      onError: () => {
        // toast.error("Gen music failed");
        showMessage.error("Gen music failed");
        setLoading(false);
      },
    }
  );

  const { runAsync: getFeed } = useRequest(
    async () => {
      const { code, data } = await fetchEnhanced("/api/music/feed", {
        method: "POST",
        data: {
          description: description,
          ids: ids,
        },
        headers: {
          "X-Authorization": `Bearer ${token}`,
        },
      });

      if (code === 0 && data) {
        return data;
      }

      throw new Error(code);
    },
    {
      manual: true,
      onSuccess: (data) => {
        if (!data?.isFinish) {
          setTimeout(
            async () => await getFeed(),
            Math.min(15000, Math.random() * 2000)
          );
          return;
        }

        setMusic(data.list);
        setDescription("");
        // toast.success("Gen music success");
        showMessage.success("Gen music success");
        setLoading(false);
        fetchUserInfo();
      },
      onError: async (error: any) => {
        if (error === "BIZ_UNAUTHORIZED") {
          getToken();
          return;
        }

        if (error?.code === "BIZ_MODERATION_FAILURE") {
          // toast.error("Sorry, prompt likely copyrighted");
          showMessage.error("Sorry, prompt likely copyrighted");
        } else {
          showMessage.error("Gen music failed");
          // toast.error("Gen music failed");
        }

        setLoading(false);
      },
    }
  );

  const onInputKeydown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code === "Enter" && !e.shiftKey) {
      if (e.keyCode !== 229) {
        e.preventDefault();
        onSubmit();
      }
    }
  };

  const onSubmit = function () {
    if (!description) {
      showMessage.error("Please Enter Your Song Description");
      inputRef.current?.focus();
      return;
    }

    if (!user) {
      showMessage.error("Please Log In First");

      return;
    }

    setLoading(true);
    generate();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <form className="w-full" onSubmit={() => false}>
      {contextHolder}
      <div className="cursor-pointer rounded-md font-semibold">
        <Input
          rows={5}
          placeholder="a psychedelic reggaeton song about being trapped in an AI song factory, help!"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={onInputKeydown}
          className="border-[#FFF] text-black md:h-[200px] md:rounded-[16px]  !placeholder-[#7e7e7e] !font-normal "
          disabled={loading}
          ref={inputRef}
        />
      </div>

      <Button
        className="w-full mt-4  rounded-[24px] h-[44px]"
        type="button"
        disabled={loading}
        onClick={onSubmit}
      >
        {user ? (
          loading ? (
            <CountUp
              end={99}
              duration={60}
              prefix="Generating... "
              suffix="%"
            />
          ) : (
            "Generate"
          )
        ) : (
          "Available after logging in"
        )}
      </Button>
    </form>
  );
}
