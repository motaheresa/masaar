import StepThreeP5MentorForm from "@/features/auth/register/components/organisms/StepThreeP5MentorForm";
import { redirect } from "next/navigation";

const CvUploadPage = async ({
  searchParams,
}: {
  searchParams: { role: string };
}) => {
  const { role } = await searchParams;
  console.log(role)
  if (role !== "mentor") {
    redirect("/register/role-selection");
  }

  

  return (
    <div
      className={`flex-1   w-full flex items-center justify-center p-6 sm:p-8 lg:p-12 py-0!`}
    >
      <div className="bg-white rounded-md w-full max-w-2xl text-center mx-auto px-4 sm:px-8 md:px-10 py-5 shadow-xl">
      <StepThreeP5MentorForm />
      </div>
    </div>
  );
};

export default CvUploadPage;
