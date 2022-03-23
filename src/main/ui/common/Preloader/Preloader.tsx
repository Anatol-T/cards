import React from 'react';
import styles from './Preloader.module.css'

const Preloader = () => {
  return (
    <div className={styles.preloader}>
      <figure>
        <div></div><div></div>
        <div></div><div></div>
        <div></div><div></div>
        <div></div><div></div>
      </figure>
    </div>
  );
};

export default Preloader;