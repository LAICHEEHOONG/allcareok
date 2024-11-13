"use client";

import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon";
import { animals } from "./data";

export default function SearchField() {
  return (
    <Autocomplete
      // label="Where"
      placeholder="Search..."
      variant="bordered"
      defaultItems={animals}
      startContent={<SearchIcon className="text-xl" />}
      defaultSelectedKey=""
      className="max-w-xs"
      radius="full"
      size="lg"
      aria-label="search where"
    >
      {(item) => (
        <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
      )}
    </Autocomplete>
  );
}
