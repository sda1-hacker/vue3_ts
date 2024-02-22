// 定义接口并且暴露给外部使用
export interface PersonInterface{
    id: string
    name: string
    age: number
    address: string
}

// 自定义类型，暴露给外部使用
export type Persons = Array<PersonInterface>
// export type Persons = PersonInterface[]   // 这种写法也可以