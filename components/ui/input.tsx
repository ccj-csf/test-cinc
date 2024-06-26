import * as React from "react";

import { cs } from "@/utils";

export interface InputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

// <textarea class="border w-full rounded-lg p-2 min-h-80" placeholder="请输入文本内容"></textarea>
const Input = React.forwardRef<HTMLTextAreaElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cs(
          "flex h-50 w-full font-500 rounded-md border border-input bg-background p-4  text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
