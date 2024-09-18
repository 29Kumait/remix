import React from "react";

interface Data {
  children: React.ReactNode;
}

export const BackStand: React.FC<Data> = ({ children }) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 sm:p-12">
      <div className="w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <ul className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:space-x-6 border-b border-gray-300 bg-gray-800 bg-opacity-60 shadow-2xl backdrop-blur-lg p-6 lg:rounded-2xl lg:border lg:shadow-3xl lg:dark:bg-gray-900/30 transition-transform duration-300 ease-in-out">
          {children}
        </ul>
      </div>
    </main>
  );
};

export const ArrowsBackground: React.FC<Data> = ({ children }) => {
  return (
    <div className="relative w-full h-full">
      {/* Static background shapes */}
      <div className="absolute inset-0 bg-color5 z-0">
        <div className="absolute w-[150px] h-[150px] bg-color20 top-[15%] left-[20%] rotate-45 opacity-70 transform hover:scale-110 transition duration-500 ease-in-out"></div>
        <div className="absolute w-[250px] h-[100px] bg-color2 top-[40%] right-[10%] rotate-12 opacity-80 transform hover:rotate-3 hover:scale-105 transition duration-500 ease-in-out"></div>
        <div className="absolute w-[180px] h-[180px] bg-color15 bottom-[25%] left-[10%] rotate-12 opacity-75 transform hover:scale-110 transition duration-500 ease-in-out"></div>
      </div>

      {/* Parallax effect */}
      <div
        className="absolute inset-0 z-0 overflow-hidden"
        style={{ perspective: "1000px" }}
      >
        <div className="absolute w-[100px] h-[100px] bg-color12 rounded-lg top-[10%] left-[5%] transform rotate-12 translate-z-1 animate-bounce"></div>
        <div className="absolute w-[300px] h-[300px] bg-color9 rounded-lg top-[50%] left-[60%] transform rotate-3 translate-z-1"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-6">{children}</div>
    </div>
  );
};

export const FrameBackground: React.FC<Data> = ({ children }) => {
  const layers = [
    {
      color: "rgba(0,130,153,0.1)",
      top: "6rem",
      left: "6rem",
      size: "calc(100% - 12rem)",
    },
    {
      color: "rgba(93,230,255,0.9)",
      top: "7rem",
      left: "7rem",
      size: "calc(100% - 14rem)",
    },
    {
      color: "rgba(50,173,230,0.4)",
      top: "8rem",
      left: "8rem",
      size: "calc(100% - 16rem)",
    },
    {
      color: "rgba(100,210,255,0.6)",
      top: "9rem",
      left: "9rem",
      size: "calc(100% - 18rem)",
    },
    { color: "rgba(0,199,190,0.5)", top: "0rem", left: "0rem", size: "100%" },
    {
      color: "rgba(99,230,226,0.8)",
      top: "1rem",
      left: "1rem",
      size: "calc(100% - 2rem)",
    },
    {
      color: "rgba(12,129,123,0.2)",
      top: "2rem",
      left: "2rem",
      size: "calc(100% - 4rem)",
    },
    {
      color: "rgba(102,212,207,1)",
      top: "3rem",
      left: "3rem",
      size: "calc(100% - 6rem)",
    },
    {
      color: "rgba(48,176,199,0.3)",
      top: "4rem",
      left: "4rem",
      size: "calc(100% - 8rem)",
    },
    {
      color: "rgba(64,200,224,0.7)",
      top: "5rem",
      left: "5rem",
      size: "calc(100% - 10rem)",
    },
  ];

  return (
    <div className="relative w-full h-full">
      {/* Background layers */}
      <div className="absolute inset-0 z-0">
        {layers.map((layer, index) => (
          <div
            key={index}
            className="absolute"
            style={{
              top: layer.top,
              left: layer.left,
              width: layer.size,
              height: layer.size,
              backgroundColor: layer.color,
              zIndex: layers.length - index,
            }}
          ></div>
        ))}
      </div>

      {/* Content inside the section */}
      <div className="relative z-10 p-6">{children}</div>
    </div>
  );
};

export const BackgroundMultipleChoice: React.FC<Data> = ({ children }) => {
  return (
    <div className="relative w-full h-full">
      {/* Random floating shapes as background */}
      <div className="absolute inset-0 z-0">
        {/* Floating circles */}
        <div className="absolute w-[200px] h-[200px] bg-customRed1 rounded-full opacity-80 top-[10%] left-[15%]"></div>
        <div className="absolute w-[150px] h-[150px] bg-customRed2 rounded-full opacity-70 top-[50%] left-[40%]"></div>
        <div className="absolute w-[250px] h-[250px] bg-customMaroon1 rounded-full opacity-90 top-[30%] left-[70%]"></div>
        <div className="absolute w-[180px] h-[180px] bg-customPink1 rounded-full opacity-60 top-[65%] left-[20%]"></div>
        <div className="absolute w-[220px] h-[220px] bg-customMaroon2 rounded-full opacity-90 top-[85%] left-[60%]"></div>

        {/* Floating rectangles */}
        <div className="absolute w-[300px] h-[150px] bg-customOrangeRed1 rounded-lg opacity-80 top-[20%] right-[10%] rotate-12"></div>
        <div className="absolute w-[200px] h-[100px] bg-customOrangeRed2 rounded-lg opacity-70 top-[60%] right-[35%] rotate-6"></div>
        <div className="absolute w-[180px] h-[90px] bg-customDarkRed rounded-lg opacity-90 top-[75%] right-[5%] rotate-3"></div>
        <div className="absolute w-[280px] h-[120px] bg-customPink2 rounded-lg opacity-60 top-[35%] right-[55%] rotate-8"></div>
      </div>

      {/* Main content, ensuring it's above the background */}
      <div className="relative z-10 p-6">{children}</div>
    </div>
  );
};
export const Background: React.FC<Data> = ({ children }) => {
  return (
    <div className="relative w-full h-screen flex justify-center items-center">
      {/* Outer background div */}
      <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,199,190,0.5)] z-10">
        {/* Nested div 1 */}
        <div className="absolute top-4 left-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] bg-[rgba(99,230,226,0.8)] z-9">
          {/* Nested div 2 */}
          <div className="absolute top-4 left-4 w-[calc(100%-4rem)] h-[calc(100%-4rem)] bg-[rgba(12,129,123,0.2)] z-8">
            {/* Nested div 3 */}
            <div className="absolute top-4 left-4 w-[calc(100%-6rem)] h-[calc(100%-6rem)] bg-[rgba(102,212,207,1)] z-7">
              {/* Nested div 4 */}
              <div className="absolute top-4 left-4 w-[calc(100%-8rem)] h-[calc(100%-8rem)] bg-[rgba(48,176,199,0.3)] z-6">
                {/* Nested div 5 */}
                <div className="absolute top-4 left-4 w-[calc(100%-10rem)] h-[calc(100%-10rem)] bg-[rgba(64,200,224,0.7)] z-5">
                  {/* Nested div 6 */}
                  <div className="absolute top-4 left-4 w-[calc(100%-12rem)] h-[calc(100%-12rem)] bg-[rgba(0,130,153,0.1)] z-4">
                    {/* Nested div 7 */}
                    <div className="absolute top-4 left-4 w-[calc(100%-14rem)] h-[calc(100%-14rem)] bg-[rgba(93,230,255,0.9)] z-3">
                      {/* Nested div 8 */}
                      <div className="absolute top-4 left-4 w-[calc(100%-16rem)] h-[calc(100%-16rem)] bg-[rgba(50,173,230,0.4)] z-2">
                        {/* Nested div 9 */}
                        <div className="absolute top-4 left-4 w-[calc(100%-18rem)] h-[calc(100%-18rem)] bg-[rgba(100,210,255,0.6)] z-1">
                          {/* Content in the middle */}
                          <div className="relative z-20 p-6 bg-white rounded-lg shadow-lg">
                            {children}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const GlowingOrbBackgroundComponent: React.FC<Data> = ({ children }) => {
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 z-0">
        <div className="absolute w-[300px] h-[300px] bg-customPink2 rounded-full blur-lg opacity-60 top-[15%] left-[10%] animate-pulse"></div>
        <div className="absolute w-[250px] h-[250px] bg-customRed1 rounded-full blur-lg opacity-50 top-[50%] left-[50%] animate-pulse"></div>
        <div className="absolute w-[400px] h-[400px] bg-customOrangeRed1 rounded-full blur-lg opacity-40 bottom-[5%] right-[20%] animate-pulse"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-6">{children}</div>
    </div>
  );
};
export const TransparentShapeBackgroundComponent: React.FC<Data> = ({
  children,
}) => {
  return (
    <div className="relative w-full h-full">
      {/* Light/Dark mode background */}
      <div className="absolute inset-0 bg-white dark:bg-gray-900 transition-all duration-500 z-0"></div>

      {/* Semi-transparent shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-[300px] h-[300px] bg-pink-200 dark:bg-pink-800 opacity-60 dark:opacity-80 top-[10%] left-[15%] rounded-full blur-lg"></div>
        <div className="absolute w-[250px] h-[250px] bg-blue-200 dark:bg-blue-800 opacity-40 dark:opacity-60 top-[50%] left-[50%] rounded-lg"></div>

        {/* Special shape that becomes visible in dark mode */}
        <div className="absolute w-[200px] h-[200px] bg-yellow-200 dark:bg-yellow-500 opacity-0 dark:opacity-100 top-[70%] left-[20%] rounded-full blur-xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-6">{children}</div>
    </div>
  );
};

export const NewCreativeBackground: React.FC<Data> = ({ children }) => {
  return (
    <div className="relative w-full h-full">
      {/* Soft gradient background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 via-blue-400 to-green-300 dark:from-gray-900 dark:via-blue-800 dark:to-teal-600 z-0"></div>

      {/* Layered geometric and organic shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Floating geometric shapes */}
        <div className="absolute w-[300px] h-[300px] bg-purple-200 rounded-full blur-xl opacity-70 top-[15%] left-[10%] dark:bg-purple-600"></div>
        <div className="absolute w-[200px] h-[200px] bg-blue-300 rounded-lg opacity-50 top-[50%] left-[60%] rotate-12 dark:bg-blue-700"></div>

        {/* Organic swirling shapes */}
        <div className="absolute w-[350px] h-[350px] bg-green-400 rounded-full opacity-40 top-[75%] left-[30%] blur-lg animate-spin-slow dark:bg-teal-600"></div>
        <div className="absolute w-[180px] h-[180px] bg-teal-200 rounded-full opacity-60 top-[25%] right-[5%] blur-lg animate-bounce dark:bg-teal-500"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 p-8 bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-80 rounded-xl shadow-2xl">
        {children}
      </div>
    </div>
  );
};

export const GradientFlowBackgroundComponent: React.FC<Data> = ({
  children,
}) => {
  return (
    <div className="relative w-full h-full">
      {/* Softer gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-customRed1 via-customPink1 to-customOrangeRed1 opacity-70 z-0"></div>

      {/* Floating shapes with improved lighter touch */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Floating large circles */}
        <div className="absolute w-[200px] h-[200px] bg-customRed1 rounded-full opacity-50 top-[10%] left-[15%] animate-floating"></div>
        <div className="absolute w-[150px] h-[150px] bg-customOrangeRed2 rounded-full opacity-40 top-[40%] left-[60%] animate-floating"></div>

        {/* Animated squares */}
        <div className="absolute w-[150px] h-[150px] bg-customPink1 opacity-50 top-[20%] right-[20%] rotate-12 animate-floating-slow"></div>
        <div className="absolute w-[200px] h-[200px] bg-customMaroon1 opacity-40 bottom-[15%] right-[10%] rotate-3 animate-floating-slow"></div>
      </div>

      {/* Main content with a brighter surface layer */}
      <div className="relative z-10 p-6 bg-white bg-opacity-80 rounded-lg shadow-lg">
        {children}
      </div>
    </div>
  );
};
//
// export const Layers: React.FC<Data> = ({ children }) => {
//   const colors = [
//     "bg-color1",
//     "bg-color2",
//     "bg-color3",
//     "bg-color4",
//     "bg-color5",
//     "bg-color6",
//     "bg-color7",
//     "bg-color8",
//     "bg-color9",
//     "bg-color10",
//     "bg-color11",
//     "bg-color12",
//     "bg-color13",
//     "bg-color14",
//     "bg-color15",
//     "bg-color16",
//     "bg-color17",
//     "bg-color18",
//     "bg-color19",
//     "bg-color20",
//   ];
//
//   return (
//     <div className="relative w-full h-screen flex justify-center items-center">
//       <ul>
//         {colors.map((color, index) => (
//           <div
//             key={index}
//             className={`absolute w-[calc(100%-${index * 10}px)] h-[calc(100%-${
//               index * 10
//             }px)] ${color} transition-transform duration-300 ease-in-out`}
//             style={{
//               top: `${index * 5}px`,
//               left: `${index * 5}px`,
//               zIndex: 20 - index,
//             }}
//           ></div>
//         ))}
//
//         <>{children}</>
//       </ul>
//     </div>
//   );
// };
//
// export const NestedBackgroundComponent: React.FC = () => {
//   return (
//     <div className="relative w-full h-screen flex justify-center items-center">
//       <div
//         className="absolute top-0 left-0 w-full h-full bg-color1"
//         style={{ zIndex: 20, backgroundColor: "rgba(0, 199, 190, 0.5)" }}
//       ></div>
//       <div
//         className="absolute top-4 left-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] bg-color2"
//         style={{ zIndex: 19, backgroundColor: "rgba(99, 230, 226, 0.8)" }}
//       ></div>
//       <div
//         className="absolute top-8 left-8 w-[calc(100%-4rem)] h-[calc(100%-4rem)] bg-color3"
//         style={{ zIndex: 18, backgroundColor: "rgba(12, 129, 123, 0.2)" }}
//       ></div>
//       <div
//         className="absolute top-12 left-12 w-[calc(100%-6rem)] h-[calc(100%-6rem)] bg-color4"
//         style={{ zIndex: 17, backgroundColor: "rgba(102, 212, 207, 1)" }}
//       ></div>
//       <div
//         className="absolute top-16 left-16 w-[calc(100%-8rem)] h-[calc(100%-8rem)] bg-color5"
//         style={{ zIndex: 16, backgroundColor: "rgba(48, 176, 199, 0.3)" }}
//       ></div>
//       <div
//         className="absolute top-20 left-20 w-[calc(100%-10rem)] h-[calc(100%-10rem)] bg-color6"
//         style={{ zIndex: 15, backgroundColor: "rgba(64, 200, 224, 0.7)" }}
//       ></div>
//       <div
//         className="absolute top-24 left-24 w-[calc(100%-12rem)] h-[calc(100%-12rem)] bg-color7"
//         style={{ zIndex: 14, backgroundColor: "rgba(0, 130, 153, 0.1)" }}
//       ></div>
//       <div
//         className="absolute top-28 left-28 w-[calc(100%-14rem)] h-[calc(100%-14rem)] bg-color8"
//         style={{ zIndex: 13, backgroundColor: "rgba(93, 230, 255, 0.9)" }}
//       ></div>
//       <div
//         className="absolute top-32 left-32 w-[calc(100%-16rem)] h-[calc(100%-16rem)] bg-color9"
//         style={{ zIndex: 12, backgroundColor: "rgba(50, 173, 230, 0.4)" }}
//       ></div>
//       <div
//         className="absolute top-36 left-36 w-[calc(100%-18rem)] h-[calc(100%-18rem)] bg-color10"
//         style={{ zIndex: 11, backgroundColor: "rgba(100, 210, 255, 0.6)" }}
//       ></div>
//     </div>
//   );
// };

//
//

export const BackgroundComponent: React.FC<Data> = ({ children }) => {
  return (
    <div className="relative w-full h-screen flex justify-center items-center">
      {/* First background layer */}
      <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,199,190,0.5)] z-10"></div>

      {/* Second background layer */}
      <div className="absolute top-4 left-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] bg-[rgba(99,230,226,0.8)] z-9"></div>

      {/* Third background layer */}
      <div className="absolute top-8 left-8 w-[calc(100%-4rem)] h-[calc(100%-4rem)] bg-[rgba(12,129,123,0.2)] z-8"></div>

      {/* Fourth background layer */}
      <div className="absolute top-12 left-12 w-[calc(100%-6rem)] h-[calc(100%-6rem)] bg-[rgba(102,212,207,1)] z-7"></div>

      {/* Fifth background layer */}
      <div className="absolute top-16 left-16 w-[calc(100%-8rem)] h-[calc(100%-8rem)] bg-[rgba(48,176,199,0.3)] z-6"></div>

      {/* Sixth background layer */}
      <div className="absolute top-20 left-20 w-[calc(100%-10rem)] h-[calc(100%-10rem)] bg-[rgba(64,200,224,0.7)] z-5"></div>

      {/* Seventh background layer */}
      <div className="absolute top-24 left-24 w-[calc(100%-12rem)] h-[calc(100%-12rem)] bg-[rgba(0,130,153,0.1)] z-4"></div>

      {/* Eighth background layer */}
      <div className="absolute top-28 left-28 w-[calc(100%-14rem)] h-[calc(100%-14rem)] bg-[rgba(93,230,255,0.9)] z-3"></div>

      {/* Ninth background layer */}
      <div className="absolute top-32 left-32 w-[calc(100%-16rem)] h-[calc(100%-16rem)] bg-[rgba(50,173,230,0.4)] z-2"></div>

      {/* Tenth background layer */}
      <div className="absolute top-36 left-36 w-[calc(100%-18rem)] h-[calc(100%-18rem)] bg-[rgba(100,210,255,0.6)] z-1"></div>

      {/* Content (children) in the middle */}
      <div className="relative z-20 p-6 bg-white rounded-lg shadow-lg">
        {children}
      </div>
    </div>
  );
};
