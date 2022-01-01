import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Story of Leevi Vahvelainen");
  }

  async getHtml() {
    return `
      <h1>This is my life story</h1>
      <p>
        Don't miss a word
      </p>
    `;
  }
}