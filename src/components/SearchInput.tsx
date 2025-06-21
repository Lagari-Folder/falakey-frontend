import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { Type } from "@/models/type";
import { useDispatch, useSelector } from "react-redux";
import { search } from "@/lib/slices/searchSlice";
import { RootState } from "@/lib/store";
import { useTrans } from "@/utils/translation";
import { useNavigateWithLocale } from "@/helper/navigateWithLocale";

const SearchInput = ({
  categoryVar,
  options,
}: {
  categoryVar?: string;
  options: Type[];
}) => {
  const [category, setCategory] = useState<string>(categoryVar || "");
  const [query, setQuery] = useState<string>("");
  const [placeholder, setPlaceholder] = useState<string>("Search for photos..");
  const navigate = useNavigateWithLocale();
  const dispatch = useDispatch();

  const { t } = useTrans();

  // Access previous search state from Redux store
  const prevSearchState = useSelector((state: RootState) => state.search);

  useEffect(() => {
    setPlaceholder(prevSearchState.placeholder);
  }, [prevSearchState.placeholder]);

  // Update category when `categoryVar` changes
  useEffect(() => {
    if (categoryVar) {
      setCategory(categoryVar);
    }
  }, [categoryVar]);

  // Handle search logic
  const handleSearch = () => {
    if (!query.trim()) return; // Prevent empty searches

    dispatch(
      search({
        types: category,
        search: query,
      })
    );

    navigate(`/explore?types=${category}&search=${encodeURIComponent(query)}`);
  };

  return (
    <div className="bg-[#eeeeee] w-full rounded-md my-3 h-[45px] flex items-center py-1 px-1">
      {/* Dropdown for selecting category */}
      <Select
        onValueChange={(value) => {
          // Find the selected option to update placeholder dynamically
          const selectedType = options.find((option) => option.key === value);
          setPlaceholder(
            selectedType?.search_placeholder || t("navbar.search_photo")
          );

          // Update category and dispatch search action
          setCategory(value);
        }}
        value={category}
      >
        <SelectTrigger className="w-fit gap-1 h-full border-none font-bold shadow-none">
          <SelectValue placeholder="Photo" />
        </SelectTrigger>
        <SelectContent className="font-bold">
          {options.map((type) => (
            <SelectItem
              disabled={type.key === "video"} // Disable specific items (e.g., videos)
              key={type.key} // Use unique keys for better performance
              value={type.key}
            >
              {type.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Search input field */}
      <input
        type="search"
        enterKeyHint="search"
        className="w-full h-full bg-transparent mr-1 focus-visible:outline-none placeholder:font-semibold"
        placeholder={placeholder || "Search for photos.."}
        value={query}
        onChange={(e) => setQuery(e.target.value || prevSearchState.search!)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && query.trim()) {
            handleSearch(); // Trigger search on Enter key press
          }
        }}
      />

      {/* Search button */}
      <Button
        className="bg-primary text-center text-white py-1 px-2 text-sm"
        onClick={handleSearch}
      >
        {t("common.search")}
      </Button>
    </div>
  );
};

export default SearchInput;
