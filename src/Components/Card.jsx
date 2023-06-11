import classes from "./Card.module.css";
const Card = (props) => {
  //THIS CARD IS A WRAPPER COMPONENT__
  return (
    <>
      <section className={classes.Card}>{props.children}</section>
    </>
  );
};

export default Card;
