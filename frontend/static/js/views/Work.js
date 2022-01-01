import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Work by Leevi Vahvelainen");
  }

  async getHtml() {
    return `
      <h1>Here will be my aweome projects</h1>
      <p>
        Presented in cool manner
      </p>
    `;
  }
}