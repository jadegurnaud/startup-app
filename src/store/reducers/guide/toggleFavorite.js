import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiClient from "../../../api/apiClient";

export const toggleFavorite = createAsyncThunk(
  "guide/toggleFavorites",
  async ({ userId, guideId, isFavorite }, { rejectWithValue }) => {
    try {
      // const config = {
      //     method: isFavorite ? "DELETE" : "POST",
      //     url: isFavorite
      //     ? `${process.env.REACT_APP_API_URL}/favorites/user/${userId}/guide/${guideId}`
      //     : `${process.env.REACT_APP_API_URL}/favorites`,
      //     headers: {
      //         "Content-Type": "application/json",
      //     },
      //     ...((!isFavorite) && {
      //         data: JSON.stringify({ user: userId, guide: guideId }),
      //     }),
      // };
      // const response = await axios(config);
      const response = isFavorite
        ? await apiClient.delete(`/favorites/user/${userId}/guide/${guideId}`)
        : await apiClient.post("/favorites", { user: userId, guide: guideId });

      return {
        guideId,
        isFavorite: !isFavorite,
        data: response.data,
      };
    } catch (error) {
      console.error(error.response.data, "error");
      return rejectWithValue(error.response.data);
    }
  }
);
