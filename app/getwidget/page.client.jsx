"use client";
import { gql, useQuery } from "@urql/next";
import { Suspense } from "react";
const getWidgetsQuery = gql`
  query getWidgets {
    widgets(order_by: { sort: asc_nulls_first }) {
      id
      isShow
      name
      type
    }
  }
`;

function Data() {
  const [{ data, fetching, error }, reexecuteQuery] = useQuery({
    query: getWidgetsQuery,
  });

  return <code className="whitespace-">{JSON.stringify(data, null, 2)}</code>;
}

export default function App() {
  return (
    <Suspense>
      <Data />
    </Suspense>
  );
}
