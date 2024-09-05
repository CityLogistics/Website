import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import usePlacesAutocompleteService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import Loader from "../Loader";

export default function MapPicker({ onChange, inputField, ...inputProps }) {
  const [open, setOpen] = useState();
  const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } =
    usePlacesAutocompleteService({
      apiKey: process.env.NEXT_PUBLIC_MAP_KEY,
      debounce: 2000,
    });

  const render = (item) => {
    return (
      <div
        className="px-1 flex text-sm py-1 cursor-pointer hover:bg-slate-200"
        onClick={() => {
          if (onChange) onChange(item);
          setOpen(false);
        }}
      >
        <Image
          src="/images/location-icon.svg"
          alt="Location icon"
          width={20}
          height={20}
        />
        {item.description}
      </div>
    );
  };
  const ref = useRef();

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      {!inputField && (
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <Image
            src="/images/location-icon.svg"
            alt="Location icon"
            width={20}
            height={20}
          />
        </span>
      )}
      <div
        className="absolute  left-0 right-0 bottom-0 top-0"
        onClick={() => setOpen(true)}
      ></div>
      {inputField ? (
        inputField()
      ) : (
        <input
          type="text"
          id="pickUpLocation"
          name="pickUpLocation"
          placeholder="Location here..."
          {...inputProps}
          className="w-full pl-10 pr-4 py-2 border rounded-[10px] border-[#BDBDBD] focus:outline-none focus:ring-primary disabled:bg-white"
          disabled
          onClick={() => setOpen(true)}
        />
      )}

      {open && (
        <div className="absolute top-10 h-56  w-full bg-white shadow-lg flex flex-col pb-2">
          <input
            type="text"
            id="pickUpLocation"
            name="pickUpLocation"
            placeholder="Search"
            // value={pickUpLocation}
            onChange={(e) => getPlacePredictions({ input: e.target.value })}
            className="w-full  px-2 py-2 border rounded-[10px] border-[#BDBDBD] focus:outline-none focus:ring-primary mb-2"
            // disabled
            onClick={() => setOpen(true)}
          />
          <div className="h-full flex-1 overflow-y-auto z-50 bg-white">
            {isPlacePredictionsLoading && <Loader />}
            {placePredictions.map((place) => render(place))}
          </div>
        </div>
      )}
    </div>
  );
}
