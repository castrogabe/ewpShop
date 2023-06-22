import './Skeleton.css';

function Skeleton({ classes }) {
  const classNames = `skeleton ${classes} animate-pulse`;

  // passes the classNames we create
  return <div className={classNames}></div>;
}

export default Skeleton;
