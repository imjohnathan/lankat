"use client";
import useModalStore from "@/stores/useModalStore";
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
  const { openEditModal } = useModalStore();
  const [{ data, fetching, error }, reexecuteQuery] = useQuery({
    query: getWidgetsQuery,
  });

  return (
    <>
      <code className="whitespace-">{JSON.stringify(data, null, 2)}</code>
      <button
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={() => openEditModal({ type: "links" })}
      >
        Open
      </button>
    </>
  );
}

export default function App() {
  return (
    <div>
      <Suspense>
        <Data />
      </Suspense>
    </div>
  );
}
