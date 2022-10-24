// Example 1, getter is function- should not be 

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

// Example 0, revisited - this is BUGGY!
function useState(initialValue) {
    var _val = initialValue
    // no state() function, stale value
    function setState(newVal) {
        _val = newVal
    }
    return [_val, setState] // directly exposing _val
}

// Example two, non-stale value
// MyReact is the module, iife creates module like closure using a function before es closures were a thing.
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

const increment = (() => {
    let count = 0
    const showCount = () => console.log(count)
    return [() => count++, showCount]
})()

const [_increment, showCount] = increment;

/* showCount();
_increment();
showCount();
showCount(); */


// injecting vars into window.document
((namespace) => {
    namespace.injectedVar = 0;
    namespace.injectedFunc = function () {
        this.injectedVar++;
    };
    namespace.injectedPrint = function () {
        console.log(this.injectedVar)
    };


})(window.document = window.document || {})

/* console.log(window.document.injectedVar)
window.document.injectedFunc()
console.log(window.document.injectedVar)
window.document.injectedPrint()
window.document.injectedFunc()
console.log(window.document.injectedVar)

 */

function Dog() {
    this.bark = () => console.log('bark')
}

const _Dog = () => {
    this.bark = () => console.log('bark')

}
/* 
(new Dog).bark()
(new _Dog) */