import logo from "../../assets/logo/logoHIDE.png";

const InitialLoader = ({ visible }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-opacity duration-700 ease-out ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!visible}
      style={{
        background:
          "radial-gradient(circle at top, rgba(255,255,255,0.08), transparent 32%), linear-gradient(180deg, #2e2925 0%, #1f1d1a 100%)",
      }}
    >
      <div className="absolute inset-0 opacity-20" />
      <div className="relative flex flex-col items-center gap-5 px-6 text-center">
        <img
          src={logo}
          alt="HIDE"
          className="w-[116px] sm:w-[138px] lg:w-[150px] select-none"
          draggable="false"
        />
        <div className="space-y-2">
          <p
            className="text-[11px] sm:text-xs tracking-[0.35em] uppercase text-white/70"
            style={{ fontFamily: "var(--font-family-geist)" }}
          >
            Curating your moment
          </p>
          <p
            className="text-[16px] sm:text-[18px] text-white/90"
            style={{ fontFamily: "var(--font-family-cormorant)", fontWeight: 600 }}
          >
            Loading the HIDE experience
          </p>
        </div>

        <div className="w-[150px] sm:w-[190px] h-px bg-white/15 overflow-hidden rounded-full">
          <div
            className="h-full w-[45%] bg-white/80 rounded-full"
            style={{
              animation: "loader-sweep 1.1s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes loader-sweep {
          0% {
            transform: translateX(-120%);
          }
          50% {
            transform: translateX(70%);
          }
          100% {
            transform: translateX(220%);
          }
        }
      `}</style>
    </div>
  );
};

export default InitialLoader;
