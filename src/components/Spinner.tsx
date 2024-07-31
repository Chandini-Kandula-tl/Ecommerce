import { ReactNode } from "react";
import { Loader } from "./Loader";

interface LoaderProps {
  loading: boolean;
  children: ReactNode;
}

export default function Spinner({ loading, children }: LoaderProps) {
  return loading ? (
    <>
      <div className="h-[100%] w-[100%] inset-0 z-50 fixed flex items-center justify-center bg-gray-400 bg-opacity-40">
        <Loader />
      </div>
      {children}
    </>
  ) : (
    <>{children}</>
  );
}
