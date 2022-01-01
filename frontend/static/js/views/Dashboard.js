import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Leevi Vahvelainen Portfolio");
  }

  async getHtml() {
    return `
      <h1>Welcome to my portfolio ::)</h1>
      <p>
        This is going to be awesome
      </p>
    `;
  }
}