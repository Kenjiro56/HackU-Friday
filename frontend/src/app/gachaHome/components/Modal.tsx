// Modal.tsx
import React from 'react';

interface ModalProps {
  data: any;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ data, onClose }) => {
  const playSound = () => {
    const audio = new Audio("/sounds/openSound2.mp3");
    audio.play();
  };
  return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
      {playSound()}
      {/* 背景のオーバーレイ */}
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>

      {/* モーダル本体 */}
      <div className="relative flex flex-col items-center justify-center z-10">
        {/* SVGを背景に配置 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            width = "350"
            height = "341"
            viewBox="0 0 350 341"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: "scale(1.5)" }}
          >
            {/* SVGパス (背景のトゲトゲデザイン) */}
            <path
              d="M346.829 164.804L313.342 143.848C313.038 143.657 312.763 143.444 312.499 143.214C312.016 142.794 311.606 142.317 311.269 141.796C311.078 141.498 310.898 141.19 310.758 140.865C310.583 140.466 310.449 140.057 310.353 139.637C310.258 139.216 310.201 138.784 310.185 138.352C310.162 137.702 310.235 137.046 310.409 136.406C310.583 135.767 310.848 135.139 311.224 134.55L332.301 101.195C333.273 99.659 333.526 97.943 333.223 96.3616C333.2 96.2495 333.172 96.1373 333.144 96.0252C332.897 95.0158 332.419 94.0625 331.751 93.2662C331.487 92.9521 331.189 92.6717 330.869 92.4082C329.908 91.6175 328.717 91.0735 327.341 90.9221L288.079 86.5986C286.225 86.3967 284.63 85.4546 283.551 84.1087C282.472 82.7573 281.911 80.9964 282.124 79.1459L286.613 39.9534C286.703 39.1852 286.658 38.4393 286.506 37.7384C286.203 36.3364 285.455 35.114 284.433 34.1943C283.821 33.6447 283.113 33.2017 282.338 32.9045C281.562 32.6017 280.731 32.4447 279.866 32.4503C279.147 32.4559 278.411 32.5793 277.681 32.8372L240.385 45.9032C236.868 47.1369 233.014 45.2808 231.784 41.7647L218.768 4.45647C217.099 -0.186734 211.145 -1.52138 207.65 1.98346L179.781 29.938C178.461 31.2614 176.731 31.9232 175 31.9175C173.27 31.9175 171.534 31.2558 170.22 29.938L142.333 1.98907C138.839 -1.51577 132.884 -0.181127 131.216 4.46208L118.2 41.7703C116.975 45.2864 113.121 47.1369 109.599 45.9088L72.3033 32.8428C71.719 32.6353 71.1292 32.5176 70.5505 32.4727C70.4045 32.4615 70.264 32.4559 70.118 32.4559C69.3989 32.4503 68.7023 32.5568 68.0394 32.7699C67.7754 32.854 67.517 32.955 67.2698 33.0671C66.7698 33.297 66.298 33.5887 65.871 33.9307C65.5508 34.1887 65.2531 34.4747 64.9778 34.7831C64.8879 34.884 64.798 34.9906 64.7138 35.1027C64.2924 35.6467 63.9554 36.2579 63.7138 36.9253C63.3824 37.8505 63.2475 38.8767 63.3711 39.959L67.8597 79.1515C68.0731 81.002 67.5114 82.7629 66.4328 84.1143C65.3542 85.4658 63.7588 86.4023 61.9049 86.6042L22.6428 90.9277C21.7159 91.0287 20.8677 91.3091 20.1205 91.7184C19.7554 91.9203 19.4295 92.1558 19.1149 92.4138C18.7947 92.6773 18.497 92.9577 18.233 93.2718C18.1712 93.3447 18.1206 93.4176 18.0644 93.4905C17.7049 93.9559 17.4072 94.4662 17.1824 95.0046C17.042 95.3354 16.924 95.6775 16.8398 96.0308C16.7555 96.3785 16.6881 96.7261 16.66 97.085C16.5476 98.4589 16.8566 99.8945 17.6824 101.207L38.76 134.562C39.1308 135.15 39.4004 135.778 39.5746 136.418C39.7431 137.057 39.8161 137.713 39.7993 138.364C39.7824 138.795 39.7319 139.227 39.6308 139.648C39.5296 140.068 39.4004 140.478 39.2263 140.876C38.9622 141.47 38.6139 142.031 38.1814 142.53C38.0353 142.698 37.8836 142.861 37.7207 143.012C37.3949 143.321 37.0354 143.601 36.6421 143.848L16.0589 156.729L3.15506 164.804C1.84052 165.628 0.930454 166.795 0.441714 168.085C0.245095 168.6 0.11027 169.139 0.0484755 169.683C-0.0133191 170.227 -0.0189368 170.776 0.0484755 171.32C0.278801 173.227 1.31807 175.049 3.16068 176.199L36.6478 197.155C37.041 197.402 37.4061 197.682 37.7264 197.991C37.8893 198.148 38.0409 198.305 38.187 198.473C38.6196 198.978 38.9679 199.538 39.2319 200.127C39.5802 200.918 39.7768 201.77 39.8049 202.639C39.8274 203.29 39.7543 203.946 39.5802 204.585C39.4678 205.012 39.3105 205.432 39.1027 205.841C39.0016 206.043 38.8892 206.245 38.7656 206.441L17.688 239.796C17.4577 240.161 17.2836 240.537 17.1319 240.912C16.9802 241.288 16.8622 241.675 16.7836 242.056C16.7667 242.152 16.7443 242.247 16.7274 242.342C16.6431 242.875 16.6207 243.402 16.6656 243.929C16.851 246.139 18.1318 248.185 20.1261 249.279C20.8733 249.688 21.7215 249.969 22.6485 250.07L61.9105 254.393C65.6238 254.803 68.2922 258.145 67.8709 261.846L63.3824 301.038C62.9779 304.582 65.3429 307.56 68.4495 308.34C68.854 308.441 69.2697 308.508 69.6967 308.53C69.8371 308.536 69.9832 308.542 70.1236 308.542C70.4101 308.542 70.7022 308.519 70.9944 308.474C71.4325 308.413 71.8707 308.306 72.3145 308.155L109.61 295.089C110.268 294.859 110.942 294.735 111.605 294.713C112.492 294.679 113.363 294.825 114.172 295.128C114.981 295.425 115.734 295.879 116.38 296.462C116.7 296.754 116.998 297.079 117.262 297.433C117.526 297.786 117.756 298.173 117.947 298.588C118.043 298.795 118.132 299.008 118.205 299.227L131.199 336.479C132.222 339.412 134.946 341.044 137.704 340.999C139.362 340.971 141.025 340.337 142.345 339.014L170.22 311.059C171.54 309.736 173.27 309.08 174.995 309.08C176.725 309.08 178.455 309.742 179.77 311.059L207.645 339.014C208.302 339.676 209.049 340.164 209.836 340.489C210.622 340.814 211.454 340.982 212.279 340.993C215.038 341.044 217.762 339.406 218.785 336.474L231.778 299.221C232.773 296.367 235.503 294.606 238.385 294.707C239.048 294.73 239.722 294.853 240.379 295.083L277.675 308.149C278.259 308.356 278.849 308.474 279.428 308.519C279.574 308.53 279.714 308.536 279.86 308.536C280.579 308.542 281.276 308.435 281.939 308.222C282.866 307.925 283.714 307.437 284.427 306.792C284.63 306.607 284.826 306.411 285.006 306.203C285.096 306.102 285.186 305.996 285.27 305.883C285.691 305.339 286.028 304.728 286.27 304.061C286.366 303.797 286.444 303.523 286.506 303.242C286.658 302.541 286.703 301.795 286.613 301.027L282.124 261.835C281.697 258.134 284.371 254.791 288.085 254.382L327.347 250.058C328.274 249.958 329.122 249.677 329.869 249.268C331.863 248.174 333.144 246.127 333.329 243.918C333.374 243.396 333.352 242.864 333.268 242.331C333.251 242.236 333.228 242.14 333.211 242.045C333.133 241.658 333.015 241.277 332.863 240.901C332.712 240.52 332.537 240.144 332.307 239.785L324.156 226.887L311.235 206.436C310.864 205.847 310.595 205.219 310.421 204.58C310.246 203.94 310.179 203.284 310.196 202.634C310.224 201.77 310.421 200.918 310.769 200.122C311.033 199.527 311.381 198.966 311.814 198.467C311.96 198.299 312.111 198.136 312.274 197.985C312.6 197.677 312.96 197.396 313.353 197.149L346.84 176.193C351.053 173.558 351.053 167.428 346.84 164.793L346.829 164.804Z"
              fill={
                data[0].time_id === 0 ? "#FCC605" :
                data[0].time_id === 1 ? "#6CB9FF" :
                data[0].time_id === 2 ? "#FC842E" :
                "#FCC605"
              }
              stroke="#111111"
              strokeWidth="4"
            />
          </svg>
        </div>

        {/* SVG上に重ねるモーダル内容 */}
        <div className="relative z-20 mb-4">
          <svg
              className="relative z-20 text-center text-black font-bold text-2xl mb-4"
              width="112" height="15"
              viewBox="0 0 112 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: "scale(1.5)" }}
              >
              <path d="M0.685547 7.26888C0.685547 2.61342 4.82983 0 9.57099 0C13.4727 0 16.4774 1.96954 17.6158 4.49422L14.443 5.67594C13.5652 4.20745 12.016 2.99001 9.57099 2.99001C6.62159 2.99001 4.27019 4.63707 4.27019 7.3587C4.27019 10.6885 7.51859 11.5661 9.88917 11.5661C12.2598 11.5661 14.1079 10.8324 14.5367 9.43537H10.0189V6.85766H17.9713V14.2521H15.3581L15.1719 12.5152H15.0602C13.8101 13.8582 11.8874 14.5562 9.27312 14.5562C4.26906 14.5551 0.685547 11.5294 0.685547 7.26888Z" fill="#111111"/>
              <path d="M19.9355 7.28674C19.9355 2.95452 23.996 0 28.9713 0C33.9465 0 38.007 2.99024 38.007 7.28674C38.007 11.5832 34.0042 14.5562 28.9713 14.5562C23.9384 14.5562 19.9355 11.62 19.9355 7.28674ZM28.9897 11.5659C32.02 11.5659 34.3083 9.74018 34.3083 7.28674C34.3083 4.8333 32.0776 2.98915 28.9897 2.98915C25.9017 2.98915 23.6146 4.79758 23.6146 7.28674C23.6146 9.7759 26.017 11.5659 28.9897 11.5659Z" fill="#111111"/>
              <path d="M38.008 3.27123V0.363892H52.1497V3.27123H46.8248V14.1922H43.3317V3.27123H38.0068H38.008Z" fill="#111111"/>
              <path d="M52.6855 7.198C52.6855 2.43505 57.0531 0 61.6654 0C65.4867 0 68.5365 1.86254 69.761 4.49455L66.561 5.67636C65.695 4.20776 64.0756 2.99024 61.6096 2.99024C58.578 2.99024 56.3009 4.70884 56.3009 7.35925C56.3009 10.5281 59.3132 11.567 61.8736 11.567C64.4341 11.567 66.2605 10.6536 67.1448 8.50534L70.3641 9.5075C68.9143 13.2142 65.6392 14.5562 61.8361 14.5562C56.5456 14.5562 52.6867 11.6558 52.6867 7.198H52.6855Z" fill="#111111"/>
              <path d="M72.1855 0.363892H75.619V5.8603H83.2878V0.363892H86.7213V14.1922H83.2878V8.92731H75.619V14.1922H72.1855V0.363892Z" fill="#111111"/>
              <path d="M95.0731 0.363892H99.1914L105.972 14.1922H102.236L100.57 11.0363H93.6177L91.9516 14.1922H88.293L95.0731 0.363892ZM99.0004 7.96927C98.3682 6.74547 97.7557 5.48737 97.1236 4.17569H97.0657C96.4335 5.48737 95.821 6.74654 95.1889 7.96927H99.0004Z" fill="#111111"/>
              <path d="M109.394 10.6914C110.426 10.6914 111.366 11.5091 111.366 12.4892C111.366 13.5417 110.481 14.3781 109.394 14.3781C108.307 14.3781 107.386 13.5428 107.386 12.4892C107.386 11.5091 108.289 10.6914 109.394 10.6914Z" fill="#111111"/>
              <path d="M107.689 0H111.119L111.023 9.29043H107.791L107.689 0Z" fill="#111111"/>
            </svg>
        </div>
        <div className="relative z-20 p-2 bg-white text-center text-black rounded-full w-[245px] mb-4 border-2 border-black">
          {data[0].bucket_title}
        </div>
        <button onClick={onClose} className="relative z-20 py-2 px-4 bg-black text-white rounded-full mt-4">
          やってみる！
        </button>
      </div>
    </div>
  );
};

export default Modal;
