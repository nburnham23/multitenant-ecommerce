import { RefObject } from "react";

export const UseDropdownPosition = (
    ref: RefObject<HTMLDivElement | null> | RefObject<HTMLDivElement>
) => {
    const getDropdownPosition = () =>{
        if(!ref.current) return {top:0, left:0};
        const rect = ref.current.getBoundingClientRect();
        const dropdownWidth = 240; // width of dropdown (w-60 = 150 rem = 240 px )

        // Calculate initial position
        let left = rect.left + window.scrollX;
        const top = rect.bottom + window.scrollY;

        // Check if dropdown would go off the right edge of viewport
        if (left + dropdownWidth > window.innerWidth){
            // align to right edge of button
            left = rect.right + window.scrollX - dropdownWidth;

            // if still off screen, align to right edge of viewport with some padding
            if(left < 0){
                left = window.innerWidth - dropdownWidth - 16;
            }
        }

        // ensure dropdown does't go off left edge
        if (left < 0){
            left = 16;
        }

        return{ top, left };
    };
    return { getDropdownPosition };
};