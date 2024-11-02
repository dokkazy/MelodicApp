import { useEffect } from "react";

const useClearCartOnExit = () => {
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem("carts");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    // Cleanup
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
};

export default useClearCartOnExit;
