import { registerApi } from "../api/registerApi";

export const getTopics = async () => {
  const storedTopics = localStorage.getItem("topicsOptions");
  if (storedTopics == null) {
    const res = await registerApi.getTopics();

    if (res.status === "success") {
      localStorage.setItem(
        "topicsOptions",
        JSON.stringify(res.data?.topics || [])
      );
    }
    return {
      status: res.status,
      data: {
        topics: res.data?.topics || [],
      },
    };
  }
  return {
    status: "success",
    data: {
      topics: JSON.parse(storedTopics),
    },
  };
};
