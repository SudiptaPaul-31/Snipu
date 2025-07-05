"use client";
import React from "react";

type ErrorPageProps = {
  error: Error;
};

const ErrorPage: React.FC<ErrorPageProps> = ({ error }) => {
  return <div>{error.message}</div>;
};

export default ErrorPage;
