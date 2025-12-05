import { registerApi } from "../api/registerApi";

export const getLanguages = async () => {
  const storedLanguages = localStorage.getItem("languagesOptions");
  if (storedLanguages == null) {
    const res = await registerApi.getLanguages();

    if (res.status === "success") {
      localStorage.setItem(
        "languagesOptions",
        JSON.stringify(res.data?.languages || [])
      );
    }
    return {
      status: res.status,
      data: {
        languages: res.data?.languages || [],
      },
    };
  }
  return {
    status: "success",
    data: {
      languages: JSON.parse(storedLanguages),
    },
  };
};
