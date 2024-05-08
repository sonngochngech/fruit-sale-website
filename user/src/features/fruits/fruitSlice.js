import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { fruitService } from "./fruitService";

export const getAllFruits = createAsyncThunk(
  "fruit/get",
  async (thunkAPI) => {
    try {
      return await fruitService.getFruits();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const searchFruitByName = createAsyncThunk(
  "fruit/search",
  async (name,thunkAPI) => {
    try {
      return await fruitService.searchFruit(name);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const getAllFruitCategories = createAsyncThunk(
  "fruit/getCategories",
  async (thunkAPI) => {
    try {
      return await fruitService.getFruitCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAFruit = createAsyncThunk(
  "fruit/getAFruit",
  async (id, thunkAPI) => {
    try {
      return await fruitService.getSingleFruit(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addToWishList = createAsyncThunk(
  "fruit/wishlist",
  async (fruitId, thunkAPI) => {
    try {
      return await fruitService.addToWishList(fruitId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const fruitState = {
  fruit: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const fruitSlice = createSlice({
  name: "fruit",
  initialState: fruitState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllFruits.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllFruits.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.fruits = action.payload?.fruits;
      })
      .addCase(getAllFruits.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(searchFruitByName.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchFruitByName.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.fruits = action.payload?.fruits;
      })
      .addCase(searchFruitByName.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAllFruitCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllFruitCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.fruitCategories = action.payload.categories;
      })
      .addCase(getAllFruitCategories.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(addToWishList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToWishList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.addToWishList = action.payload;
        state.message = "Fruit added to wishlist !";
        // if (state.isSuccess === true) {
        //   toast.info('Fruit added to wishlist !');
        // }
      })
      .addCase(addToWishList.rejected, (state, action) => {
        action.isLoading = false;
        action.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAFruit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAFruit.fulfilled, (state, action) => {
        state.isLoading = false;  
        state.isError = false;
        state.isSuccess = true;
        state.singlefruit = action.payload.fruit;
        state.message = "Fruit fetched susscessfully!";
      })
      .addCase(getAFruit.rejected, (state, action) => {
        action.isLoading = false;
        action.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default fruitSlice.reducer;
