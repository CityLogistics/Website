import { useState } from "react";

export const regionalPrices = {
  ALBERTA: 1500,
  BRITISH_COLUMBIA: 1500,
  MANITOBA: 1500,
  NEWFOUNDLAND_AND_LABRADOR: 1500,
  NEW_BRUNSWICK: 1500,
  NORTHWEST_TERRITORIES: 1500,
  NOVA_SCOTIA: 1500,
  NUNAVUT: 1500,
  ONTARIO: 1500,
  PRINCE_EDWARD_ISLAND: 1500,
  QUEBEC: 1500,
  SASKATCHEWAN: 1500,
  YUKON: 1500,
};

export const vehiclePrices = {
  SALON: 800,
  FIVE_SEATER_SUV: 1500,
  SEVEN_SEATER_SUV: 2000,
  TRUCK: 1800,
  VAN: 1700,
};

export const pricePerKm = 100;

export const parseError = (error) => {
  const message = error.response?.data?.message;
  if (typeof message == "string") return message;
  if (message instanceof Array) return message.join(",");
  return "An error occured";
};

export async function codeAddress(place) {
  const google = window.google;
  const { place_id, description } = place;

  if (!google) return;

  const geocoder = new google.maps.Geocoder();

  return new Promise((resolve, reject) => {
    geocoder.geocode({ placeId: place_id }, function (results, status) {
      if (status == "OK") {
        if (results[0]) {
          const province = results[0].address_components.find(
            (v) => v.types[0] == "administrative_area_level_1"
          )?.long_name;

          const city = results[0].address_components.find(
            (v) => v.types[0] == "locality"
          )?.long_name;

          resolve({
            province: province?.toUpperCase(),
            country: "string",
            address: description,
            placeId: place_id,
            lat: results[0].geometry?.location?.lat(),
            lng: results[0].geometry?.location?.lng(),
            city: city?.toUpperCase() ?? "",
          });
        }
      } else {
        alert("Geocode was not successful for the following reason: " + status);
        reject("not found");
      }
    });
  });
}

export async function getDistace(params) {
  const google = window.google;

  if (!google) return;
  try {
    var distanceService = new google.maps.DistanceMatrixService();
    return new Promise((resolve, reject) => {
      distanceService.getDistanceMatrix(
        {
          origins: params.origins,
          destinations: params.destinations,
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC,
        },
        function (results, status) {
          if (status == "OK") {
            if (results?.rows?.[0]) {
              resolve({
                distance: results?.rows?.[0]?.elements?.[0]?.distance,
                status: results?.rows?.[0]?.elements?.[0].status,
              });
            } else
              resolve({
                status: "ZERO_RESULTS",
              });
          } else {
            resolve({
              status: "ZERO_RESULTS",
            });
          }
        }
      );
    });
  } catch (error) {}
}

export function getPrice({ pickup, dropoff, distance, vehicleType }) {
  const basePrice = Math.max(regionalPrices[pickup], regionalPrices[dropoff]);
  const vehiclePrice = vehiclePrices[vehicleType];

  const totalPrice = basePrice + Math.ceil(distance / 1000) * pricePerKm;
  // + vehiclePrice;

  return { totalPrice, basePrice, vehiclePrice, pricePerKm };
}

export function formatPhoneNumber(phone) {
  let l = phone.length;
  return "+1" + (l == 11 ? phone.substring(1, l) : phone);
}

export const openWidget = (setFile) => {
  var myWidget =
    window.cloudinary &&
    window.cloudinary.createUploadWidget(
      {
        cloudName: "workstedi",
        uploadPreset: "lm1ip4fw",
        api_key: "455779734655193",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setFile(result.info.secure_url);
        }
      }
    );
  myWidget?.open();
};

export const useCloudinary = (setFile) => {
  const [loading, setLoading] = useState(false);

  const launchWidget = () => {
    var myWidget =
      window.cloudinary &&
      window.cloudinary.createUploadWidget(
        {
          cloudName: "workstedi",
          uploadPreset: "lm1ip4fw",
          api_key: "455779734655193",
          multiple: false,
          maxFileSize: 1048576,
        },
        (error, result) => {
          setLoading(false);

          if (!error && result && result.event === "success") {
            setFile(result.info.secure_url);
          }
        }
      );
    if (myWidget) {
      setLoading(true);
      myWidget?.open();
    }
  };

  return {
    loading,
    launchWidget,
  };
};
