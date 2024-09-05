import axios from "axios";
import { instance } from "./apis";

export const regionalPrices = {
  ALBERTA: 1600,
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
  FIVE_SEATER_SUV: 1600,
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
  const { place_id, description } = place;

  console.info({ place_id, description });

  const geocoder = new google.maps.Geocoder();

  return new Promise((resolve, reject) => {
    geocoder.geocode({ placeId: place_id }, function (results, status) {
      if (status == "OK") {
        if (results[0]) {
          const province = results[0].address_components.find(
            (v) => v.types[0] == "administrative_area_level_1"
          )?.long_name;

          console.info({
            lat: results[0].geometry?.location?.lat(),
            lng: results[0].geometry?.location?.lng(),
            province,
            country: "string",
            address: description,
            placeId: place_id,
          });

          resolve({
            province: province.toUpperCase(),
            country: "string",
            address: description,
            placeId: place_id,
            lat: results[0].geometry?.location?.lat(),
            lng: results[0].geometry?.location?.lng(),
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
            console.info({ results });

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
  } catch (error) {
    console.info({ error });
  }
}

export function getPrice({ pickup, dropoff, distance, vehicleType }) {
  console.info({ pickup, dropoff, distance, vehicleType });
  const basePrice = Math.max(regionalPrices[pickup], regionalPrices[dropoff]);
  const vehiclePrice = vehiclePrices[vehicleType];

  const totalPrice =
    basePrice + Math.ceil(distance / 1000) * pricePerKm + vehiclePrice;

  return totalPrice;
}