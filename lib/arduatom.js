'use babel';

import ArduatomView from './arduatom-view';
import { CompositeDisposable } from 'atom';

export default {

  arduatomView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.arduatomView = new ArduatomView(state.arduatomViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.arduatomView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'arduatom:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.arduatomView.destroy();
  },

  serialize() {
    return {
      arduatomViewState: this.arduatomView.serialize()
    };
  },

  toggle() {
    console.log('Arduatom was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};