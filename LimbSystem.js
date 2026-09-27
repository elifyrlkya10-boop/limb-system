class LimbSystem {
  constructor(end, length, speed, creature) {
    this.end = end;
    this.length = Math.max(1, length);
    this.speed = speed;
    this.creature = creature;
    creature.systems.push(this);

    this.nodes = [];
    let node = end;
    for (let i = 0; i < this.length; i++) {
      this.nodes.unshift(node);
      node = node.parent;
      if (!node.isSegment) {
        this.length = i + 1;
        break;
      }
    }

    this.hip = this.nodes[0].parent;
  }

  moveTo(x, y) {
    this.nodes[0].updateRelative(true, true);

    const dist = Math.hypot(x - this.end.x, y - this.end.y);
    let len = Math.max(0, dist - this.speed);

    for (let i = this.nodes.length - 1; i >= 0; i--) {
      const node = this.nodes[i];
      const ang = Math.atan2(node.y - y, node.x - x);
      node.x = x + len * Math.cos(ang);
      node.y = y + len * Math.sin(ang);
      x = node.x;
      y = node.y;
      len = node.size;
    }

    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      node.absAngle = Math.atan2(node.y - node.parent.y, node.x - node.parent.x);
      node.relAngle = node.absAngle - node.parent.absAngle;

      for (const child of node.children) {
        if (!this.nodes.includes(child)) {
          child.updateRelative(true, false);
        }
      }
    }
  }

  update() {
    this.moveTo(Input.mouse.x, Input.mouse.y);
  }
}
