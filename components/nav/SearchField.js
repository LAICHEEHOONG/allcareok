"use client";

import { Autocomplete, AutocompleteItem, Button } from "@heroui/react";
import { useAsyncList } from "@react-stately/data";
import SearchIcon from "@mui/icons-material/Search";
import PlaceIcon from "@mui/icons-material/Place";
import { animals } from "./data";
import { useDispatch, useSelector } from "react-redux";
import { setSearchValue } from "@/redux/features/search/searchSlice";
import { getAreaSuggestions } from "@/lib/action/adAction";
import { useState, useEffect } from "react";

export default function SearchField({ navigation }) {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.search.value);

  // const handleSearch = () => {
  //   const getAreaSuggestions_ = async (query) => {
  //     try {
  //       const res = await getAreaSuggestions(query);
  //       console.log(res);
  //       // return res.data
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getAreaSuggestions_(searchValue);
  // };

  let list = useAsyncList({
    async load({ filterText }) {
      if (!filterText) return { items: [] };

      try {
        const response = await getAreaSuggestions(filterText);
        if (!response.success) throw new Error(response.message);

        return {
          items: response.data.map((area, index) => ({
            id: index,
            name: area,
          })),
        };
      } catch (error) {
        console.log("Error fetching areas:", error);
        return { items: [] };
      }
    },
  });

  useEffect(() => {
    console.log(inputValue)
  }, [inputValue])
  
  // const handleOnChange = (where) => {
  //   dispatch(setSearchValue(where));
  //   setInputValue(value);
  //   list.setFilterText(value);
  // };
  return (
    <div className="flex justify-center items-center gap-2 ">
      <Autocomplete
        allowsCustomValue
        // inputValue={inputValue}
        // inputValue={list.filterText}
        isLoading={list.isLoading}
        items={list.items}

        // onInputChange={handleOnChange}
        placeholder={navigation.placeholder}
        // defaultInputValue={inputValue}
        variant="flat"
        // defaultItems={inputValue}
        startContent={<PlaceIcon className="text-gray-400" />}

        radius="full"
        size="lg"
        aria-label="search where"
        fullWidth={true}
        onInputChange={(value) => {
          setInputValue(value);
          list.setFilterText(value);
          dispatch(setSearchValue(value));
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
        // onPress={handleSearch}
      >
        <SearchIcon className="w-5" />
      </Button>
    </div>
  );
}
