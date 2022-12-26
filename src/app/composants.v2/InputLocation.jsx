import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import usePlacesAutocomplte, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { Typography } from "@material-ui/core";

//https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places&callback=initMap
function LocationInput({ value, onChange, label, style }) {
  const {
    ready,
    value: placeValue,
    suggestions: { status, data },
    setValue: setPlaceValue,
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

  const handleChange = async (e, val) => {
    try {
      const result = await getGeocode({ address: val.description });
      const { lat, lng } = await getLatLng(result[0]);
      onChange({
        address: val.description,
        lat: lat,
        lng: lng,
      });
    } catch (e) {}
  };

  React.useEffect(() => {
    handleChange(null, contextValue);

    setPlaceValue(value);
    const contextValue = {
      description: value,
    };
  }, [value]);

  return (
    <div style={{ ...style, width: "100%" }}>
      {label && <Typography style={{ fontWeight: "bold" }}>{label}</Typography>}
      <Autocomplete
        filterOptions={(x) => x}
        options={data}
        // defaultValue={{ place_id: "0", description: value }}
        onChange={handleChange}
        getOptionLabel={({ place_id, description }) => {
          if (description) return description;
          return "Non Défini";
        }}
        fullWidth
        disabled={!ready}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              placeholder={placeValue}
              defaultValue={value}
              className="flex flex-1"
              variant="outlined"
              value={placeValue}
              onChange={(e) => {
                setPlaceValue(e.target.value);
              }}
              fullWidth
            />
          );
        }}
      />
    </div>
  );
}

export default LocationInput;
