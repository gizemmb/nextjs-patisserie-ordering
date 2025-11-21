import React, { forwardRef } from "react";

const Input = forwardRef((props,ref) => {
      const {type,placeholder, ...inputs} = props;
  return (
    <div className="w-full">
      <label className="relative block cursor-text w-full">
        <input
        ref={ref}
          type={type}
          className={`text-primary-dark h-14 w-full border border-primary outline-none px-4 peer ${type !== "datetime-local" && "pt-2"}`}
          required
          {...inputs}
         
        />
        {type !== "datetime-local" && (<span className="text-primary-light absolute flex h-full top-0 left-0 items-center text-sm px-4  peer-focus:h-7 peer-focus:text-xs peer-valid:text-xs peer-valid:h-7 transition-all">
          {placeholder}
        </span>)}
      </label>
    </div>
  );
});
Input.displayName = "Input";

export default Input;
