import { OutlineTextField } from "@/components/molecules/form/Input/TextField";
import { OutlinePasswordField } from "@/components/molecules/form/Input/PasswordField";
import { useStepOneForm } from "../../hooks/useStepOneForm";
import { FormDivider } from "@/components/molecules/form/FormDivider";
import { Button } from "@/components/atoms/Button/Button";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

const StepOneForm = () => {
  const { handleSubmit, onSubmit, register, errors, isValid, isLoading } =
    useStepOneForm();

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className="grid grid-cols-1"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div className="animate-slide-up" style={{ animationDelay: '0.05s' }}>
              <OutlineTextField
                label="First Name"
                placeholder="e.g. Mohamed"
                name="firstName"
                register={register}
                error={errors.firstName?.message}
              />
            </div>

            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <OutlineTextField
                label="Last Name"
                placeholder="e.g. Taher"
                name="lastName"
                register={register}
                error={errors.lastName?.message}
              />
            </div>
          </div>

          <div className="mb-6 animate-slide-up" style={{ animationDelay: '0.15s' }}>
            <OutlineTextField
              label="Email Address"
              type="email"
              placeholder="your@example.com"
              name="email"
              isRequired={true}
              register={register}
              error={errors.email?.message}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div className="mb-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <OutlinePasswordField
                label="Password"
                name="password"
                placeholder="......"
                isRequired={true}
                register={register}
                error={errors.password?.message}
              />
            </div>

            <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.25s' }}>
              <OutlinePasswordField
                label="Confirm Password"
                name="confirmPassword"
                isRequired={true}
                placeholder="......"
                register={register}
                error={errors.confirmPassword?.message}
              />
            </div>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Button type="submit" disabled={isLoading}>
              Create Account
            </Button>
          </div>

          <FormDivider />

          <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.35s' }}>
            <Button Icon={FcGoogle} variant="outline">
              Sign in with google
            </Button>
            <Button Icon={FaGithub} variant="outline">
              Sign in with github
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default StepOneForm;
