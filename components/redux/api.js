import { createAction } from "@reduxjs/toolkit";

export const apiCallBegan = createAction("api/CallBegan");
export const apiCallFailed = createAction("api/CallFailed");
export const apiCallSuccess = createAction("api/CallSuccess");

export const apiGenerator = (API = "", data = {}) => {
  for (let [key, value] of Object.entries(data)) {
    API = API.replace(`{${key}}`, value);
  }
  return API;
};
