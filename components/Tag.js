class Tag {
  constructor(item) {
    this.item = item;
    this.tagEl = document.createElement("li");
    this.tagEl.classList.add("tag");
  }
  render() {
    this.tagEl.textContent = `${this.item}`;
    return this.tagEl;
  }

  appendTotal() {
    //this.tagEl blablabla
  }
}

export default Tag;
