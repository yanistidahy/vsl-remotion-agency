import React from "react";

type MacBookProps = {
  screenContent?: React.ReactNode;
  screenOpacity?: number;
  scale?: number;
};

export const MacBook: React.FC<MacBookProps> = ({
  screenContent,
  screenOpacity = 1,
  scale = 1,
}) => {
  return (
    <div
      style={{
        transform: `scale(${scale})`,
        transformOrigin: "center center",
        position: "relative",
        width: 900,
        height: 620,
      }}
    >
      {/* Lid / Screen half */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 900,
          height: 520,
        }}
      >
        {/* Outer bezel */}
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(180deg, #d1d1d1 0%, #b8b8b8 100%)",
            borderRadius: "16px 16px 0 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 -4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.6)",
          }}
        >
          {/* Screen inner */}
          <div
            style={{
              width: 820,
              height: 460,
              background: "#000",
              borderRadius: 8,
              overflow: "hidden",
              boxShadow: "inset 0 0 30px rgba(0,0,0,0.8)",
              position: "relative",
            }}
          >
            {/* Webcam dot */}
            <div
              style={{
                position: "absolute",
                top: 6,
                left: "50%",
                transform: "translateX(-50%)",
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#1a1a1a",
                zIndex: 10,
              }}
            />
            {/* Screen content */}
            <div
              style={{
                width: "100%",
                height: "100%",
                opacity: screenOpacity,
                background: "#fff",
                overflow: "hidden",
              }}
            >
              {screenContent}
            </div>
          </div>
        </div>
        {/* Apple logo area */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 40,
            height: 50,
            opacity: 0.15,
          }}
        >
          <svg viewBox="0 0 814 1000" width={40} fill="#fff">
            <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 135.4-317.3 268.9-317.3 71 0 130.1 46.4 174.4 46.4 42.7 0 109.2-49.1 185.9-49.1 14.9 0 108.2 1.3 169.3 57.3zM549.8 100.5c31.7-37.9 54.3-91.2 54.3-144.5 0-7.7-.6-15.5-1.9-21.6-51.6 1.9-112.4 34.5-149.4 77.5-28.4 32.3-55.1 85.6-55.1 139.6 0 8.4 1.3 16.7 1.9 19.5 3.2.6 8.4 1.3 13.6 1.3 46.5 0 105.1-31.1 136.6-71.8z" />
          </svg>
        </div>
      </div>

      {/* Hinge bar */}
      <div
        style={{
          position: "absolute",
          top: 518,
          left: 0,
          width: 900,
          height: 8,
          background: "linear-gradient(180deg, #a0a0a0, #888)",
          borderRadius: "0 0 2px 2px",
        }}
      />

      {/* Bottom / Keyboard half */}
      <div
        style={{
          position: "absolute",
          top: 526,
          left: 0,
          width: 900,
          height: 94,
          background: "linear-gradient(180deg, #c8c8c8 0%, #b0b0b0 100%)",
          borderRadius: "0 0 12px 12px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 10,
        }}
      >
        {/* Keyboard rows */}
        {[0, 1, 2].map((row) => (
          <div key={row} style={{ display: "flex", gap: 3, marginBottom: 3 }}>
            {Array.from({ length: row === 0 ? 14 : row === 1 ? 13 : 12 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: row === 2 && i === 6 ? 80 : 28,
                  height: 16,
                  background: "linear-gradient(180deg, #d8d8d8, #c0c0c0)",
                  borderRadius: 3,
                  boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
                }}
              />
            ))}
          </div>
        ))}
        {/* Trackpad */}
        <div
          style={{
            width: 200,
            height: 28,
            background: "linear-gradient(180deg, #c0c0c0, #b0b0b0)",
            borderRadius: 6,
            marginTop: 4,
            boxShadow: "inset 0 1px 3px rgba(0,0,0,0.2)",
          }}
        />
      </div>
    </div>
  );
};
