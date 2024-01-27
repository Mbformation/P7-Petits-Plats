class Tag {
  constructor(name) {
    this.name = name;
    this.compEl = document.createElement("li");
    this.compEl.classList.add("tag");
  }
  render() {
    this.compEl.textContent = `${this.name}`;
    return this.compEl;
  }
}

export default Tag;
