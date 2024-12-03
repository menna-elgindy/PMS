import style from "./AddFormHeader.module.css";
import { Link } from "react-router-dom";
import { BackArrow } from "../SvgIcons/SvgIcons";

export default function AddFormHeader({
  title,
  link,
}: {
  title: string;
  link: string;
}) {
  return (
    <div className={style["header-wrapper"]}>
      <div className={style["Link-wrapper"]}>
        <BackArrow />
        <Link to={`/${link}`}>View All {link}</Link>
      </div>
      <h2 className={style["title"]}>Add a New {title}</h2>
    </div>
  );
}
