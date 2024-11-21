"use client";

import { Autocomplete, AutocompleteItem, Button } from "@nextui-org/react";
// import { SearchIcon } from "./SearchIcon";
import SearchIcon from '@mui/icons-material/Search';
import PlaceIcon from '@mui/icons-material/Place';
import { animals } from "./data";

export default function SearchField({ navigation }) {
  return (
    <div className="flex justify-center items-center gap-2">
      <Autocomplete
        // label="Where"
        placeholder={navigation.placeholder}
        variant="bordered"
        defaultItems={animals}
        startContent={<PlaceIcon className="text-gray-400"  />}
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
      <Button isIconOnly color="danger" aria-label="Search Icon" radius="full">
        <SearchIcon className="w-5"/>
      </Button> 
    </div>
  );
}
