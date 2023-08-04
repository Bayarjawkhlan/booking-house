"use client";

import { FC, useEffect } from "react";
import EmtpyState from "./components/EmtpyState";

interface ErrorProps {
  error: Error;
}

const Error: FC<ErrorProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <EmtpyState title="Uh Oh" subtitle="Something went wrong" />;
};

export default Error;
