import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { JSX } from "react";

const LoadingOverlay = (): JSX.Element => {
  return (
    <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-20">
      <LoadingSpinner />
    </div>
  );
};

export default LoadingOverlay;