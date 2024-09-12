"use client";
import React, { useState, MouseEvent } from "react";

// Define the props for the MenuItem component
interface MenuItemProps {
  text: string;
  onClick?: () => void;
  showArrow?: boolean;
}

// MenuItem component
const MenuItem: React.FC<MenuItemProps> = ({
  text,
  onClick,
  showArrow = false,
}) => (
  <div
    className="hover:bg-neutral-700 rounded-md whitespace-nowrap w-full h-7 select-none flex items-center justify-between px-1"
    onClick={onClick}
  >
    <div className="justify-center">{text}</div>
    {showArrow && (
      <div className="material-symbols-outlined rotate-[-90deg] justify-end opacity-50 font-extralight">
        expand_more
      </div>
    )}
  </div>
);

// Define the props for the RightClick component
interface RightClickProps {
  option?: boolean; // Option prop is optional and can be boolean
}

const RightClick: React.FC<RightClickProps> = ({ option }) => {
  // Define the state types
  const [contextMenuPosition, setContextMenuPosition] = useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });
  const [showContextMenu, setShowContextMenu] = useState<boolean>(false);

  // Handle the context menu opening
  const handleContextMenu = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const x = event.clientX;
    const y = event.clientY;
    const menuWidth = 240;
    const menuHeight = 290;

    const newX =
      x + menuWidth > window.innerWidth ? window.innerWidth - menuWidth : x;
    const newY =
      y + menuHeight > window.innerHeight ? window.innerHeight - menuHeight : y;

    setContextMenuPosition({ x: newX, y: newY });
    setShowContextMenu(true);
  };

  // Handle clicking outside the context menu to close it
  const handleClick = () => {
    setShowContextMenu(false);
  };

  return (
    <div>
      {showContextMenu && (
        <div
          className="context-menu z-10 menu p-2 shadow rounded-xl bg-neutral-800 border-neutral-700 border-2 absolute"
          style={{ left: contextMenuPosition.x, top: contextMenuPosition.y }}
          role="menu"
          aria-labelledby="context-menu"
        >
          <div className="w-[15rem] text-gray-300">
            {option ? (
              <>
                <MenuItem text="View" showArrow />
                <MenuItem text="Sort by" showArrow />
                <MenuItem text="Refresh" onClick={handleClick} />
                <div className="divider m-0"></div>
                <MenuItem text="New" showArrow />
                <div className="divider m-0"></div>
                <MenuItem text="Display Settings" />
                <MenuItem text="Personalize" />
                <MenuItem text="Show More Options" />
              </>
            ) : (
              <>
                <MenuItem text="Meow" showArrow />
                <MenuItem text="Meow" showArrow />
                <MenuItem text="Meow" onClick={handleClick} />
                <div className="divider m-0"></div>
                <MenuItem text="Meow" showArrow />
                <div className="divider m-0"></div>
                <MenuItem text="Meow" />
                <MenuItem text="Meow" />
                <MenuItem text="Meow" />
              </>
            )}
          </div>
        </div>
      )}

      <div
        id="content"
        onContextMenu={handleContextMenu}
        onClick={handleClick}
        className="w-full h-full"
      ></div>
    </div>
  );
};

export default RightClick;
