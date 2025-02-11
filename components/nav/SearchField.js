"use client";

import { Autocomplete, AutocompleteItem, Button } from "@heroui/react";
import { useAsyncList } from "@react-stately/data";
import SearchIcon from "@mui/icons-material/Search";
import PlaceIcon from "@mui/icons-material/Place";
import { useDispatch, useSelector } from "react-redux";
import { setSearchValue } from "@/redux/features/search/searchSlice";
import { getAreaSuggestions } from "@/lib/action/adAction";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchField({ navigation }) {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const serviceType = useSelector((state) => state.search?.serviceType);

  // let list = useAsyncList({
  //   async load({ filterText }) {
  //     if (!filterText.trim()) return { items: [] }; // 🔥 Ensure spaces don’t break the search

  //     try {
  //       const response = await getAreaSuggestions(filterText.trim()); // 🔥 Trim spaces before search
  //       if (!response.success) {
  //         console.log(response.message);
  //       }
  //       console.log(response);
  //       return {
  //         items: response.data.map((area, index) => ({
  //           id: index,
  //           name: area,
  //         })),
  //       };
  //     } catch (error) {
  //       return { items: [] };
  //     }
  //   },
  // });

  let list = useAsyncList({
    async load({ filterText }) {
      if (!filterText.trim()) return { items: [] };
  
      try {
        const response = await getAreaSuggestions(filterText.trim());
        if (!response.success) {
          console.log(response.message);
        }
        console.log(response);
  
        // 🔥 Normalize strings: trim & convert to lowercase, then filter unique values
        const uniqueAreas = Array.from(
          new Set(response.data.map(area => area.trim().toLowerCase()))
        ).map((area, index) => ({
          id: index,
          name: area,
        }));
  
        return { items: uniqueAreas };
      } catch (error) {
        return { items: [] };
      }
    },
  });

  const handleSearch = () => {
    router.push(`?area=${inputValue}&serviceType=${serviceType}`);
  };

  return (
    <div className="flex justify-center items-center gap-2 ">
      <Autocomplete
        allowsCustomValue
        // isLoading={list.isLoading}
        items={list.items}
        placeholder={navigation.placeholder}
        variant="flat"
        startContent={<PlaceIcon className="text-gray-400" />}
        radius="full"
        size="lg"
        aria-label="search where"
        fullWidth={true}
        onInputChange={(value) => {
          setInputValue(value);
          list.setFilterText(value.trim()); // 🔥 Trim spaces before setting filter text
          dispatch(setSearchValue(value.trim())); // 🔥 Ensure Redux gets the trimmed input
        }}
      >
        {(item) => (
          <AutocompleteItem key={item.id} textValue={item.name}>
            <div className="capitalize">{item.name}</div>
          </AutocompleteItem>
        )}
      </Autocomplete>
      <Button
        isIconOnly
        color="danger"
        aria-label="Search Icon"
        radius="full"
        onPress={handleSearch}
      >
        <SearchIcon className="w-5" />
      </Button>
    </div>
  );
}
