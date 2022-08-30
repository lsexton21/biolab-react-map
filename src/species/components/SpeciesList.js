import styles from "./SpeciesList.module.css";
import SpeciesItem from "./SpeciesItem";

const SpeciesList = (props) => {
  return (
    <ul className={styles["species-list"]}>
      {props.items.map((species) => (
        <SpeciesItem
          key={species._id}
          id={species._id}
          commonName={species.commonName}
          keyImgSource={species.imgs.keyImg.source}
        />
      ))}
    </ul>
  );
};

export default SpeciesList;
