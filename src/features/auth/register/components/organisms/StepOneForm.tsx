import { OutlineTextField } from "@/components/molecules/form/Input/TextField";
import { motion } from "framer-motion";
import { OutlinePasswordField } from "@/components/molecules/form/Input/PasswordField";
import { useStepOneForm } from "../../hooks/useStepOneForm";
import { FormDivider } from "@/components/molecules/form/FormDivider";
import { Button } from "@/components/atoms/Button/Button";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

const StepOneForm = () => {
  const { handleSubmit, onSubmit, register, errors, isValid, isLoading } =
    useStepOneForm();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <motion.div variants={itemVariants}>
              <OutlineTextField
                label="First Name"
                placeholder="e.g. Mohamed"
                name="firstName"
                register={register}
                error={errors.firstName?.message}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <OutlineTextField
                label="Last Name"
                placeholder="e.g. Taher"
                name="lastName"
                register={register}
                error={errors.lastName?.message}
              />
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="mb-6">
            <OutlineTextField
              label="Email Address"
              type="email"
              placeholder="your@example.com"
              name="email"
              isRequired={true}
              register={register}
              error={errors.email?.message}
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <motion.div variants={itemVariants} className="mb-6">
              <OutlinePasswordField
                label="Password"
                name="password"
                placeholder="......"
                isRequired={true}
                register={register}
                error={errors.password?.message}
              />
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <OutlinePasswordField
                label="Confirm Password"
                name="confirmPassword"
                isRequired={true}
                placeholder="......"
                register={register}
                error={errors.confirmPassword?.message}
              />
            </motion.div>
          </div>

          <motion.div variants={itemVariants}>
            <Button type="submit" disabled={isLoading}>
              Create Account
            </Button>
          </motion.div>

          <FormDivider />

          <motion.div variants={itemVariants} className="space-y-4">
            <Button Icon={FcGoogle} variant="outline">
              Sign in with google
            </Button>
            <Button Icon={FaGithub} variant="outline">
              Sign in with github
            </Button>
          </motion.div>
        </motion.div>
      </form>
    </>
  );
};

export default StepOneForm;
