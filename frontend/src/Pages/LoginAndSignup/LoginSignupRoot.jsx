// import React from "react";
// import { useNavigate } from "react-router-dom";
// import FloatingLines from "./FloatingLines";
// import Logo from "../../assets/logo/logoweb.png";

// const LoginSignupRoot = () => {
//   const navigate = useNavigate();

//   return (
//     <div>
//       {/* ✅ Floating Lines Background */}
//       <div className="absolute inset-0 z-0">
//         <FloatingLines
//           enabledWaves={["top", "middle", "bottom"]}
//           lineCount={[6, 6, 6]}
//           lineDistance={[4, 4, 4]}
//           bendRadius={5.0}
//           bendStrength={-0.5}
//           interactive={true}
//           parallax={true}
//           mixBlendMode="screen"
//         />
//       </div>

//       <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-6xl">
//         <div
//           className="flex items-center justify-between px-8 py-4 rounded-full
//           bg-gray-900 backdrop-blur-xl border border-white/20 shadow-lg"
//         >
//           {/* ✅ Logo Image Replacement */}
//           <div className="flex items-center">
//             <img
//               src={Logo}
//               alt="TechGenie Logo"
//               className="h-8 w-auto object-contain"
//             />
//           </div>

//           <div className="flex gap-8 text-sm text-gray-200 font-mono">
//             <a href="/" className="hover:text-white transition">
//               ./home
//             </a>
//             <a href="/" className="hover:text-white transition">
//               ./docs
//             </a>
//           </div>
//         </div>
//       </nav>

//       <div className="relative z-10 flex items-center justify-center min-h-screen text-center">
//         <div className="max-w-3xl px-6">
//           {/* ✅ Tech-type Main Heading */}
//           <h1 className="text-4xl md:text-5xl font-mono font-bold text-white leading-tight mb-4 tracking-tight">
//             &gt; TechGenie_
//           </h1>

//           <h2 className="text-4xl md:text-5xl font-mono font-bold text-white leading-tight mb-6 uppercase tracking-widest">
//             Intelligent_Conversations
//           </h2>

//           {/* ✅ Tech-type Paragraph */}
//           <p className="text-md md:text-lg text-gray-400 max-w-xl mx-auto leading-relaxed font-mono">
//             [STATUS]: Building human-like interactions using neural_AI.
//             <br />
//             [ACTION]: Automate. Support. Scale_Smarter.
//           </p>

//           {/* Buttons */}
//           <div className="flex justify-center gap-4 mt-8">
//             <button
//               onClick={() => navigate("/signup")}
//               className="px-8 py-3 rounded-full bg-gradient-to-r from-sky-400 to-purple-400 text-white font-mono font-bold
//               shadow-lg hover:scale-105 transition uppercase tracking-wider"
//             >
//               Initialize_Start
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginSignupRoot;

import React from "react";
import { useNavigate } from "react-router-dom";
import FloatingLines from "./FloatingLines";
import Logo from "../../assets/logo/logoweb.png";

const LoginSignupRoot = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* ✅ Floating Lines Background */}
      <div className="absolute inset-0 z-0">
        <FloatingLines
          enabledWaves={["top", "middle", "bottom"]}
          lineCount={[6, 6, 6]}
          lineDistance={[4, 4, 4]}
          bendRadius={5.0}
          bendStrength={-0.5}
          interactive={true}
          parallax={true}
          mixBlendMode="screen"
        />
      </div>

      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-6xl">
        <div
          className="flex items-center justify-between px-8 py-4 rounded-full 
          bg-gray-900 backdrop-blur-xl border border-white/20 shadow-lg"
        >
          {/* ✅ Logo properly sized for the navbar */}
          <div className="flex items-center h-full">
            <img
              src={Logo}
              alt="TechGenie Logo"
              className="h-10 w-auto object-contain block"
            />
          </div>

          <div className="flex gap-8 text-sm text-gray-200 font-mono">
            <a href="/" className="hover:text-white transition">
              ./home
            </a>
            <a href="/" className="hover:text-white transition">
              ./docs
            </a>
          </div>
        </div>
      </nav>

      <div className="relative z-10 flex items-center justify-center min-h-screen text-center">
        <div className="max-w-3xl px-6">
          {/* ✅ Tech-type Main Heading */}
          <h1 className="text-4xl md:text-5xl font-mono font-bold text-white leading-tight mb-4 tracking-tight">
            &gt; TechGenie_
          </h1>

          <h2 className="text-4xl md:text-5xl font-mono font-bold text-white leading-tight mb-6 uppercase tracking-widest">
            Intelligent_Conversations
          </h2>

          {/* ✅ Tech-type Paragraph */}
          <p className="text-md md:text-lg text-gray-400 max-w-xl mx-auto leading-relaxed font-mono">
            [STATUS]: Building human-like interactions using neural_AI.
            <br />
            [ACTION]: Automate. Support. Scale_Smarter.
          </p>

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => navigate("/signup")}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-sky-400 to-purple-400 text-white font-mono font-bold
              shadow-lg hover:scale-105 transition uppercase tracking-wider"
            >
              Initialize_Start
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupRoot;
