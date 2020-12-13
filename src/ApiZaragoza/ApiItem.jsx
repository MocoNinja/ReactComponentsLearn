import React from "react";

export default function ApiItem(props) {
  return (
    <section>
      <header>
        <h2>{props.title}</h2>
      </header>
      <p>{props.horario}</p>
    </section>
  );
}
