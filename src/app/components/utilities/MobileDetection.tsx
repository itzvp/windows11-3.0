// "use client";
// import { useEffect } from "react";

// const MobileDetection = ({ onDetectMobile }) => {
//   useEffect(() => {
//     const checkIfMobile = () => {
//       const userAgent = navigator.userAgent || navigator.vendor || window.opera;
//       if (
//         /android/i.test(userAgent) ||
//         (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream)
//       ) {
//         onDetectMobile(true);
//       } else {
//         onDetectMobile(false);
//       }
//     };

//     checkIfMobile();
//   }, [onDetectMobile]);

//   return null;
// };

// export default MobileDetection;

"use client";
import { useEffect } from "react";

// Extend the Window interface to include custom properties
interface Window {
  opera: any; // Declare opera property
  MSStream: any; // Declare MSStream property
}

interface MobileDetectionProps {
  onDetectMobile: (isMobile: boolean) => void; // Define the type for the prop
}

const MobileDetection: React.FC<MobileDetectionProps> = ({
  onDetectMobile,
}) => {
  useEffect(() => {
    const checkIfMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      if (
        /android/i.test(userAgent) ||
        (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream)
      ) {
        onDetectMobile(true);
      } else {
        onDetectMobile(false);
      }
    };

    checkIfMobile();
  }, [onDetectMobile]);

  return null; // No UI to render
};

export default MobileDetection;
