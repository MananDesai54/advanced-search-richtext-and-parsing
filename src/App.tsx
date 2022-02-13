import { Fragment } from "react";
import { AdvSearch } from "./Component/AdvSearch";
import { Parser } from "./Component/Parser";

function App() {
  const text = `
  <div>
    hey
    <strong style="color: #DE1B1B;"> lorem lorem</strong>
    <i>Manan</i>
    <p>Okay</p>
    okay man
    <b>Hello</b>
    <p>hey, hey, hey &lt;h2&gt;hey&lt;/h2&gt;</p>
  </div>`;

  return (
    <Fragment>
      <AdvSearch />
      <Parser text={text} />
    </Fragment>
  );
}

export default App;
