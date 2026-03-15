import { IntelligenceReport, SearchResult } from "@/lib/types";
import { generateIntelligenceForKeyword } from "@/lib/intelligence";
import { SearchClientPage } from "./SearchClientPage";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function SearchPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams;
  const query = typeof searchParams.q === 'string' ? searchParams.q : undefined;

  if (!query) {
    redirect("/");
  }

  // Generate the AI intelligence report for the requested phrase
  const result = await generateIntelligenceForKeyword(query);

  return (
    <Suspense fallback={<div>Loading AI Intelligence...</div>}>
      <SearchClientPage result={result} query={query} />
    </Suspense>
  );
}
