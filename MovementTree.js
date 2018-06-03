class NodeTree {
    constructor(parent, chkAttacked, chkType, coords) {
        this.children = [];
        this.parent = parent;// stores the parent node coords
        this.chkAttacked = chkAttacked;// stores the attacked nodes coords
        this.chkType = chkType;
        this.coords = coords;
    }

    setChild(node) {// adds a child node
        this.children.push(node);
    }

    getCoords() {
        return this.coords; // returns the node coordiantes 
    }

    getParent() { // returns the parent node
        return this.parent;
    }

    getChildren() { // returns the children nodes 
        return this.children;
    }

    getChkAttacked() {// retuns the coords that was attacked 
        return this.chkAttacked;
    }

    getChkType() {// returns the type of checker
        return this.chkType;
    }
}