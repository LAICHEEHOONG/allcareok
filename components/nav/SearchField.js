"use client";

import { Autocomplete, AutocompleteItem, Button } from "@heroui/react";
import SearchIcon from "@mui/icons-material/Search";
import PlaceIcon from "@mui/icons-material/Place";
import { animals } from "./data";

export default function SearchField({ navigation }) {
  return (
    <div className="flex justify-center items-center gap-2">
      <Autocomplete
        placeholder={navigation.placeholder}
        variant="flat"
        defaultItems={animals}
        startContent={<PlaceIcon className="text-gray-400" />}
        defaultSelectedKey=""
        radius="full"
        size="lg"
        aria-label="search where"
        fullWidth={true}
      >
        {(item) => (
          <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
        )}
      </Autocomplete>
      <Button isIconOnly color="danger" aria-label="Search Icon" radius="full">
        <SearchIcon className="w-5" />
      </Button>
    </div>
  );
}
