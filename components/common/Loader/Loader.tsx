import React from "react";
import LoaderStyle from "./Loader.module.css";

interface Props {
  isLoading: boolean;
}

function Loader(props: Props) {
  if (props.isLoading) {
    return (
      <div className={LoaderStyle.container}>
        <div className={LoaderStyle.lds_ring}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
}

export default Loader;
