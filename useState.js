function useState(initialValue) {
    var _val = initialValue
    function state() {
        return _val
    }
    function setState(newVal) {
        _val = newVal
    }
    return [state, setState]
}

const MyReact = (function () {
    let _val
    return {
        render(Component) {
            const Comp = Component()
            Comp.render()
            return Comp
        },
        useState(initialValue) {
            _val = _val || initialValue
            function setState(newVal) {
                _val = newVal
            }
            return [_val, setState]
        }
    }
})()