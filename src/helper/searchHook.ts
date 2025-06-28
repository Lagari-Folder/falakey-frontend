import { useSelector } from "react-redux";
import { useMemo } from "react";
import { RootState } from "@/lib/store";

export const useSearchParamsHook = () => {
  const searchState = useSelector((state: RootState) => state.search);

  const stringFiltering = useMemo(() => {
    const { types, search, filter, sort, collection } = searchState;
    const params: Record<string, string> = {};

    if (types) {
      params.types = types;
    } else {
      params.types = "photo";
    }
    if (search) params.search = search;
    if (filter) {
      if (filter.orientation) params.orientation = filter.orientation;
      if (filter.size) params.size = filter.size;
      if (filter.color) params.color = filter.color;
    }
    if (sort) params.sort = sort;
    if (collection) params.collection = collection;

    const currentPath = window.location.pathname;
    const queryString = new URLSearchParams(params).toString();
    const newUrl = `${currentPath}?${queryString}`;

    window.history.pushState(null, "", newUrl);
    return queryString;
  }, [searchState]);

  return stringFiltering;
};

export const getEffectiveSearchParams = (state: RootState) => {
  const { types, search, filter, sort, collection } = state.search;
  return { types, search, filter, sort, collection };
};
