"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
interface UserProfileProps {
  name: string; // Define the type for the 'name' prop
}

const UserProfile: React.FC<UserProfileProps> = ({ name }) => {
  const [userInitials, setUserInitials] = useState<string>("");

  useEffect(() => {
    if (name) {
      setUserInitials(generateInitials(name));
    }
  }, [name]);

  return (
    <div className="flex items-center justify-center w-36 h-full bg-blue-500 rounded-full text-white text-2xl font-bold select-none">
      {name ? (
        <div className="text-white text-4xl font-normal">{userInitials}</div>
      ) : (
        <div className="avatar">
          <div className="w-24 rounded-full">
            <Image
              src="https://giffiles.alphacoders.com/532/53236.gif"
              alt="Profile"
            />
          </div>
        </div>
      )}
    </div>
  );
};

function generateInitials(name: string): string {
  const words = name.split(" ");
  const initials = words
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
  return initials;
}

export { UserProfile, generateInitials };
