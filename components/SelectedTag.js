import Tag from "./Tag.js";

class SelectedTag extends Tag {
  constructor(item) {
    super();
    this.item = item;
    super.render();
    this.listenForDeletion();
  }

  listenForDeletion() {
    this.compEladdEventListener("input", (event) => {});
  }
}

export default SelectedTag;
