"use client";

import { Autocomplete, AutocompleteItem, Button } from "@heroui/react";
import SearchIcon from "@mui/icons-material/Search";
import PlaceIcon from "@mui/icons-material/Place";
import { animals } from "./data";
import { useDispatch } from "react-redux";
import { setSearchValue } from "@/redux/features/search/page";

export default function SearchField({ navigation }) {
  const dispatch = useDispatch();
  const handleOnChange = (where) => {
    dispatch(setSearchValue(where))
  }

  return (
    <div className="flex justify-center items-center gap-2">
      <Autocomplete
        allowsCustomValue
        onInputChange={handleOnChange}
        placeholder={navigation.placeholder}
        defaultInputValue={''}
        variant="flat"
        defaultItems={animals}
        startContent={<PlaceIcon className="text-gray-400" />}
        // defaultSelectedKey=""
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
