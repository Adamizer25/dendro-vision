import { Accessor, createSignal, Setter } from "solid-js";

export default function createLocalStorageSignal<T extends object>(key: string, def?: T): T extends (...args: never) => unknown ? unknown : [get: Accessor<T>, set: Setter<T>];
export default function createLocalStorageSignal<T extends object>(key: string, def?: T): [Accessor<T>, Setter<T>] {
    const storage = window.localStorage;
    const defaultValue = def ? JSON.stringify({ value: def }) : undefined;
    const initialValue: T = JSON.parse(storage.getItem(key) ?? defaultValue ?? "{}").value;
    const [value, setValue] = createSignal<T>(initialValue, { equals: false });

    const newSetValue = (newValue: T | ((v: T) => T)): T => {
        const _val: T = typeof newValue === 'function' ? newValue(value()) : newValue

        setValue(_val as any);
        storage.setItem(key, JSON.stringify({ value: _val }));

        return _val;
    };

    return [value, newSetValue as Setter<T>];
}

// type MyObjectType = {
//     foo: string
//     bar: number
// }

// const [get, set] = createLocalStorageSignal<MyObjectType>('asdf')

// const val = get() // type of val is MyObjectType

// set({} as MyObjectType) // ok
// set(() => ({} as MyObjectType)) // ok
// set((prev: MyObjectType) => ({} as MyObjectType)) // ok

// const str: string = val.foo // ok
// const num: number = val.bar // ok

// const bool: boolean = val.foo // string is not assignable to boolean (as expected)
// const sym: symbol = val.bar // number is not assignable to symbol (as expected)


// // This is made to have a type error because function values can not be JSON.stringified.
// const [get2, set2] = createLocalStorageSignal<() => void>('asdf')

// const val2 = get2() // type of val is any, but that's because of the previous error.
