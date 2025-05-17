"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "react-cookies";

interface TerminalPageProps {
  tabId: string;
}

export default function TerminalPageTab({ tabId }: TerminalPageProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const userAccessToken = Cookies.load("userAccessToken");
  const userRefreshToken = Cookies.load("userRefreshToken");

  useEffect(() => {
    // Check if user is logged in
    let token: string =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MDEyMDQyNzJiZTk5YmQxMTg3OTRlZCIsImlhdCI6MTc0NDkwNDI3MCwiZXhwIjoxNzQ1NTA5MDcwfQ.OlcILtG1iYVT0KHnEdSMxsSsqmaK5mffhqkYncJkVXs";

    // if (userAccessToken) {
    //   token = userAccessToken;
    // } else if (userRefreshToken) {
    //   token = userRefreshToken;
    // } else {
    //   console.error(
    //     "No access token or refresh token found. Redirecting to login."
    //   );
    // }

    // Set loading to false after iframe loads
    const handleIframeLoad = () => {
      setLoading(false);
    };

    if (iframeRef.current) {
      iframeRef.current.addEventListener("load", handleIframeLoad);
    }

    return () => {
      if (iframeRef.current) {
        iframeRef.current.removeEventListener("load", handleIframeLoad);
      }
    };
  }, [router]);

  return (
    <div className="flex flex-col">
      <div className="flex-grow overscroll-auto h-full bg-black p-1 relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 z-10">
            <div className="text-white text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-white border-r-transparent mb-2"></div>
              <p>Loading terminal...</p>
            </div>
          </div>
        )}
        <iframe
          ref={iframeRef}
          src="http://ec2-13-203-159-25.ap-south-1.compute.amazonaws.com:7681/"
          className="w-full h-full"
          allow="fullscreen"
        />
      </div>
    </div>
  );
}
