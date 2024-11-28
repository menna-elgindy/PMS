interface IconProps {
  color: string;
}

export const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="34"
    height="10"
    fill="none"
    viewBox="0 0 14 8"
  >
    <path
      fill="#A7A7A7"
      d="M7 7.75a.62.62 0 0 1-.442-.183l-6.25-6.25a.625.625 0 1 1 .884-.884L7 6.241 12.808.433a.625.625 0 1 1 .884.884l-6.25 6.25A.62.62 0 0 1 7 7.75"
    ></path>
  </svg>
);

export const ToggleArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="8"
    height="14"
    fill="none"
    viewBox="0 0 8 14"
  >
    <path
      fill="#fff"
      d="M7.354 13.354a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 1 1 .708.708L1.707 7l5.647 5.646a.5.5 0 0 1 0 .708"
    ></path>
  </svg>
);
export const ProjectsIcon = ({ color }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="none"
    viewBox="0 0 16 16"
  >
    <path
      fill={color}
      d="M6 1v3H1V1zM1 0a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zM15 12v3h-5v-3zm-5-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1zM6 8v7H1V8zM1 7a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zM15 1v7h-5V1zm-5-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1z"
    ></path>
  </svg>
);
export const TasksIcon = ({ color }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="none"
    viewBox="0 0 16 16"
  >
    <path
      fill={color}
      d="M4.363 1.11a.375.375 0 0 0-.531 0l-1.99 1.978-.71-.691a.375.375 0 0 0-.531 0l-.49.49a.375.375 0 0 0 0 .532L1.596 4.9a.4.4 0 0 0 .55 0l.488-.488 2.256-2.256a.38.38 0 0 0 .003-.531zm0 4.974a.375.375 0 0 0-.531 0l-1.99 1.991-.71-.69a.375.375 0 0 0-.531 0l-.49.49a.375.375 0 0 0 0 .531l1.483 1.485a.4.4 0 0 0 .55 0l.49-.49 2.257-2.258a.375.375 0 0 0 .002-.528zM2 11.5c-.828 0-1.518.672-1.518 1.5s.69 1.5 1.518 1.5a1.5 1.5 0 1 0 0-3m13.5.5h-9a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5m0-10h-9a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5m0 5h-9a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5"
    ></path>
  </svg>
);
