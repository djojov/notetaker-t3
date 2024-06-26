import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Inter as FontSans } from "next/font/google";

import { api } from "~/utils/api";

import { ThemeProvider } from "~/components/theme-provider";
import { Toaster } from "~/components/ui/toaster";
import { cn } from "~/lib/utils";
import "~/styles/globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <style
        jsx
        global
      >{`:root { --font-sans: ${fontSans.style.fontFamily};}}`}</style>
      <SessionProvider session={session}>
        <main
          className={cn(
            "bg-background font-sans antialiased",
            fontSans.variable,
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Component {...pageProps} />
            <Toaster />
          </ThemeProvider>
        </main>
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
