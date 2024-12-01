import { AuthTitleProps } from "../../../../interface/AuthResponse/AuthResponse";

export default function AuthShared(props: AuthTitleProps) {
    return (
      <div className="auth-title my-4 py-3">
        <p className="text-white">{props.welcomeText}</p>
        <h3 className="main-colr title pt-3">
          <span className="frist-ch position-relative">{props.firstLetter}</span>
          {props.title}
        </h3>
      </div>
    );
  }
  