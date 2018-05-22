class Node {
    constructor(children, parent, chkAttacked, chkType) {
        this.children[][] = children[][];// stores the children nodes coords 
        this.parent[] = parent[];// stores the parent nodes coords
        this.chkAttacked[] = chkAttacked[];// stores the attacked nodes coords
        this.chkType[] = chkType[];
    }

    getParent() { // returns the parent node's coords
        return parent[];
    }

    getChildren() { // returns the children nodes' coords
        return children[][];
    }

    getChkAttacked() {// retuns the coords that was attacked 
        return chkAttacked[];
    }

    getChkType() {
        return chkType[];
    }

}