import { apiSlice } from "./apiSlice";
const RESUME_URL = "/api/resume";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    generate: builder.mutation({
      query: (data) => ({
        url: `${RESUME_URL}/generate`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGenerateMutation } = userApiSlice;
