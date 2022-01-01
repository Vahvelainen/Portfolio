import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Past life of Leevi Vahvelainen");
  }

  async getHtml() {
    return `
      <h1>Here is everything I have done before</h1>
      <p>
        It won't be that important
      </p>
    `;
  }
}