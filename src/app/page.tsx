"use client";

import { useEffect, useState } from "react";
import { Splash } from "@/components/Splash";
import { ProfilePicker } from "@/components/ProfilePicker";

export default function Landing() {
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("sns:splash") === "done") {
      setSplashDone(true);
    }
  }, []);

  return (
    <>
      {!splashDone && (
        <Splash
          onComplete={() => {
            sessionStorage.setItem("sns:splash", "done");
            setSplashDone(true);
          }}
        />
      )}
      {splashDone && <ProfilePicker />}
    </>
  );
}
