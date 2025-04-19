"use client"
import { createContext, useContext, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

interface PageTransitionContextProps {
  isExiting: boolean;
  triggerExit: (href: string, isHomeTarget: boolean) => void;
  pendingHref: string | null;
  isHomeTarget: boolean;
}

const PageTransitionContext = createContext<PageTransitionContextProps | undefined>(undefined);

export function usePageTransition() {
  const ctx = useContext(PageTransitionContext);
  if (!ctx) throw new Error("usePageTransition must be used within PageTransitionProvider");
  return ctx;
}

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const [isExiting, setIsExiting] = useState(false);
  const [pendingHref, setPendingHref] = useState<string | null>(null);
  const [isHomeTarget, setIsHomeTarget] = useState(false);
  const router = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationDuration = 300;

  const triggerExit = useCallback((href: string, homeTarget: boolean) => {
    setPendingHref(href);
    setIsExiting(true);
    setIsHomeTarget(homeTarget);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      router.push(href);
      setIsExiting(false);
      setIsHomeTarget(false);
      setPendingHref(null);
    }, animationDuration);
  }, [router]);

  return (
    <PageTransitionContext.Provider value={{ isExiting, triggerExit, pendingHref, isHomeTarget }}>
      {children}
    </PageTransitionContext.Provider>
  );
}
