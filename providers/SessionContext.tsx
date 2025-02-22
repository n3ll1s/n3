"use client";
import { SessionProvider } from "next-auth/react";

export default function SessionContext({ session, children }: any) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
