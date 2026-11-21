import { useEffect, useRef } from "react";
import { render, cleanup } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { TooltipProvider } from "@/components/ui/tooltip";

afterEach(cleanup);

it("mounts the tooltip provider with the application's React hooks", () => {
  const mounted = vi.fn();
  function HookConsumer() {
    const value = useRef("shared-react-runtime");
    useEffect(() => { mounted(value.current); }, []);
    return null;
  }
  render(<TooltipProvider><HookConsumer /></TooltipProvider>);
  expect(mounted).toHaveBeenCalledExactlyOnceWith("shared-react-runtime");
});