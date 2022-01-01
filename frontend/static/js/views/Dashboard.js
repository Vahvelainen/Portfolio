import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Dashboard");
  }

  async getHtml() {
    return '<h1>asdf</h1><p>qwertyuiopasdfghjklzxcvbnm</p>'
    /*  <h1> Leevin Portfoliotesti </h1>
      <p>
        ei mitään vakavaa täällä, ei hätää :)
      </p>
    ';*/
  }
}