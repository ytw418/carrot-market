import { User } from "@prisma/client";
import { useEffect, useLayoutEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

interface ProfileResponse {
  ok: boolean;
  profile: User;
}

export default function useUser() {
  const { data, error } = useSWR<ProfileResponse>("/api/users/me");
  const router = useRouter();
  useLayoutEffect(() => {
    if (data && !data.ok) {
      router.replace("/enter");
    }
  }, [data, router]);
  return { user: data?.profile, isLoading: !data && !error };
}
