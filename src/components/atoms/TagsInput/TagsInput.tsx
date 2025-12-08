import React, { useCallback, useMemo, useRef, useState, useEffect } from "react";

export type Tag = { id: number | string; name: string };

export interface TagsInputProps {
  label?: string;
  placeholder?: string;
  helperText?: string;
  suggestions?: string[] | Tag[];
  value?: Tag[];
  onChange?: (tags: Tag[]) => void;
  error?: string;
  className?: string;
  /** maximum allowed tags */
  maxTags?: number;
  /** minimum length for tag text */
  minLength?: number;
  /** maximum length for tag text */
  maxLength?: number;
  /** optional regex to validate tag text */
  pattern?: RegExp;
  /** callback when an invalid input is attempted */
  onInvalid?: (message: string) => void;
  /** optional name attribute to forward to the internal input */
  name?: string;
}

const DEFAULT_SUGGESTIONS = [
  "React",
  "TypeScript",
  "Next.js",
  "Node.js",
  "CSS",
  "Tailwind",
  "GraphQL",
  "Prisma",
  "Postgres",
  "MongoDB",
  "Docker",
  "Kubernetes",
  "Redis",
  "Jest",
  "Cypress",
  "SWR",
  "React Query",
  "Recoil",
  "Zod",
];

export const TagsInput = React.forwardRef<HTMLInputElement, TagsInputProps>(
  (
    {
      label,
      placeholder = "Add a tag...",
      helperText,
      suggestions = DEFAULT_SUGGESTIONS,
      value = [],
      onChange,
      error,
      className = "",
      maxTags = 20,
      minLength = 1,
      maxLength = 50,
      pattern,
      onInvalid,
      name,
    },
    forwardedRef
  ) => {
    const [tags, setTags] = useState<Tag[]>(value);
    const [input, setInput] = useState("");
    const [focused, setFocused] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [validationError, setValidationError] = useState<string | null>(null);
    const [apiErr, setApiErr] = useState<string | null>(null);
    const localRef = useRef<HTMLInputElement | null>(null);

    // Read API error from sessionStorage on mount and when name changes
    // Clear it immediately so it doesn't persist on navigation back/forward
    useEffect(() => {
      const storedErr = sessionStorage.getItem(`api-error-${name}`);
      if (storedErr) {
        setApiErr(storedErr);
        // Clear from sessionStorage immediately so it doesn't block form on revisit
        sessionStorage.removeItem(`api-error-${name}`);
      }
    }, [name]);

    const handleInputChange = () => {
      setApiErr(null);
      sessionStorage.removeItem(`api-error-${name}`);
    };

    const inputRef = (ref: HTMLInputElement | null) => {
      localRef.current = ref;
      if (typeof forwardedRef === "function") forwardedRef(ref);
      else if (forwardedRef && typeof forwardedRef === "object") (forwardedRef as any).current = ref;
    };

    // sync with external value changes
    React.useEffect(() => {
      setTags(value || []);
    }, [value]);

    // Get suggestion strings based on suggestions type
    const suggestionStrings = useMemo(() => {
      if (Array.isArray(suggestions) && suggestions.length > 0) {
        const first = suggestions[0];
        if (typeof first === "object" && "name" in first) {
          return (suggestions as Tag[]).map((s) => s.name);
        }
      }
      return suggestions as string[];
    }, [suggestions]);

    const filtered = useMemo(() => {
      const q = input.trim().toLowerCase();
      if (q.length < 1) return [];
      return suggestionStrings
        .filter((s) => s.toLowerCase().includes(q))
        .filter((s) => !tags.some((t) => t.name.toLowerCase() === s.toLowerCase()));
    }, [input, suggestionStrings, tags]);

    const addTag = useCallback(
      (value: string) => {
        const v = value.trim();
        if (!v) return;
        // validations
        if (tags.length >= maxTags) {
          const msg = `Maximum of ${maxTags} tags allowed`;
          setValidationError(msg);
          onInvalid?.(msg);
          localRef.current?.focus();
          return;
        }
        if (v.length < minLength) {
          const msg = `Tag must be at least ${minLength} character${minLength > 1 ? "s" : ""}`;
          setValidationError(msg);
          onInvalid?.(msg);
          return;
        }
        if (v.length > maxLength) {
          const msg = `Tag must be at most ${maxLength} characters`;
          setValidationError(msg);
          onInvalid?.(msg);
          return;
        }
        if (pattern && !pattern.test(v)) {
          const msg = `Tag contains invalid characters`;
          setValidationError(msg);
          onInvalid?.(msg);
          return;
        }
        if (tags.some((t) => t.name.toLowerCase() === v.toLowerCase())) {
          const msg = `Tag "${v}" was already added`;
          setValidationError(msg);
          onInvalid?.(msg);
          // keep the input focused so the user sees the error and can correct
          localRef.current?.focus();
          return;
        }

        // Find matching suggestion object to get the ID, fallback to timestamp
        let tagId: string | number = Date.now();
        if (Array.isArray(suggestions) && suggestions.length > 0) {
          const first = suggestions[0];
          if (typeof first === "object" && "name" in first) {
            const matchedSuggestion = (suggestions as Tag[]).find(
              (s) => s.name.toLowerCase() === v.toLowerCase()
            );
            if (matchedSuggestion) {
              tagId = matchedSuggestion.id;
            }
          }
        }

        const newTag: Tag = { id: tagId, name: v };
        const updated = [...tags, newTag];
        setTags(updated);
        onChange?.(updated);
        setInput("");
        setActiveIndex(0);
        // clear validation if any
        setValidationError(null);
      },
      [tags, onChange, maxTags, minLength, maxLength, pattern, onInvalid, suggestions]
    );

    const removeTag = useCallback(
      (id: string | number) => {
        const updated = tags.filter((t) => String(t.id) !== String(id));
        setTags(updated);
        onChange?.(updated);
      },
      [tags, onChange]
    );

    const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, Math.max(0, filtered.length - 1)));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filtered.length > 0) {
          addTag(filtered[activeIndex]);
        } else {
          addTag(input);
        }
      } else if (e.key === "Backspace" && !input) {
        const newTags = tags.slice(0, -1);
        setTags(newTags);
        onChange?.(newTags);
      } else if (e.key === "Escape") {
        setFocused(false);
      }
    };

    // clear validation on input change
    React.useEffect(() => {
      if (validationError && input.length > 0) setValidationError(null);
    }, [input]);

    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            {label}
          </label>
        )}

        {helperText && (
          <p className="text-xs text-gray-500 mb-3">{helperText}</p>
        )}

        <div className="relative">
          <div
            className={`min-h-[56px] w-full border rounded-sm bg-white px-3 py-2 flex flex-wrap items-center gap-2 transition-shadow ${
              (apiErr || error || validationError)
                ? "border-red-500 ring-1 ring-red-500"
                : focused
                ? "ring-2 ring-primary border-primary"
                : "border-gray-200"
            }`}
            onClick={() => localRef.current?.focus()}
          >
            {tags.length === 0 && (
              <span className="text-sm text-gray-400">{placeholder}</span>
            )}

            {tags.map((t) => (
              <span
                key={t.id}
                className="inline-flex items-center gap-2 bg-primary/700 border border-primary/500 text-primary px-3 py-1 rounded-full text-sm"
              >
                <span>{t.name}</span>
                <button
                  type="button"
                  aria-label={`Remove ${t.name}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTag(t.id);
                  }}
                  className="-mr-1 ml-1 inline-flex items-center justify-center w-5 h-5 rounded-full hover:bg-teal-100 transition-colors"
                >
                  ✕
                </button>
              </span>
            ))}

            <input
              ref={inputRef}
              name={name}
              value={input}
              onChange={(e) => {
                handleInputChange();
                setInput(e.target.value);
                setActiveIndex(0);
              }}
              onKeyDown={onKeyDown}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 120)}
              placeholder={tags.length === 0 ? "" : "Add another..."}
              className="flex-1 min-w-[120px] bg-transparent outline-none text-sm py-2 px-1"
              aria-label={label ? `${label} input` : "Add a tag"}
            />
          </div>

          {/* Suggestions dropdown - absolute positioned to avoid layout shift */}
          {focused && input.trim().length >= 1 && filtered.length > 0 && (
            <ul
              role="listbox"
              aria-label="Tag suggestions"
              className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-44 overflow-auto"
            >
              {filtered.map((s, idx) => (
                <li
                  key={s}
                  role="option"
                  aria-selected={idx === activeIndex}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    addTag(s);
                  }}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`px-4 py-2 text-sm cursor-pointer transition-colors ${
                    idx === activeIndex ? "bg-gray-100" : "hover:bg-gray-50"
                  }`}
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>

        {(apiErr || error || validationError) && (
          <p className="text-xs text-red-500 mt-2" role="alert" aria-live="polite">
            {validationError ?? apiErr ?? error}
          </p>
        )}
      </div>
    );
  }
);

TagsInput.displayName = "TagsInput";
