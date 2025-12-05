import { registerApi } from "../api/registerApi";

export const getSkills = async () => {
  const storedSkills = localStorage.getItem("skillsOptions");
  if (storedSkills == null) {
    const res = await registerApi.getSkills();

    if (res.status === "success") {
      localStorage.setItem(
        "skillsOptions",
        JSON.stringify(res.data?.skills || [])
      );
    }
    return {
      status: res.status,
      data: {
        skills: res.data?.skills || [],
      },
    }
  }
  return {
    status: "success",
    data: {
      skills: JSON.parse(storedSkills),
    },
  };
};
