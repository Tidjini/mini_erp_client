import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import usePlacesAutocomplte, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { Typography } from "@material-ui/core";

//https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places&callback=initMap
function LocationInput({ defaultValue, changeAddress, label, style }) {
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

  React.useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleChange = async (e, val) => {
    try {
      const result = await getGeocode({ address: val.description });
      const { lat, lng } = await getLatLng(result[0]);
      changeAddress({
        address: val.description,
        lat: lat,
        lng: lng,
      });
    } catch (e) {}
  };

  return (
    <div style={{ ...style, width: "100%" }}>
      {label && <Typography style={{ fontWeight: "bold" }}>{label}</Typography>}
      <Autocomplete
        filterOptions={(x) => x}
        options={data}
        onChange={handleChange}
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
