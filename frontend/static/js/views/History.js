import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle('Past life of Leevi Vahvelainen');
  }
  
  async getHtml() {
    $('#app').attr('class', 'history');
    return '/static/views/History.html';
  }
}