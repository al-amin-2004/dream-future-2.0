import { FC } from "react";
import { IconSvgProps } from "@/types";

export const BarsIcon: FC<IconSvgProps> = (className) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      width={24}
      height={24}
      viewBox="0 0 1792 1792"
      {...className}
    >
      <path d="M1673.9 1363.2c0 52.3-42.4 94.3-94.3 94.3H212.7c-52.3 0-94.3-42.4-94.3-94.3 0-52.3 42.4-94.3 94.3-94.3h1366.8c52-.4 94.4 42 94.4 94.3M1673.9 895.6c0 52.3-42.4 94.3-94.3 94.3H659c-52.3 0-94.3-42.4-94.3-94.3 0-52.3 42.4-94.3 94.3-94.3h920.6c51.9-.5 94.3 41.9 94.3 94.3M1673.9 427.9c0 52.3-42.4 94.3-94.3 94.3H212.7c-52.3 0-94.3-42.4-94.3-94.3 0-52.3 42.4-94.3 94.3-94.3h1366.8c52-.4 94.4 42 94.4 94.3" />
    </svg>
  );
};

export const TimesIcon: FC<IconSvgProps> = (className) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      viewBox="0 0 24 24"
      {...className}
    >
      <g stroke="" strokeLinecap="round" strokeWidth={2}>
        <path d="M6 18 18 6M18 18 6 6" />
      </g>
    </svg>
  );
};

export const DiamondIcon: FC<IconSvgProps> = (className) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      viewBox="0 0 32 32"
      {...className}
    >
      <path fill="#FFC44D" d="m16 3 5 7H11zM11 10 6 3l-5 7zM31 10l-5-7-5 7z" />
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m11 10 5 21 5-21z"
      />
      <path fill="#FFC44D" d="M16 31 1 10h10zM16 31l5-21h10z" />
      <path fill="#FFE6EA" d="M11 10 6 3h10z" />
      <path fill="#FFE6EA" d="m21 10-5-7h10zl-5 21-5-21z" />
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m6 3-5 7m5-7h20M6 3l5 7M1 10l15 21M1 10h30M16 31l15-21M16 31l5-21m-5 21-5-21m20 0-5-7m0 0-5 7m0 0-5-7-5 7"
      />
    </svg>
  );
};

export const KingIcon: FC<IconSvgProps> = (className) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      width={24}
      height={24}
      viewBox="0 0 512 512"
      {...className}
    >
      <path
        d="m461.354 263.687-113.915 92.39-89.861-135.283-89.83 135.241-113.884-91.836-10.501-62.485 114.939 92.996 99.255-149.42 99.276 149.42 114.938-92.996z"
        style={{
          fill: "#ecf0f1",
        }}
      />
      <path
        d="m461.354 263.636-31.379 186.662H85.159l-31.295-186.15 113.884 91.901 89.83-135.248 89.861 135.306z"
        style={{
          fill: "#f8c660",
        }}
      />
      <circle
        cx={257.567}
        cy={103.497}
        r={41.796}
        style={{
          fill: "#f8c660",
        }}
      />
      <circle
        cx={467.592}
        cy={184.999}
        r={33.959}
        style={{
          fill: "#f8c660",
        }}
      />
      <circle
        cx={44.408}
        cy={184.999}
        r={33.959}
        style={{
          fill: "#f8c660",
        }}
      />
      <path
        d="m258.132 413.632-37.629-53.302 37.629-53.302 37.628 53.302z"
        style={{
          fill: "#df5f4e",
        }}
      />
      <path
        d="M512 185c0-24.487-19.921-44.408-44.408-44.408S423.184 160.513 423.184 185c0 12.43 5.14 23.676 13.398 31.745l-77.398 62.622-84.14-126.641c20.239-7.206 34.769-26.548 34.769-49.228 0-28.808-23.437-52.245-52.245-52.245s-52.245 23.437-52.245 52.245c0 22.675 14.524 42.013 34.754 49.223L155.95 279.366l-79.147-64.037c7.443-7.944 12.013-18.61 12.013-30.329 0-24.487-19.921-44.408-44.408-44.408S0 160.513 0 185c0 22.076 16.194 40.434 37.326 43.837l37.53 223.14c.846 5.031 5.203 8.77 10.304 8.77h344.816c5.102 0 9.458-3.738 10.304-8.77l37.638-223.767C497.439 223.542 512 205.932 512 185m-285.78-81.502c0-17.285 14.062-31.347 31.347-31.347s31.347 14.062 31.347 31.347-14.062 31.347-31.347 31.347-31.347-14.062-31.347-31.347m-66.335 201.541a10.45 10.45 0 0 0 7.12-4.547l90.553-136.319 90.572 136.319a10.45 10.45 0 0 0 15.275 2.34l92.643-74.956q.349.096.699.186l-5.022 29.879-101.944 82.772-83.499-125.708a10.45 10.45 0 0 0-17.408 0l-83.485 125.683-101.898-82.251-5.251-31.246 93.489 75.641a10.45 10.45 0 0 0 8.156 2.207M20.898 185c0-12.964 10.546-23.51 23.51-23.51s23.51 10.546 23.51 23.51-10.546 23.51-23.51 23.51-23.51-10.546-23.51-23.51m400.239 254.849H93.998l-25.26-150.267 92.447 74.597a10.46 10.46 0 0 0 15.267-2.369l81.126-122.135 81.157 122.181a10.45 10.45 0 0 0 15.29 2.329l92.437-74.999zm46.455-231.339c-12.964 0-23.51-10.546-23.51-23.51s10.546-23.51 23.51-23.51 23.51 10.546 23.51 23.51-10.546 23.51-23.51 23.51"
        style={{
          fill: "#231f20",
        }}
      />
      <path
        d="M266.145 301.002a10.45 10.45 0 0 0-17.072 0l-37.629 53.302a10.45 10.45 0 0 0 0 12.052l37.629 53.302a10.45 10.45 0 0 0 17.072 0l37.629-53.302a10.45 10.45 0 0 0 0-12.052zm-8.536 94.513-24.838-35.185 24.838-35.185 24.838 35.185z"
        style={{
          fill: "#231f20",
        }}
      />
    </svg>
  );
};

export const Loading1: FC<IconSvgProps> = (className) => {
  return (
    <svg
      {...className}
      className="size-9 text-primary animate-spin"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M6 2v6h.01L12 12l5.99-4H18V2H6zm0 20h12v-6h-.01L12 12l-5.99 4H6v6z"
      />
    </svg>
  );
};

export const Loading2: FC<IconSvgProps> = () => {
  return (
    <div className="w-12 text-orange-600">
      <svg
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="4" cy="12" r="0">
          <animate
            begin="0;spinner_z0Or.end"
            attributeName="r"
            calcMode="spline"
            dur="0.5s"
            keySplines=".36,.6,.31,1"
            values="0;3"
            fill="freeze"
          ></animate>
          <animate
            begin="spinner_OLMs.end"
            attributeName="cx"
            calcMode="spline"
            dur="0.5s"
            keySplines=".36,.6,.31,1"
            values="4;12"
            fill="freeze"
          ></animate>
          <animate
            begin="spinner_UHR2.end"
            attributeName="cx"
            calcMode="spline"
            dur="0.5s"
            keySplines=".36,.6,.31,1"
            values="12;20"
            fill="freeze"
          ></animate>
          <animate
            id="spinner_lo66"
            begin="spinner_Aguh.end"
            attributeName="r"
            calcMode="spline"
            dur="0.5s"
            keySplines=".36,.6,.31,1"
            values="3;0"
            fill="freeze"
          ></animate>
          <animate
            id="spinner_z0Or"
            begin="spinner_lo66.end"
            attributeName="cx"
            dur="0.001s"
            values="20;4"
            fill="freeze"
          ></animate>
        </circle>
        <circle cx="4" cy="12" r="3">
          <animate
            begin="0;spinner_z0Or.end"
            attributeName="cx"
            calcMode="spline"
            dur="0.5s"
            keySplines=".36,.6,.31,1"
            values="4;12"
            fill="freeze"
          ></animate>
          <animate
            begin="spinner_OLMs.end"
            attributeName="cx"
            calcMode="spline"
            dur="0.5s"
            keySplines=".36,.6,.31,1"
            values="12;20"
            fill="freeze"
          ></animate>
          <animate
            id="spinner_JsnR"
            begin="spinner_UHR2.end"
            attributeName="r"
            calcMode="spline"
            dur="0.5s"
            keySplines=".36,.6,.31,1"
            values="3;0"
            fill="freeze"
          ></animate>
          <animate
            id="spinner_Aguh"
            begin="spinner_JsnR.end"
            attributeName="cx"
            dur="0.001s"
            values="20;4"
            fill="freeze"
          ></animate>
          <animate
            begin="spinner_Aguh.end"
            attributeName="r"
            calcMode="spline"
            dur="0.5s"
            keySplines=".36,.6,.31,1"
            values="0;3"
            fill="freeze"
          ></animate>
        </circle>
        <circle cx="12" cy="12" r="3">
          <animate
            begin="0;spinner_z0Or.end"
            attributeName="cx"
            calcMode="spline"
            dur="0.5s"
            keySplines=".36,.6,.31,1"
            values="12;20"
            fill="freeze"
          ></animate>
          <animate
            id="spinner_hSjk"
            begin="spinner_OLMs.end"
            attributeName="r"
            calcMode="spline"
            dur="0.5s"
            keySplines=".36,.6,.31,1"
            values="3;0"
            fill="freeze"
          ></animate>
          <animate
            id="spinner_UHR2"
            begin="spinner_hSjk.end"
            attributeName="cx"
            dur="0.001s"
            values="20;4"
            fill="freeze"
          ></animate>
          <animate
            begin="spinner_UHR2.end"
            attributeName="r"
            calcMode="spline"
            dur="0.5s"
            keySplines=".36,.6,.31,1"
            values="0;3"
            fill="freeze"
          ></animate>
          <animate
            begin="spinner_Aguh.end"
            attributeName="cx"
            calcMode="spline"
            dur="0.5s"
            keySplines=".36,.6,.31,1"
            values="4;12"
            fill="freeze"
          ></animate>
        </circle>
        <circle cx="20" cy="12" r="3">
          <animate
            id="spinner_4v5M"
            begin="0;spinner_z0Or.end"
            attributeName="r"
            calcMode="spline"
            dur="0.5s"
            keySplines=".36,.6,.31,1"
            values="3;0"
            fill="freeze"
          ></animate>
          <animate
            id="spinner_OLMs"
            begin="spinner_4v5M.end"
            attributeName="cx"
            dur="0.001s"
            values="20;4"
            fill="freeze"
          ></animate>
          <animate
            begin="spinner_OLMs.end"
            attributeName="r"
            calcMode="spline"
            dur="0.5s"
            keySplines=".36,.6,.31,1"
            values="0;3"
            fill="freeze"
          ></animate>
          <animate
            begin="spinner_UHR2.end"
            attributeName="cx"
            calcMode="spline"
            dur="0.5s"
            keySplines=".36,.6,.31,1"
            values="4;12"
            fill="freeze"
          ></animate>
          <animate
            begin="spinner_Aguh.end"
            attributeName="cx"
            calcMode="spline"
            dur="0.5s"
            keySplines=".36,.6,.31,1"
            values="12;20"
            fill="freeze"
          ></animate>
        </circle>
      </svg>
    </div>
  );
};

export const LeftArrowIcon: FC<IconSvgProps> = (className) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 64 64"
      {...className}
    >
      <defs>
        <style>{".cls-2{fill:#ffb300}"}</style>
      </defs>
      <path
        d="M32 60a28 28 0 1 1 20.61-46.95 2 2 0 1 1-2.94 2.71 23.9 23.9 0 1 0 5.2 8.94 2 2 0 1 1 3.81-1.22A28 28 0 0 1 32 60"
        style={{
          fill: "#0074ff",
        }}
      />
      <path
        d="M45.74 34h-18a2 2 0 1 1 0-4h18a2 2 0 1 1 0 4"
        className="cls-2"
      />
      <path
        d="M26.74 42.49a2 2 0 0 1-1.41-.59l-8.49-8.49a2 2 0 0 1 0-2.82l8.49-8.49a2 2 0 0 1 2.83 2.83L21.09 32l7.07 7.07a2 2 0 0 1-1.42 3.42"
        className="cls-2"
      />
    </svg>
  );
};

export const DepositIcon: FC<IconSvgProps> = (className) => {
  return (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...className}
    >
      <path fill="#ffffff" d="M8 16l-2-3h1v-2h2v2h1l-2 3z" />
      <path fill="#ffffff" d="M15 1v8h-14v-8h14zM16 0h-16v10h16v-10z" />
      <path
        fill="#ffffff"
        d="M8 2c1.657 0 3 1.343 3 3s-1.343 3-3 3h5v-1h1v-4h-1v-1h-5z"
      />
      <path
        fill="#ffffff"
        d="M5 5c0-1.657 1.343-3 3-3h-5v1h-1v4h1v1h5c-1.657 0-3-1.343-3-3z"
      />
    </svg>
  );
};
