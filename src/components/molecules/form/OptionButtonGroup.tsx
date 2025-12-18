import { IconType } from "react-icons/lib";

export type OptionItem = {
    value: string;
    label: string;
    icon?: IconType;
};

type OptionButtonGroupProps = {
    options: OptionItem[];
    selectedValue: string | string[];
    onChange: (value: string) => void;
    label?: string;
    multiple?: boolean;
    showIcons?: boolean;
    className?: string;
    error?: string;
    btnStyle?: string;
    btnContainerStyle?: string;
};

export const OptionButtonGroup = ({
    options,
    selectedValue,
    onChange,
    label,
    multiple = false,
    showIcons = true,
    className = "",
    btnStyle="",
    error = "",
    btnContainerStyle="",
}: OptionButtonGroupProps) => {
    const isSelected = (value: string) => {
        if (multiple && Array.isArray(selectedValue)) {
            return selectedValue.includes(value);
        }
        return selectedValue === value;
    };

    return (
        <div className={className}>
            {label && (
                <label className="block mb-3 text-sm font-semibold text-gray-900">
                    {label}
                </label>
            )}
            <div className={`flex flex-wrap gap-3 ${btnContainerStyle}`}>
                {options.map((option) => {
                    const Icon = option.icon;
                    const selected = isSelected(option.value);
                    return (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => onChange(option.value)}
                            className={`flex items-center group justify-center gap-2 px-5 py-2.5 rounded-lg border-2  font-medium text-sm
                ${selected
                                    ? "border-primary bg-primary/5 text-primary"
                                    : "border-gray-200 bg-white text-gray-600 hover:border-primary hover:text-primary"
                                } ${btnStyle} `}
                        >
                            {showIcons && Icon && (
                                <Icon className={`text-lg group-hover:text-primary ${selected ? "text-primary" : "text-gray-400"}`} />
                            )}
                            <span>{option.label}</span>
                        </button>
                    );
                })}
            </div>
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
        </div>
    );
};

export default OptionButtonGroup;
