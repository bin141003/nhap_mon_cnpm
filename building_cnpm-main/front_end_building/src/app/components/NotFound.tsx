import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl font-semibold">404 Not Found</h1>
      <p className=" text-red-500 font-medium">
        The page you are looking for does not exist.
      </p>
      <p>
        <Link href="/" className="font-semibold text-blue-600">
          {" "}
          {`<<<Back to Home`}
        </Link>
      </p>
    </div>
  );
};

export default NotFound;
