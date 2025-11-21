import Image from "next/image";
import { IconType } from "react-icons/lib";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  OutlineSpanClassName?: string;
  loading?: boolean;
  ProviderImgLink?: string;
  Icon?: IconType;
  variant?: "primary" | "secondary" | "outline";
};

export function Button({
  children,
  onClick,
  type,
  disabled,
  className,
  Icon,
  ProviderImgLink = undefined,
  OutlineSpanClassName = "",
  loading,
  variant = "primary",
}: ButtonProps) {
  const varaints = {
    primary: `w-full bg-primary box-border border border-primary
     hover:bg-primary-hover text-white rounded-sm hover:text-heading focus:ring-4 focus:ring-neutral-tertiary
      shadow-xs font-medium focus:ring-4 focus:outline-none focus:ring-blue-300 leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none `,

    gradient: `text-white bg-gradient-to-r from-primary via-primary/50 to-secondary hover:bg-gradient-to-br
     focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg
      dark:shadow-blue-800/80 font-medium rounded-sm text-sm px-4 py-2.5 text-center leading-5 `,

    outline: `relative inline-flex items-center justify-center p-0.5
         overflow-hidden text-sm font-medium text-heading 
         rounded-sm bg-gradient-to-br from-primary via-red-300 to-yellow-200 
         group focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 `,
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${
        varaints[variant as keyof typeof varaints]
      } w-full  ${!(disabled || loading) && "disabled"}
       ${
         disabled || loading
           ? "opacity-50 cursor-not-allowed"
           : "cursor-pointer"
       } ${className}`}
    >
      {/* Outline Varient */}
      {variant === "outline" ? (
        <span
          className={` px-4 py-2.5 flex items-center justify-center gap-2 rounded-base bg-white text-heading
           transition-all duration-150 ease-in rounded-sm
           group-hover:bg-transparent group-hover:text-heading
           dark:bg-neutral-900 dark:group-hover:bg-transparent text-center w-full ${OutlineSpanClassName}`}
        >
          {loading && (
            <span className="inline-block h-4 w-4  border-2 border-black border-t-transparent rounded-full animate-spin"></span>
          )}
          {ProviderImgLink && (
            <Image width={30} height={30} src={ProviderImgLink} alt="sad" />
          )}
          {/*Provider Image/Icon */}
          {Icon && <Icon className="text-lg" />}
          {children}
        </span>
      ) : (
        // Primary Varient
        <div
          className={`${
            !(disabled || loading) && " active:scale-110"
          } flex items-center justify-center gap-2 `}
        >
          {loading && (
            <span className="inline-block h-4 w-4  border-2 border-black border-t-transparent rounded-full animate-spin"></span>
          )}
          {/*Provider Image/Icon  */}
          {Icon && <Icon className="text-lg" />}
          <>{children}</>
        </div>
      )}
    </button>
  );
}
