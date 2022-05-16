import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Leevi Vahvelainen Portfolio');
  }
  
  async getHtml() {
    $('#app').attr('class', 'dashboard');
    return '/static/views/Dashboard.html';
  }
}