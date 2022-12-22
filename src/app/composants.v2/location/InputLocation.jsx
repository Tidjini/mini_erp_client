import React, { useEffect, useState } from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";

import usePlacesAutocomplte, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

//https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places&callback=initMap
function LocationInput({ id, setAddress, defaultValue, setCenter }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplte({
    requestOptions: {
      componentRestrictions: { country: "dz" },
      fields: ["address_components", "geometry", "icon", "name"],
      strictBounds: false,
      types: ["establishment"],
    },
    cache: 24 * 60 * 60,
  });

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const onDepartChange = async (e, val) => {
    //setDirections(null);
    try {
      const result = await getGeocode({ address: val.description });
      const { lat, lng } = await getLatLng(result[0]);
      setAddress({
        address: val.description,
        lat: lat,
        lng: lng,
      });
      // setDepart({ address: val.description, lat, lng });
      setCenter({ lat: lat, lng: lng });
    } catch (e) {
      // setDepart(null);
    }
  };

  return (
    <div className="flex">
      <Autocomplete
        id={id}
        filterOptions={(x) => x}
        options={data}
        onChange={onDepartChange}
        getOptionLabel={({ place_id, description }) => {
          return description;
        }}
        fullWidth
        disabled={!ready}
        renderInput={(params) => (
          <TextField
            placeholder={defaultValue}
            className="flex flex-1"
            variant="outlined"
            InputProps={{
              "aria-label": { defaultValue },
              "::-webkit-input-placeholder": {
                color: "red",
              },
            }}
            {...params}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            fullWidth
          />
        )}
      />
    </div>
  );
}

export default LocationInput;
