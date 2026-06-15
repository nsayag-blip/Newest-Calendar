// src/hooks/useLabels.ts
import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { salesforceApi } from "../api/client";
import { LABEL_DEFAULTS, type Labels, type LabelKey } from "../constants/labels";

// Latest resolved labels, for non-component code (api/remote.ts, utils/errors.ts).
let currentLabels: Labels = LABEL_DEFAULTS;

// Custom Labels fetched once, merged over the defaults (Salesforce wins).
// Never blocks, shows defaults until the fetch resolves, then upgrades in place.
export function useLabels(): Labels {
  const { data } = useQuery({
    queryKey: ["labels"],
    queryFn: () => salesforceApi.getLabels(),
    staleTime: Infinity,
    retry: false,
    throwOnError: false,
  });

  const mergedLabels = useMemo(
    () => ({ ...LABEL_DEFAULTS, ...(data ?? {}) }) as Labels,
    [data],
  );

  useEffect(() => {
    currentLabels = mergedLabels;
  }, [mergedLabels]);

  return mergedLabels;
}

// Read one label outside of React (no hook).
export function getLabel<K extends LabelKey>(key: K): Labels[K] {
  return currentLabels[key];
}
