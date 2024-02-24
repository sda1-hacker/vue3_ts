

1. 学习地址

```
b站学习链接：
https://www.bilibili.com/video/BV1Za4y1r7KE/?spm_id_from=333.337.search-card.all.click&vd_source=540c985cd59918d0d6a094841c177cdf

踩坑: 在ts中想要使用this,不能使用箭头函数 () => {}

基本库: 
	npm i axios 
	npm i vue-router 
	npm i pinia
```



2. 构建项目

```
# node版本：v20.11.1
# npm版本：v10.2.4


# 查看安装的vue cli版本，推荐需要在4.5.0以上
vue --vesion    

# 安装或者升级vue cli
npm install -g @vue/cli		

# 使用vue cli创建工程 【官方不推荐】
vue create vue_test		


# 使用vite创建工程【官方推荐】
npm config set registry https://registry.npmmirror.com	# npm设置最新镜像源
npm config get registry	# 查看镜像源
npm create vue@latest	# 创建基于vite的vue3的项目
##### 这样创建的 #####
PS E:\code\vueCode> npm create vue@latest

Vue.js - The Progressive JavaScript Framework

√ 请输入项目名称： ... vue3_ts
√ 是否使用 TypeScript 语法？ ... 否 / 是
√ 是否启用 JSX 支持？ ... 否 / 是
√ 是否引入 Vue Router 进行单页面应用开发？ ... 否 / 是
√ 是否引入 Pinia 用于状态管理？ ... 否 / 是
√ 是否引入 Vitest 用于单元测试？ ... 否 / 是
√ 是否要引入一款端到端（End to End）测试工具？ » 不需要
√ 是否引入 ESLint 用于代码质量检测？ ... 否 / 是
√ 是否引入 Prettier 用于代码格式化？ ... 否 / 是

正在构建项目 E:\code\vueCode\vue3_ts...

项目构建完成，可执行以下命令：

  cd vue3_ts
  npm install		# 安装依赖这个需要执行
  npm run dev		# 运行项目
  
```



3. 项目结构

```
E:.
├─.vscode					# vscode一些插件
├─node_modules				# vue项目的一些依赖
├─public					# 图片，css，js等静态文件
└─src						# 代码目录
    ├─assets			
    └─components			# 组件目录
        └─Person
        	└─Person.vue	# 组件
    └─App.vue				# 根组件，所有的主键都挂载到这个App.vue这个组件上
    └─main.ts
└─env.d.ts					# 
└─index.html				# vue项目入口, 在这里调用了main.ts文件
└─package-lock.json
└─package.json
└─README.md
└─tsconfig.app.json
└─tsconfig.json
└─tsconfig.node.json
└─vite.config.ts
```



4. setup函数

```js
在vue3中所有的变量/函数都需要生命在一个名字为setup的函数中，这些变量/函数如果需要在组件中被使用需要在setup函数中return

setup在beforcreate之前调用，在setup函数中this是未被定义的

<script lang="ts">
export default {
    name: 'Vue3TsPerson',	// 组件名

    // vue3 变量以及方法定义在setup函数中
    // setup在beforcreate之前调用
    // 在vue2中的data方法中可以读取到setup中return的变量， 由于在调用data之前，setup已经解析完毕了
    // 但是在setup中无法读取到vue2 data方法中定义的变量
    setup(){
        // 数据
        let name = '张三'   // 此时的数据不是响应式的， 修改的时候页面不会同步修改
        let age = 18        // 此时的数据不是响应式的， 修改的时候页面不会同步修改
        let tel = '13838838388' // 此时的数据不是响应式的， 修改的时候页面不会同步修改

        // 方法
        function showTel(){
            alert(tel)
        }

        function updateName(){
            name = 'lisi'
        }

        function updateAge() {
            age += 1
        }

        // template中使用的变量, 方法 在这里return
        // 等价于 return {name: name, age: age, tel: tel, showTel: showTel, updateName: updateName, updateAge: updateAge}
        return {name, age, tel, showTel, updateName, updateAge}

        // set up的返回值可以式一个函数，直接指定渲染的内容， 一般情况下不用
        // return function(){
        //     return 'haha'
        // }

        // 匿名箭头函数，等价于上面的函数
        // return () => 'haha'
    }
};
</script>
```



5. setup函数的语法糖

```js
setup语法糖，直接在script上添加setup，不需要指定返回值，直接定义变量和方法即可
安装在script上组件名称扩展的组件： npm i vite-plugin-vue-setup-extend -D， 然后再vite.config.ts中引用
    
<script setup lang="ts" name="personVue3">  // 引用了vite-plugin-vue-setup-extend插件，才能在script上使用name属性来指定组件的名称
    let tel = '13838838388'
    let name = 'zhangsansan'
    let age = 18

    function updateAge() {
        age += 1
    }
    function updateName() {
        name = 'wangwuwu'
    }
    function showTel() {
        alert(tel)
    }
</script>


vite.config.ts 中插件的配置
import vueSetUpExtend from 'vite-plugin-vue-setup-extend'  // 引入插件
export default defineConfig({
  plugins: [
    vueSetUpExtend(),  // 使用插件
  ],
  ...
})
```



6. 响应式数据

```js
vue3中通过ref和reactive定义响应式数据。


1. ref定义响应式数据：   # 基本类型数据的响应式，也可以定义对象类型数据的响应式

1.1 定义基本类型的响应式
<script setup lang="ts" name="personVue3">  
    import {ref} from 'vue'   			// 引入ref函数
    
    let tel = '13838838388'
    let name = ref('zhangsansan')		// 将数据定义成响应式的数据
    let age = ref(18)					// 将数据定义成响应式的数据

    function updateAge() {
        age.value += 1					// 通过 .value获取数据，但是在template中不需要.value
    }
    function updateName() {
        name.value = 'wangwuwu'			// 通过 .value获取数据，但是在template中不需要.value
    }
    function showTel() {
        alert(tel)
    }
</script>
对应的template：
<template>
    <div>
        <h1>名字: {{name}} </h1>
        <h1>年龄: {{age}} </h1>
        <button @click="showTel">显示TelNum</button>
        <button @click="updateName">修改Name</button>
        <button @click="updateAge">修改Age</button>
    </div>
</template>

1.2 定义对象类型的响应式,  底层仍然是reactive
<script setup lang="ts" name="personVue3">
    
    // 使用ref定义对象类型数据的响应式
    
    import {ref} from 'vue'

    // 对象类型数据
    let person = ref({
        name: 'zhangsansan',
        age: 18,
        tel: '18838838388',
        address: '江苏苏州市姑苏区',
    })

    // 数据
    let games = ref([
        {id: "abcc01", name:"梦幻西游"},
        {id: "abcc02", name:"梦三国"},
        {id: "abcc03", name:"穿越火线"},

    ])

    function showTel() {
        alert(person.value.address)
    }

    function updateName() {
        person.value.name = 'lisisi..'
    }

    function updateAge() {
        person.value.age += 1
    }

	function changeFristName(){
        games.value[0].name = '口袋三国'
    }
</script>
对应的template：
<template>
    <!-- 对象类型的数据这样使用 -->
    <div>
        <h1>名字: {{person.name}} </h1>
        <h1>年龄: {{person.age}} </h1>
        <button @click="showTel">显示TelNum</button>
        <button @click="updateName">修改Name</button>
        <button @click="updateAge">修改Age</button>
    </div>

    <div>
        <H2>游戏列表：</H2>
        <ul>
            <li v-for="g in games" :key="g.id">{{ g.name }}</li>
        </ul>
		<button @click="changeFristName">修改第一个游戏的名字</button>
    </div>
</template>


2. reactive定义响应式数据：	# 只能定义 对象类型数据的响应式
<script setup lang="ts" name="personVue3">
    import {reactive} from 'vue'

    // 对象类型数据
    let person = reactive({
        name: 'zhangsansan',
        age: 18,
        tel: '18838838388',
        address: '江苏苏州市姑苏区',
    })

    // 数据
    let games = reactive([
        {id: "abcc01", name:"梦幻西游"},
        {id: "abcc02", name:"梦三国"},
        {id: "abcc03", name:"穿越火线"},

    ])

    function showTel() {
        alert(person.address)
    }

    function updateName() {
        person.name = 'lisisi..'
    }

    function updateAge() {
        person.age += 1
    }
</script>
对应的template：
<template>
    <!-- 对象类型的数据这样使用 -->
    <div>
        <h1>名字: {{person.name}} </h1>
        <h1>年龄: {{person.age}} </h1>
        <button @click="showTel">显示TelNum</button>
        <button @click="updateName">修改Name</button>
        <button @click="updateAge">修改Age</button>
    </div>

    <div>
        <H2>游戏列表：</H2>
        <ul>
            <li v-for="g in games" :key="g.id">{{ g.name }}</li>
        </ul>
    </div>
</template>


### reactive 需要注意的一些事情 ###
如果为reactive重新分配对象，会导致响应失效
// 对象类型数据
let person = reactive({
    name: 'zhangsansan',
    age: 18,
    tel: '18838838388',
    address: '江苏苏州市姑苏区',
})
function updatePerson() { 
        // 重新为reactive分配对象会导致失去响应式，  如果是ref定义的 通过 person.value = {} 可以直接替换对应的属性
        // person = {
        //     name: 'zhaoliuliu',
        //     age: 20,
        //     tel: '17777777777',
        //     address: '北京市昌平区',
        // }

        // 这样也不行
        // person = reactive(
        //     {
        //         name: 'zhaoliuliu',
        //         age: 20,
        //         tel: '17777777777',
        //         address: '北京市昌平区',
        //     } 
        // )

        let newPerson =   {
                name: 'zhaoliuliu',
                age: 20,
                tel: '17777777777',
                address: '北京市昌平区',
            } 
        // Object.assign这个函数会按照key-value的形式，替换person对象中的属性
        // 这种实现方式是可以的
        Object.assign(person, newPerson)
    }

## ref 和 reactive的选的 ##
如果基本类型必须选择ref了
如果是一个对象，层次不深那么选择ref和reactive就可以了
如果一个对象层次比较深，那么建议使用reactive。  表单回显示推荐使用这个。


3. toRefs 和 toRef  用于解构，并将结构出来的对象变成响应式的（ref，需要.value才可以使用），并且结构出来的数据和之前的响应式对象中的属性是绑定的，修改了结构出来的数据，那么原有响应式对象中的数据也会被修改

3.1 toRefs 将对象变成Ref定义的响应式对象
<template>
    <div>
        <h2>名字： {{person.name}}</h2>
        <h2>年龄： {{person.age}}</h2>
        <button @click="updateName"> 修改名字 </button>
        <button @click="updateAge"> 修改年龄 </button>

    </div>
</template>

<script setup lang="ts" name = "Vue3Person">
    import {reactive, toRefs, toRef} from 'vue'
    let person = reactive({
        name: '张三',
        age: 18
    })

    // let {name, age} = person  // 解构, 等价于下面两行代码，name和age都不是响应式的
    // let name = person.name
    // let age = person.age 

    let {name, age} = toRefs(person) // 结构，将name和age变成响应式的，和person.name 以及 person.age是关联的，修改了name和age在person中对应的属性也会改变

    function updateName() {
        name.value += '~'   
    }

    function updateAge() {
        age.value += 1
    }
</script>


3.2 toRef 只能转换一个指定的key-value
let age = toRef(person, 'age') 
```



7. 计算属性

```js
计算属性所依赖的数据发生变化就会重新计算。多次调用同一个计算属性，只会计算一次
<template>
    <div>
        <!-- v-bind:value 等价于 :value   是单向绑定 -->
        <!-- v-model:value 等价于 v-model 是双向绑定 -->
        FirstName:  <input type="text" v-model="firstName"> <br/>
        LastName: <input type="text" v-model="lastName"> <br/>       
        Fullname: <span name="fullname">{{ fullname }}</span> <br/>
        Fullname: <span name="fullname">{{ fullname }}</span> <br/>
        Fullname: <span name="fullname">{{ fullname }}</span> <br/>
        Fullname: <span name="fullname">{{ fullname }}</span> <br/>
        <hr/>
        FullNameFunc: <span> {{ getFullName() }} </span> <br/>
        FullNameFunc: <span> {{ getFullName() }} </span> <br/>
        FullNameFunc: <span> {{ getFullName() }} </span> <br/>

        <hr/>
        <button @click="changeFullName">修改计算变量fullName</button>
    </div>
</template>

<script setup lang="ts" name = "Vue3Person">
    import {ref, computed} from 'vue'
    let firstName = ref('张')
    let lastName = ref('三')

    // let fullname = computed(function(){
    //     return firstName.value + '``' + lastName.value
    // })

    // 箭头函数，等价于上面的写法，是一个匿名函数
    // let fullname = computed(()=>{
    //     console.log('计算属性-computed方法')  // 控制台只会打印一次
    //     return firstName.value + '``' + lastName.value
    // })

    let fullname = computed({
        // 获取fullname这个计算属性的时候调用这个方法
        get(){
            return firstName.value + '``' + lastName.value
        },

        // 调用fullname.value = xxxx的时候调用这个方法，值会被变量val接受
        set(val){
            // 在这里将val赋值给参与计算的属性
            firstName.value = val
            // ... 定义自己计算的逻辑
        }
    })

    function getFullName() {
        console.log("自己实现的function")    // 控制台会打印多次
        return firstName.value + '``' + lastName.value
    }

    function changeFullName() {
        firstName.value = "abc"
    }
</script>
```



8. watch： 监控数据的变化去做一些操作

```js
在vue3中watch只能监控以下四种数据：
1. ref定义的数据
2. reactive定义的数据
3. 一个函数，返回一个值（getter函数）
4. 包含上述内容的数组


1. 情况一：监控ref定义的基本类型的数据，直接写数据的名称即可，监控的是其value值的改变
<template>
    <div>
        <h2>当前求和为：{{sum}}</h2>
        <button @click="addSum">sum加一</button>
    </div>
</template>

<script setup lang="ts" name = "Vue3Person">
    import {ref, watch} from 'vue'
    let sum = ref(0)

    function addSum(){
        sum.value += 1
    }

    // 监控的对象，回调函数(新的值, 旧的值)
    const stopWatch = watch(sum, (newValue, oldValue)=>{
        console.log(newValue, oldValue)
        if (newValue > 5) {
            stopWatch() // 停止监视
        }
        
    }) 
</script>


2. 情况二：监控ref定义的对象类型的数据，直接写数据名监控的是地址，如果想要监控对象的值的改变，需要开启深度监控模式
<template>
    <div>
        <h2> 姓名：{{person.name}} </h2>
        <h2> 年龄：{{person.age}} </h2>
        <button @click="changeName">修改Name</button>
        <button @click="changeAge">修改Age</button>
        <button @click="changeInfo">修改信息</button>
    </div>
</template>

<script setup lang="ts" name = "Vue3Person">
    import {ref, watch} from 'vue'
    let person = ref({
        name: "张三",
        age: 18
    })

    function changeName() {
        person.value.name += "~"
    }

    function changeAge(){
        person.value.age += 1
    }

    function changeInfo(){
        person.value = {name: "李四", age: 30}
    }

    // watch, 这样只有调用changeInfo改变person的时候会进行监控
    // const stopWatch = watch(person, (newVal, oldVal) => {
    //     console.log(newVal, oldVal)
    // })

    // 开启深度监控，监控对象值的改变， watch函数中的第三个参数
    // 这样无论是修改对象的值，还是修改整个对象都会被监控
    // 如果修改的是对象的属性，那么newVal和oldVal是同一个对象
    // 如果修改的是对象，那么newVal和oldVal不是同一个对象了
    // const stopWatch = watch(person, (newVal, oldVal) => {
    //     console.log(newVal, oldVal)
    // }, {deep: true})

    // 在实际开发中一般只关注新的值，不关注旧值, 第二个参数的匿名函数中使用一个便来来接受新值
    const stopWatch = watch(person, (val) => {
        console.log(val)
    }, {deep: true})
</script>
    
    
3. 情况三：监控reactive定义的对象，默认开启了深度监控
<template>
    <div>
        <h2> 姓名：{{person.name}} </h2>
        <h2> 年龄：{{person.age}} </h2>
        <button @click="changeName">修改Name</button>
        <button @click="changeAge">修改Age</button>
        <button @click="changeInfo">修改信息</button>
    </div>
</template>

<script setup lang="ts" name = "Vue3Person">
    import {reactive, watch} from 'vue'
    let person = reactive({
        name: "张三",
        age: 18
    })

    function changeName() {
        person.name += "~"
    }

    function changeAge(){
        person.age += 1
    }

    function changeInfo(){
        Object.assign(person, {name: "李四", age: 30})
    }

	// 和情况二相同
    const stopWatch = watch(person, (newVal, oldVal) => {
        console.log(newVal, oldVal)
    })

    // const stopWatch = watch(person, (val) => {
    //     console.log(val)
    // })
</script>
    
    
4. 情况四：监控ref或者reactive定义的对象中 某个 属性的数据改变
<template>
    <div>
        <h2> 姓名：{{person.name}} </h2>
        <h2> 年龄：{{person.age}} </h2>
        <h3> 汽车: {{ person.car.c1 }}, {{ person.car.c2 }}</h3>
        <button @click="changeName">修改Name</button>
        <button @click="changeAge">修改Age</button>
        <button @click="changeInfo">修改信息</button>
        <button @click="changeC1">修改C1</button>
        <button @click="changeC2">修改C2</button>
        <button @click="changeCar">修改Car</button>

    </div>
</template>

<script setup lang="ts" name = "Vue3Person">
    import {reactive, watch} from 'vue'
    let person = reactive({
        name: "张三",
        age: 18,
        car: {
            c1: "奔驰",
            c2: "宝马"
        }
    })

    function changeName() {
        person.name += "~"
    }

    function changeAge(){
        person.age += 1
    }

    function changeInfo(){
        Object.assign(person, {name: "李四", age: 30})
    }

    function changeC1() {
        person.car.c1 = "大众"
    }

    function changeC2() {
        person.car.c2 = "Link"
    }

    function changeCar() {
        person.car = {c1: "雅迪", c2: "雅马哈"}
    }

    // 监控 一个函数，返回一个值（getter函数）

    // 监控的是对象的属性，这个属性是基本类型
    // 只要name属性发生修改的时候就会监控，
    // const stopWatch = watch(() => {
    //     return person.name
    // }, (newVal, oldVal) => {
    //     console.log(newVal, oldVal)
    // })

    // 等价于上面的写法
    // const stopWatch = watch(() => person.name, (newVal, oldVal) => {
    //     console.log(newVal, oldVal)
    // })


    // 监控的是对象的属性，这个属性也是对象
    const stopWatch = watch(() => person.car, (newVal, oldVal) => {
        console.log(newVal, oldVal)
    }, {deep: true})
</script>
    
    
5. 情况五：监视上述多个数据， 
<template>
    <div>
        <h2> 姓名：{{person.name}} </h2>
        <h2> 年龄：{{person.age}} </h2>
        <h3> 汽车: {{ person.car.c1 }}, {{ person.car.c2 }}</h3>
        <button @click="changeName">修改Name</button>
        <button @click="changeAge">修改Age</button>
        <button @click="changeInfo">修改信息</button>
        <button @click="changeC1">修改C1</button>
        <button @click="changeC2">修改C2</button>
        <button @click="changeCar">修改Car</button>

    </div>
</template>

<script setup lang="ts" name = "Vue3Person">
    import {reactive, watch} from 'vue'
    let person = reactive({
        name: "张三",
        age: 18,
        car: {
            c1: "奔驰",
            c2: "宝马"
        }
    })

    function changeName() {
        person.name += "~"
    }

    function changeAge(){
        person.age += 1
    }

    function changeInfo(){
        Object.assign(person, {name: "李四", age: 30})
    }

    function changeC1() {
        person.car.c1 = "大众"
    }

    function changeC2() {
        person.car.c2 = "Link"
    }

    function changeCar() {
        person.car = {c1: "雅迪", c2: "雅马哈"}
    }

	// 监控person.name 以及 person.car.c1
    // 监控多个，多个匿名函数，放到数组里面
	// 如果是多个简单的ref值，直接放到数组里
    let ar = [()=>person.name, ()=>person.car.c1]
    const stopWatch = watch(ar, (newVal, oldVal) => {
        console.log(newVal, oldVal)
    }, {deep: true})
</script>
```



9. watchEffect：比watch方便

```js
使用watch需要明确指定要监控哪个具体的对象或者属性
使用watchEffect不需要明确的指出需要某个具体的对象或者属性，对于需要监控多个对象或者属性的时候，比较方便

<template>
    <div>
        <h2>当前求和为： {{sum}}</h2>
        <button @click="addSum">点我+1</button>
    </div>
</template>

<script setup lang="ts" name = "Vue3Person">
    import {ref, watchEffect} from 'vue'
    let sum = ref(0)

    function addSum(){
        sum.value += 1
    }

    // 自动监控
    const stopWatch = watchEffect(() => {
        console.log(sum.value)
    })
</script>
```



10. 标签的ref属性，做标记，不同组件之间是隔离的

```js
1. ref添加在HTML标签上，拿到的是dom元素
<template>
    <div>
        <h1>中国</h1>
        <h2 ref="title_h2">北京</h2>
        <h3>颐和园</h3>
        <button @click="showH2">点我显示H2这个元素</button>
    </div>
</template>

<script setup lang="ts" name = "Vue3Person">
    import {ref} from 'vue'

    // 用于存储在template中ref标记的内容
    let title_h2 = ref() // 这里的ref表示是响应式的，变量的名字必须要和template中ref的名字一致
    
    function showH2(){
        console.log(title_h2.value)
    }
</script>


2. ref添加在Vue组件上，拿到的是组件实例对象
子组件：
<template>
    <div>
        <h1>中国</h1>
        <h2 ref="title_h2">北京</h2>
        <h3>颐和园</h3>
        <button @click="showH2">点我显示H2这个元素</button>
    </div>
</template>

<script setup lang="ts" name = "Vue3Person">
    import {ref, defineExpose} from 'vue'

    // 用于存储在template中ref标记的内容
    let title_h2 = ref() // 这里的ref表示是响应式的，变量的名字必须要和template中ref的名字一致
    
    let a = ref(0)
    let b = ref(1)
    let c = ref(2)

    function showH2(){
        console.log(title_h2.value)
    }

    // 将对象暴露给父组件
    defineExpose({a, b, c})
</script>

父组件：
<template>
  <PersonVue3 ref = "person3"/>
  <button @click="show">测试</button>
</template>

<script setup lang="ts" name = "app">
import PersonVue3 from './components/Person/Person-Vue3.vue'  // 引入组件
import {ref} from 'vue'

// 这里获取到的是组件的实例对象，在子组件中没有通过defineExpose暴露的对象在父组件中是获取不到的
let person3 = ref()

function show(){
  console.log(person3.value)
}

</script>
```



11. TS相关语法， ts文件 xxx.ts

```typescript
1. 接口

在/src/types/index.ts	
# 使用index.ts引入只需要到types目录即可，
# import {type xx} from '@/types' 其中@表示到/src目录

// 定义接口并且暴露给外部使用
export interface PersonInterface{
    id: string
    name: string
    age: number
    address: string
    x?: number    // 这个问好表可有可无，如果不适用问号标注则该属性一定要定义
}

// 使用
<script setup lang="ts" name = "Vue3Person">
    // 引入接口
    import {type PersonInterface} from '@/types'
    let person: PersonInterface = {id:"410326", name: "张三", age: 18, address: "河南省洛阳市汝阳县", }
</script>

    
2. 泛型， 类比于java
let personList: Array<PersonInterface> = [{id:"410326", name: "张三", age: 18, address: "河南省洛阳市汝阳县"}]

// reactive使用泛型
let personList = reactive<Persons>([
  {id: "410326", name: "张三", age: 18, address:"河南省洛阳市汝阳县"},
  {id: "410327", name: "李四", age: 18, address:"河南省洛阳市伊川县"},
  {id: "410328", name: "王五", age: 18, address:"河南省洛阳市栾川县"},
])


3. 自定义类型
// 自定义类型，暴露给外部使用
export type Persons = Array<PersonInterface>
// export type Persons = PersonInterface[]   // 这种写法也可以    
    
// 使用
# 引入, 需要使用type关键字
import {type Persons} from '@/types'
# 使用自定义类型
let personList1: Persons = [{id:"410326", name: "张三", age: 18, address: "河南省洛阳市汝阳县"}]

```



12. props，在子组件中接受父组件传递过来的数据

```typescript
需求：父组件（APP）中的数据，在子组件（PersonVue3）中展示

父组件：
<template>
   <!-- :变量名="script中定义的变量明"  冒号 执行表达式 -->
  <PersonVue3 :listData="personList"/>  
</template>

<script setup lang="ts" name = "app">
import PersonVue3 from '@/components/Person/Person-Vue3.vue'  // 引入组件
import { type Persons } from '@/types';
import { reactive } from 'vue';

let personList = reactive<Persons>([
  {id: "410326", name: "张三", age: 18, address:"河南省洛阳市汝阳县"},
  {id: "410327", name: "李四", age: 18, address:"河南省洛阳市伊川县"},
  {id: "410328", name: "王五", age: 18, address:"河南省洛阳市栾川县"},
])

</script>



子组件：
<template>
    <div>
        <ul>
            <li v-for="item in listData" :key="item.id">{{ item.name }}-{{ item.age }}-{{ item.address }}</li>
        </ul>

        <h3> selfParas: {{ selfParas }} </h3>
    </div>
</template>

<script setup lang="ts" name = "Vue3Person">
    import { type Persons } from '@/types';
    import { withDefaults } from 'vue';

    // defineProps是内置的函数，不需要引入
    // 通过泛型指定接受参数的类型
    // 这个参数可以直接在template中使用，
    // defineProps可以接受,存储成一个变量，这样可以在脚本中使用
    // 这里这个?表示不一定需要传入，
    // let prop = defineProps<{listData?: Persons, selfParas?: number}>()
    // console.log(prop.listData)
    

    // 给传递过来的参数指定默认值
    let prop = withDefaults(defineProps<{listData?: Persons, selfParas?: number}>(), {
        listData: () => [{id: "", name: "", age: 0, address: ""}], // 必须是函数返回一个值
        selfParas: () => 10   // 必须是函数返回一个值
    })

    prop.listData

</script>
```



13. 生命周期

```typescript
// vue2
1. 创建（创建之前 beforeCreate，创建完毕 created）
2. 挂载（挂载之前 beforeMount，挂载完毕 mounted）
3. 更新（更新之前 beforeUpdate，更新完毕 updated）
4. 销毁（销毁之前 beforeDestroy，销毁完毕 destroy）

// vue3
setup在beforeCreate之前
1. 创建（创建之前 beforeCreate，创建完毕 created）  --> 在vue3中 setup代替了这两个函数

2. 挂载（挂载之前 beforeMount，挂载完毕 mounted）   --> onBeforeMount, onMounted 通过 import { onBeforeMount, onMounted } from'vue' 来引入
用法：
<script setup lang="ts" name = "Vue3Person">
    import { onBeforeMount, onMounted } from'vue'
    onBeforeMount(()=>{ 在这里定义挂载前想要执行的逻辑 })
	onMounted(()=>{ 在这里定义挂载之后想要执行的逻辑 })
</script>

3. 更新（更新之前 beforeUpdate，更新完毕 updated） --> onBeforeUpdate, onUpdate 通过 import { onBeforeUpdate, onUpdate } from'vue' 来引入
用法：
<script setup lang="ts" name = "Vue3Person">
    import { onBeforeUpdate, onUpdate } from'vue'
    onBeforeUpdate(()=>{ 在这里定义更新前想要执行的逻辑 })
	onUpdate(()=>{ 在这里定义更新之后想要执行的逻辑 })
</script>

4. 销毁（销毁之前 beforeDestroy，销毁完毕 destroy） --> onBeforeUnmount, onUnmount 通过 import { onBeforeUnmount, onUnmount } from'vue' 来引入
用法：
<script setup lang="ts" name = "Vue3Person">
    import { onBeforeUnmount, onUnmount } from'vue'
    onBeforeUnmount(()=>{ 在这里定义销毁前想要执行的逻辑 })
	onUnmount(()=>{ 在这里定义销毁之后想要执行的逻辑 })
</script>


### 子组件先挂载，父组件之后再挂载 ###
```



14. 自定义钩子Hooks

```typescript
在setup中，如果有很多数据以及function，那么和vue2就相同了
Hooks就是为了将相关的function和数据都放在一起

#类比java就是想对某一类功能的方法和数据全部抽取到一个class类中，但是在这里时将其抽取到一个ts文件中。
#在这个ts文件中通过：
export default function() {
    // 正常定义数据
    // 正常定义方法
    // 可以在这里写生命周期函数
    return {数据1, 数据2, .. 方法1, 方法2， ..}
}
# 

例子：一个组件中（Vue3Person.vue）有2个方法，一个求和，一个获取小狗的图片。将对应的数据和方法放在一起。
新建一个文件夹 /src/hooks  在hooks中的文件命名应该是useXXX.ts/useXXX.js
创建了两个ts文件分别是 useSum.ts / useDog.ts

1. useSum.ts
import {ref} from'vue'
// 将数据和方法放到一个函数中然后export出去
export default function() {
    // 数据
    let sum = ref<number>(0)

    // 方法
    function sumAdd(){
        sum.value += 1
    }

    // 生命周期的钩子函数也可以在这里写
    // onMounted(()=>{}) .. 等等
    
    // 向外部提供任意内容，可以是对象，或者数组，将数据和方法提供出去
    return {sum, sumAdd} 
    // return [sum, sumAdd]
}


2. useDog.ts
import {reactive} from'vue'
import axios from 'axios'  // 安装： npm i axios

// 将数据和方法放到一个函数中然后export出去
export default function() {
    // 数据
    let dogList = reactive([
        'https://images.dog.ceo/breeds/pembroke/n02113023_6962.jpg',
        'https://images.dog.ceo/breeds/pembroke/n02113023_894.jpg',
        'https://images.dog.ceo/breeds/pembroke/n02113023_4893.jpg'
    ])

    // 方法
    // await 和 async配合使用
    async function addDog(){
        // try catch 捕获 axios的一场， 也可以使用axios拦截器来处理所有异常
        try {
            // https://dog.ceo/api/breed/pembroke/images/random  ==> 随机获取一张狗的网址
            let response = await axios.get('https://dog.ceo/api/breed/pembroke/images/random')
            console.log(response)
            let doggyUrl = response.data.message   // 小狗图片的url
            dogList.push(doggyUrl)  // 添加到list中
            console.log(dogList)
        } catch (error) {
            alert(error)
        }
    }
    
    // 生命周期的钩子函数也可以在这里写
    // onMounted(()=>{}) .. 等等

    // 向外部提供任意内容，可以是对象，或者数组，将数据和方法提供出去
    return {dogList, addDog}
    // return [dogList, addDog]
}

3. 组件Vue3Person.vue
<template>
    <div>
        <h2> sum:{{ sum }} </h2>
        <button @click="sumAdd">点我+1</button>
        <hr/>
        <img v-for="(item, index) in dogList" :key="index" :src="item" />
        <button @click="addDog">点我添加一只小狗</button>
          
    </div>
</template>

<script setup lang="ts" name = "Vue3Person">
    import useSum from '@/hooks/useSum';
    import useDog from '@/hooks/useDog';

    // 解构
    const {sum, sumAdd} = useSum()
    const {dogList, addDog} = useDog()
</script>
```



15. 路由

```typescript
# 1. 安装路由
npm i vue-router 



# 2. 在main.ts中注册路由器
import './assets/main.css'

import { createApp } from 'vue'   // 引入创建函数，用于创建应用
import App from './App.vue'       // 引入“根”组件，

import router from './router'

// createApp(App).mount('#app')    // 创建一个“根”组件，将其挂载到 id = "app" 的容器中， 这个容器在index.html中定义

// 创建应用
const app = createApp(App)

// 使用路由器
app.use(router)

// 挂载应用到app容器中
app.mount('#app')



# 3. 创建目录和文件
/src/router/index.ts

// 创建一个路由器并暴露
import {createRouter, createWebHistory} from 'vue-router'

// 引入需要展示的组件
import HomePage from '@/views/navigate/HomePage.vue'
import AboutPage from '@/views/navigate/AboutPage.vue'
import NewsPage from '@/views/navigate/NewsPage.vue'

// 创建路由器
const router = createRouter({
    history: createWebHistory(),  // 路由器工作模式
    routes:[   // 路由规则
        {
            name: 'zhuye',       // 路由名称
            path: '/home',       // 路径
            component: HomePage   // 组件
        },
        {
            name: 'xinwen',			// 路由名称
            path: '/news',       // 路径
            component: NewsPage   // 组件
        },
        {
            name: 'guanyu',				// 路由名称
            path: '/about',       // 路径
            component: AboutPage   // 组件
        }
    ] 
})

export default router



# 4. 使用路由
<template>
  <div class = "app">
    <h2 class="title">Vue3路由</h2>

    <!-- 导航区域 -->
    <div class="navigate">
      <!-- RouterLink类似于a标签，其中的to类似于href，active-class表示被选中的时候的样式 -->
      <RouterLink to="/home" active-class="active">首页</RouterLink>
      <RouterLink :to="{name: 'xinwen'}" active-class="active">新闻</RouterLink>  <!-- to的另外一种写法，是一个对象，使用了路由的名字，等价于。to="/news" -->
      <RouterLink :to="{path: '/about'}" active-class="active">关于</RouterLink>  <!-- to的另外一种写法，是一个对象，使用了路由的路径，等价于。to="/about" -->
    </div>

    <!-- 内容区域 -->
    <div class="main-content">
      <!-- RouterView类似于一个路由占位符，通过路由映射的组件会在这里挂载 -->
      <RouterView></RouterView>
    </div>

  </div>
</template>

<script setup lang="ts" name = "app">
  // 通过routerView这个组件，将路由对应的组件挂载到这里
  // RouterLink 类似于 a标签, 实现路由的跳转
  import {RouterView, RouterLink} from 'vue-router' 

</script>



### 5. 路由器工作模式 ###
1. history: createWebHistory(),  // 路由器工作模式，history模式，在路由中不带有#号
  // 优点：url更加美观， 缺点：兼容性不够好，需要后端配合处理路径问题，否则刷新会有404这个错误
const router = createRouter({
    history: createWebHistory()
}
2. history: createWebHashHistory(),  // 路由器工作模式，hash模式，在路由中带有#号
  // 优点：url兼容更好，不需要后端做处理， 缺点：不太美观，seo优化方面较差
const router = createRouter({
    history: createWebHashHistory()
}
####


                            
6. 嵌套路由：
访问/news这个路由，挂载News.vue这个组件，在这个组件中有子组件Details.vue
访问/news/defails, 挂载Details.vue到News.vue中
                            
// 创建路由器
import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import HomePage from '@/views/navigate/HomePage.vue'  // 引入组件,需要用到的组件都引入
const router = createRouter({
    history: createWebHistory(),  // 路由器工作模式
    routes:[   // 路由规则
        {
            name: 'zhuye',
            path: '/home',       // 路径
            component: HomePage   // 组件
        },
        {
            name: 'xinwen',
            path: '/news',       // 路径
            component: NewsPage,   // 组件
            children: [         // 嵌套路由，子路由
                {
                    name: 'xiangqing',
                    // path: 'detail',             			 // query这样定义
                    path: 'detail/:id/:title?/:content?',  // params这样定义， 类比于gin中的路径参数，问号表示是否一定要传递。
                    component: NewsDetailVue
                }
            ],
        },
        {
            name: 'guanyu',
            path: '/about',       // 路径
            component: AboutPage   // 组件
        }
    ] 
})
  


7. 路由参数
query参数： /news/defails?a=哈哈&b=呵呵
传递参数：
方式1:
<RouterLink :to="`/news/detail?id=${item.id}&title=${item.title}&content=${item.content}`"> {{ item.title }} </RouterLink>

方式2:
<RouterLink 
  :to="{
          path: '/news/detail',
          query: {
              id: item.id,
              title: item.title,
              content: item.content,
          },
      }"
>
  {{ item.title }}
</RouterLink>

接受参数：
<template>
    <div>
        <h3>编号：{{ query.id }}</h3>
        <h3>标题：{{ query.title }}</h3>
        <h3>内容：{{ query.content }}</h3>
    </div>
</template>

<script lang="ts" setup name="NewsDetails">

    import { toRefs } from 'vue';
    import { useRoute } from 'vue-router';  // 一个hooks，用于接受query和params的参数
    let route = useRoute()
    console.log(route)
    let {query} = toRefs(route)			// 解构，使ttoRefs将其变成响应式
</script>
    
    
params参数：
方式1:
<RouterLink :to="`/news/detail/${item.id}/${item.title}/${item.content}`"> {{ item.title }} </RouterLink>

方式2:
<RouterLink 
    :to="{
            // path: '/news/detail',
            name: 'xiangqing',  // 如果是params只能是name，写path不行，在路由处必须定义 路径参数
            params: {
                id: item.id,
                title: item.title,
                content: item.content,
                // params 不能传递数组
            },
        }"
>
    {{ item.title }}
</RouterLink>

接受参数：
<template>
    <div>
        <h3>编号：{{ params.id }}</h3>
        <h3>标题：{{ params.title }}</h3>
        <h3>内容：{{ params.content }}</h3>
    </div>
</template>


<script lang="ts" setup name="NewsDetails">

    import { toRefs } from 'vue';
    import { useRoute } from 'vue-router';  // 一个hooks，用于接受query和params的参数
    let route = useRoute()
    
    console.log(route)

    let {params} = toRefs(route)
</script>
    
    
路由规则的props配置：
1. 在router中配置props: true				# 这种方式只能和params配合使用
{
    name: 'xinwen',
    path: '/news',       // 路径
    component: NewsPage,   // 组件
    children: [         // 嵌套路由，子路由
        {
            name: 'xiangqing',
            // path: 'detail',             // 子路由不需要 /
            path: 'detail/:id/:title?/:content?',             // 路径参数，在vue中是params， 类比于gin中的路径参数
            component: NewsDetailVue,
            props: true							// 这里设置为true ## 这种方式只能和params配合使用.
        }
    ],
},
  
接受端:
<template>
    <div>
        <h3>编号：{{ id }}</h3>
        <h3>标题：{{ title }}</h3>
        <h3>内容：{{ content }}</h3>
    </div>
</template>

<script lang="ts" setup name="NewsDetails">
    // defineProps(['id', 'title', 'content'])
    defineProps<{id: string, title: string, content: string}>()
</script>

  
  
2. 在router中配置props: (route)=>{ return 一个对象 } 				# 这种方式可以配合query和params,自己决定
{
    name: 'xinwen',
    path: '/news',       // 路径
    component: NewsPage,   // 组件
    children: [         // 嵌套路由，子路由
        {
            name: 'xiangqing',
            // path: 'detail',      // 子路由不需要 /
            path: 'detail/:id/:title?/:content?',   // 路径参数，在vue中是params， 类比于gin中的路径参数
            component: NewsDetailVue,

            // props: true, // 写法一: 将路由收到的所有params参数传作为props传递给组件 --> 只能和params配合使用,必须要配置路径参数, 在组件中只能使用name
            // 写法二: 可以决定将query或者params参数作为props传递给组件, props 作为一个组件
            props: (route) => {     // 这里接受的就是一个route对象.
                // console.log(route)
                return route.params // 直接将params或者query返回即可
            }
        }
    ],
},
  
接受端:
<template>
    <div>
        <h3>编号：{{ id }}</h3>
        <h3>标题：{{ title }}</h3>
        <h3>内容：{{ content }}</h3>
    </div>
</template>

<script lang="ts" setup name="NewsDetails">
    // defineProps(['id', 'title', 'content'])
    defineProps<{id: string, title: string, content: string}>()
</script>



8. 路由的模式:
push模式: 将浏览记录添加到一个栈中,后续的浏览记录会被push到这个栈中, 可以前进或者后退(默认是这种模式)

replace模式: 将浏览记录添加到一个栈中,后续的浏览记录会替换掉之前的浏览记录,所以栈中只有一条,不可以前进或者后退
在RouterLink标签上添加 replace:  <RouterLink replace to="/home" active-class="active">首页</RouterLink>



9. 编程式导航:  通过ts或者js脚本实现路由跳转. ==> 脱离RouterLink实现路由跳转
有一个需求: 打开主页3秒之后跳转到新闻页面
<script lang="ts" setup name="HomePage">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';  // useRoute用于接受参数,  useRouter是一个路由器用于控制跳转

    const router = useRouter()
    onMounted(() => {
        setTimeout(()=> {
            // 在此编写代码让实现路由跳转, push模式
            router.push('/news')
            useRouter
        }, 3000)
    })
</script>


需求二: 在新闻标题之前添加一个按钮, 点击显示新闻详情

新闻列表组件:
<template>
    <div>
        <ul>
            <li v-for="item in newslist" :key="item.id">
                <!-- 模板字符串 -->
                <!-- 第一种写法 -->
                <!-- <RouterLink :to="`/news/detail?id=${item.id}&title=${item.title}&content=${item.content}`"> {{ item.title }} </RouterLink> -->
            
                <!-- 第二种写法 -->
                <button @click="showNewsDetail(item)"> 点击查看详情 </button>
                <RouterLink 
                    :to="{
                            // path: '/news/detail',
                            name: 'xiangqing',  // 如果是params只能是
                            params: {
                                id: item.id,
                                title: item.title,
                                content: item.content,
                            },
                        }"
                >
                    {{ item.title }}
                </RouterLink>
            </li>
        </ul>
    </div>

    <div>
        <RouterView></RouterView>
    </div>
</template>

<script lang="ts" setup name="NewsPage">
    import { reactive } from 'vue';
    import { RouterView , RouterLink, useRouter} from 'vue-router';
    
    let newslist = reactive([
        {id: "0001", title: "消息1111", content: "今天吃手抓饭"},
        {id: "0002", title: "消息2222", content: "晚上打游戏"},
        {id: "0003", title: "消息3333", content: "写vue代码"},
        {id: "0004", title: "消息4444", content: "系统测试"},

    ])

    const router = useRouter()   // 路由器,用于控制路由,

    interface News{
        id: string,
        title: string,
        content: string
    }

    function showNewsDetail(item: News) {
        // router.push   router/replace   和 routerLink中的to的写法完全一致
        // router.push('/')
        // router.push({path: '/'})
        router.push({name: 'xiangqing', params: {
            id: item.id,
            title: item.title,
            content: item.content,
        }})
    }
</script>

新闻详情组件:
<template>
    <div>
        <h3>编号：{{ id }}</h3>
        <h3>标题：{{ title }}</h3>
        <h3>内容：{{ content }}</h3>
    </div>
</template>

<script lang="ts" setup name="NewsDetails">
    // defineProps(['id', 'title', 'content'])
    defineProps<{id: string, title: string, content: string}>()
</script>



10. 重定向
在/src/router/index.ts 一级目录中配置,
{
    name: 'default',
    path: '/',
    redirect: '/home'      // 重定向
}
```



16. 1.集中式状态管理工具: Pinia

```typescript
什么时候使用集中式状态管理工具(vuex, pinia)?
多个组件之间需要共享数据, 将这些共享的数据交给状态管理工具去管理, 例如登陆成功之后将jwt的token存储起来.

1. 安装
npm i pinia

2. 使用paina, 在main.ts 中定义
import {createPinia}  from 'pinia'  // 引入pinia
// 创建应用
const app = createApp(App)

// 创建pinia
const pinia = createPinia()

// 使用Pinia
app.use(pinia)

... 使用其他组件以及挂载到App容器中

3. 创建目录文件, 用于存储数据, 也可以定义修改数据的方法
/src/store/xxx.ts   创建的文件应该和某个需要保存数据到pinia的组件名相同.  例如 News.vue ==> News.ts

News.ts 
import {defineStore} from 'pinia'

const useNewsStore = defineStore('new', {
  	// 用于存储数据
    // state 用于存储数据, 必须要定义成函数的形式, 并且在这个函数中要返回一个对象
    // 写法一:
    state(){
        return {id: '18888', title: 'news', content: 'news111'}
    }, 
    // 写法二:
    // state: ()=> {
    //     return {id: '18888', title: 'news', content: 'news111'}
    // }, 

  	// 定义修改数据的方法
    // actions 在这里可以自定义函数, 通过useNewsStore.functionName() 来执行, 例如修改数据什么的. 这是修改数据的第三种方式
    actions: {
        updateNews(val:any){
            this.id = val.id
            this.title = val.title
            this.content = val.content
        }

        // 想要使用this, 就不能写成箭头函数
        // updateNews1: (val:any)=> {
        //     this.id = val.id
        // }
    },
  
  	// 类似于计算属性, 当属性的值发生了变化, 会调用这里的方法
    getters: {
        // 定义属性 upperTitle, 是一个函数函数, 参数是上面定义的state, 返回一个值, 通过upperTitle这个属性名可以拿到这个值
        upperTitle(state) {
            return  state.title.toUpperCase()
        }
    }
})

export default useNewsStore

4. 读取/修改数据
<template>
    <div>
        <h3>编号：{{ newStore.id }}</h3>
        <h3>标题：{{ newStore.title }}</h3>
        <h3>内容：{{ newStore.content }}</h3>
				<h3>upperTitle:: {{ newsStore.upperTitle }}</h3>
				<hr/>

        <h3>编号：{{ id }}</h3>
        <h3>标题：{{ title }}</h3>
        <h3>内容：{{ content }}</h3>
				<h3>upperTitle:: {{ upperTitle }}</h3>
        <hr/>

        修改编号: <input type="text" v-model="bianhao"/>
        修改标题: <input type="text" v-model="biaoti"/>
        修改内容: <input type="text" v-model="neirong"/>
        <button @click="updateNews"> 修改 </button>

    </div>
</template>

<script lang="ts" setup name="NewsDetails">
    // defineProps(['id', 'title', 'content'])
    // defineProps<{id: string, title: string, content: string}>()

    import { ref } from 'vue';
    import useNewsStore from '@/store/News'
    const newStore = useNewsStore()
    // console.log(newStore)

    // 这两种方式都可以从pinia中读取数据
    // newStore.id
    // newStore.$state.id

    // 解构遇到的问题.
    // 直接解构会失去响应式 --- 不要使用
    // let { id, title, content } = newsStore

    // 使用toRefs 会让一些没有必要的属性变成 响应式的, 代价比较高 ---  不要使用
    // let { id, title, content } = toRefs(newsStore)

    // 读取数据将其转换成相应式的, 使用storeToRefs
    let { id, title, content, upperTitle } = storeToRefs(newsStore)

    let bianhao = ref('')
    let biaoti = ref('')
    let neirong = ref('')

    // 第一个参数是本次修改的信息, state是修改后的数据, 类似于watch
    newsStore.$subscribe((mutate, state)=>{
        console.log(mutate)
        console.log(state)
    })
    
    function updateNews() {
        // 修改数据
        // 方式一: 直接修改,  如果需要修改多个值,这种方式多次调用计算.
        // newStore.id = bianhao.value
        // newStore.title = biaoti.value
        // newStore.content = neirong.value

        // 方式二: 使用内置函数 $patch,  可以指定需要修改的值, 如果修改多个数据只需要一次变更, 推荐使用这种方法.
        // newStore.$patch({
        //     id: bianhao.value,
        //     title: biaoti.value,    
        //     content: neirong.value
        // })

        // 方式三: 使用actions中定义的函数, 个人是感觉这种方式舒服一些.类似于hooks了, 可以定义更加复杂的逻辑. 复用性更好.
        newStore.updateNews({
            id: bianhao.value,
            title: biaoti.value,
            content: neirong.value,
        })

        console.log(newStore)
    }
</script>


5. 订阅, 监控数据
xxxStore.$subscribe
// 第一个参数是本次修改的信息, state是修改后的数据, 类似于watch
newsStore.$subscribe((mutate, state)=>{
    console.log(mutate)
    console.log(state)
})


6. store的组合式写法: defineStore方法的第二个参数不再是对象了,而是一个函数,将数据和方法以对象的形式进行return
News.ts 
// 组合式写法 --》 和 hooks 相同了
import {defineStore} from 'pinia'
import { reactive } from 'vue'
const useNewsStore = defineStore('news', () => {

    // 数据 --> state
    let news = reactive({id: '18888', title: 'news', content: 'news111'})

    // 方法
    function updateNews(val:any){
        news.id = val.id
        news.title = val.title
        news.content = val.content
    }

    // 返回, 
    return {news, updateNews}
})

export default useNewsStore

使用方式和之前的一样.
```



16. 组件通信

```typescript
1. props:  [使用频率最高的, 如果有多层嵌套的组件进行数据传递不要使用这种方式]
使用props进行数据传递的时候,父组件可以直接向子组件传递值, 当子组件向父组件传递值的时候, 父组件需要先向子组件传递一个函数, 子组件在调用这个函数的时候将子组件中的数据*作为函数的参数*传递给父组件.

父组件代码:
<template>
    <div>
        <h2>父组件, 有一辆Car: {{ fatherCar }}, 儿子有一辆Car: {{ childData }}</h2>
        <PropChild :fatherData="fatherCar" :sendData="getChildData"></PropChild>
    </div>
</template>

<script lang = 'ts' setup name = 'PropFather'>
    import PropChild from "@/views/01_props/Child.vue";
    import { ref } from "vue";
    let fatherCar = ref<string>('奔驰')
    
    let childData = ref<string>()

    // 将一个函数传递给子组件, 子组件在调用这个函数的时候,将数据 *作为参数* 传递给父组件
    // 这个方法用于接受子组件传递过来的数据,
    function getChildData(val: string) {
        childData.value = val
    }
</script>

子组件代码:
<template>
    PropsChild, 父亲有一辆Car: {{ fatherData }}, 自己有一辆Car: {{ childCar }} <br/>
    <button @click="sendData(childCar)">调用父组件中的方法,将子组件中的数据传递给父组件</button>
</template>

<script setup lang="ts" name ="PropsChild">
    import {ref} from 'vue'
    let childCar = ref('宝马')

    // 通过props接受两个参数
    // 第一个是string类型的
    // 第二个接受一个函数, 这个函数的返回类型是void, 函数的参数个数为1个,且类型为string
    defineProps<{fatherData: string, sendData: (val: string)=>void }>()
</script>



2. event:  专门用于子组件向父组件传递数据. 在子组件的标签上自定义一个事件并且给出一个回调的函数, 在子组件中注册这个自定义事件, 并且在合适的事机(触发click, 挂载等等)触发这个事件. 在调用这个事件的时候传递值, 在自定义事件的回掉函数中可以拿到这个值, 这样就实现了子向父传递数据.

父组件:
<template>
    <div>
        <h3>父组件</h3>
        <h4>{{ childData }}</h4>
        <!-- @get-child-data是一个自定义的事件, 需要在子组件中注册, 回调函数是getData -->
        <EventChild @get-child-data="getData"></EventChild>
    </div>
</template>

<script lang = 'ts' setup name = 'EventFather'>
    import EventChild from "@/views/02_event/Child.vue";
    import { ref } from "vue";
    let childData = ref('')
    function getData(data: string) {
        childData.value = data
    }

</script>

子组件:
<template>
    <h3>EventChild子组件</h3>
    <h4> 儿子拥有: {{ childData }} </h4>
    <!-- 两种调用函数的方法都可以 -->
    <button @click="sendDataToFather"> 使用自定义事件向父组件发送数据 </button>
    <!-- <button @click="emit('get-child-data')"> 使用自定义事件向父组件发送数据 </button> -->
</template>

<script setup lang="ts" name ="EventChild">
    import { ref } from "vue"; 
    let childData = ref('奥特曼')

    // 注册自定义事件get-child-data
    let emit = defineEmits(['get-child-data'])
    // 触发get-child-data事件, 可以在不同的函数中调用.
    // emit('get-child-data', 需要传递的数据写在这里)

    function sendDataToFather(){
        emit('get-child-data', childData)  // 触发事件并且传递值, 这个值可以在事件的回掉函数中拿到
    }

</script>



3. mitt: 消息的订阅与发布, 可以实现任意组件之间的数据传递.
数据接收方提前订阅消息(注册事件), 数据发送方在合适的时机发布消息(调用事件,并且发送数据).
收数据 --> 绑定事件,     发数据 --> 调用事件

mitt可以实现事件的绑定(on), 事件的解绑(off), 调用事件(emit), 

npm i mitt  // 安装mitt
创建目录和文件 /src/utils/emitter.ts 内容如下:
import mitt from 'mitt'

const emitter = mitt()

export default emitter

## 实现两个子组件通信, 子组件1向子组件2发送数据.
子组件1:
<template>
    <h3>子组件1</h3>
    <h4> 我的玩具: {{ toy }} </h4>
</template>

<script setup lang="ts" name ="MittChild">
    import {ref} from 'vue'
    import emitter from '@/utils/emitter.ts'

    let toy = ref('奥特曼')

    // 调用事件, 发送数据
    emitter.emit('getChild1Data', toy.value)

</script>

子组件2:
<template>
        <h3>子组件2</h3>
        <h4> 我的电脑: {{ computer }} </h4>
        <h4> 我哥的玩具: {{  }}</h4>
</template>

<script setup lang="ts" name ="MittChild2">
    import {ref, onUnmounted} from 'vue'
    import emitter from '@/utils/emitter.ts'

    let computer = ref('联想')
    let toy = ref('')

    // 注册事件, 接受数据
    emitter.on('getChild1Data',(childData:any)=>{
        console.log('child1Dara: ', childData)
        toy.value = childData
    })

    // 组件卸载的时候解绑
    onUnmounted(()=>{
        emitter.off('getChild1Data')
    })
</script>



4. v-model:  实现父子组件数据的双向绑定.
一些自定义组件是通过这种方式实现数据传递的. [本质上只是用 defineProps 和 defineEmits 实现的]
defineProps 实现让子组件接受父组件的数据
defineEmits 实现父组件接受子组件的数据

#### 在原生事件和自定义事件中的$event
#### 对于原生事件, $event就是DOM事件本身, 需要 .target 才能继续获取到值.
#### 对于自定义事件, $event是触发事件的时候传递的数据. 直接就可以获取到值.

自定义组件:
<template>
    <input 
        type="text"
        :value="modelValue"   // 父组件传递过来的值
        // @input="sentdataTofather($event)"  // 触发自定义事件, 等价于下面的写法
				@input="emitter('update:modelValue', $event.target.value)" // 对于原生事件, $event就是事件本身.
    />
</template>

<script setup lang="ts" name ="MyInput">

    let props = defineProps(['modelValue'])   // 接受了父组件中传递的值, modelValue

    let emitter = defineEmits(['update:modelValue'])  // 接受了父组件传递过来的自定义事件, 事件名是 update:modelValue

    function sentdataTofather(event: Event){
        emitter('update:modelValue', event.target.value)
    }
</script>

父组件:
<template>
    <div>
        <!-- <My-Input v-model="username"></My-Input> -->
        <!-- <MyInput :modelValue="username" @update:modelValue="username = $event"></MyInput> -->  <!-- 这里的$event是接收到的数据 -->  // 对于自定义事件, $event是触发事件的时候传递的数据.
        <MyInput :modelValue="username" @update:modelValue="eventOn"></MyInput> <br/>
        username:: {{ username }}
    </div>
</template>

<script lang = 'ts' setup name = 'VModelFather'>
    import MyInput from "@/views/04_v-model/My-Input.vue"

    import {ref} from 'vue'

    let username = ref('张三')

    function eventOn(data: any) {
        username.value = data
    }
</script>



5. $attrs : 用于当前组件的父组件<->当前组件的子组件传递数据(祖<->孙)
原理: 父组件向子组件传递数据/函数, 如果在子组件中没有被props接受,那么这些数据会到一个变量$attrs中, 在子组件中只需要通过v-bind单向的向孙组件传递这个$attrs就可以了. 
如果孙组件向父组件传递数据, 和子组件向父组件传递数据是相同的, 由父组件传递一个函数到孙组件中, 孙组件在调用这个函数的时候传递值.

父组件:
<template>
    <div>
        <h4>a: {{ a }}</h4>
        <h4>b: {{ b }}</h4>
        <h4>c: {{ c }}</h4>
        <h4>d: {{ d }}</h4>

        <AttrsChild :a="a" :b="b" :c="c" :d="d" v-bind="{e: 5, f: 6}" :sendDataToGrandFather="getGrandChildData"></AttrsChild>
        <!-- v-bind="{e:5, f: 6}"  等价于  :e="5" :f="6"   -->

        <hr/>
        <h4>从孙组件得到的数据: {{ grandChildData }}</h4>
    </div>
</template>

<script lang = 'ts' setup name = 'AttrsFather'>
    import AttrsChild from "@/views/05_attrs/Child.vue";

    import { ref } from "vue";
    let a = ref(1)
    let b = ref(2)
    let c = ref(3)
    let d = ref(4)

    let grandChildData = ref('')
    function getGrandChildData(val: string) {
        grandChildData.value = val
    }

</script>


子组件:
<template>
    <!-- <h4>a: {{ a }}</h4>
    <h4>其他: {{ $attrs }}</h4> -->

    <AttrsGrandChild v-bind="$attrs"></AttrsGrandChild>

</template>

<script setup lang="ts" name ="AttrsChild">
    import AttrsGrandChild from "@/views/05_attrs/GrandChild.vue";
    // defineProps(['a'])  // 父组件传递的多个数据, 如果在这里接受了, 就不会出现在$attrs中了

</script>


孙组件:
<template>
    AttrsGrandChild
    <h4>attrs: {{ $attrs }}</h4>
    <h4>a: {{ a }}</h4>
    <h4>b: {{ b }}</h4>
    <h4>c: {{ c }}</h4>
    <h4>d: {{ d }}</h4>
    <h4>e: {{ e }}</h4>
    <h4>f: {{ f }}</h4>

    <hr/>
    <!-- 孙组件向父组件传递数据 -->
    <button @click="sendDataToGrandFather('pppppppp')">发送数据子祖先组件</button>
</template>

<script setup lang="ts" name ="AttrsGrandChild">
    defineProps<{ a: number,  b: number,  c: number,  d: number,  e: number,  f: number,  sendDataToGrandFather: (val: string) => void}>()
</script>



6. $refs 父组件->子组件,  $parent  子组件->父组件

$refs可以获取到所有使用ref="xxx"标记的子组件实例, 通过这些子组件的实例, 可以获取到子组件中暴露出来的对象
$parent可以获取到子组件对应父组件的实例, 在父组件中同样需要将对象暴露出来,这样子组件才可以获取得到.

父组件:
<template>
    <div>
        <h3>父组件</h3>
        <h4>房子: {{ house }}</h4>
        <button @click="updateChild1Toy">修改chiled1的玩具为小猪佩奇</button>
        <RefsAndParentChild ref="c1"></RefsAndParentChild>
        <button @click="updateChild2Computer">修改child2的电脑为小米</button>
        <RefsAndParentChild2 ref="c2"></RefsAndParentChild2>
        <button @click="getAllChilds($refs)">获取所有的子组件</button>
    </div>
</template>

<script lang = 'ts' setup name = 'RefsAndParentFather'>
    import RefsAndParentChild from "@/views/06_$refs-$parent/Child.vue";
    import RefsAndParentChild2 from "@/views/06_$refs-$parent/Child2.vue";

    import { ref } from "vue";
    let house = ref('大别野')

    let c1 = ref()      // 这里获得的是子组件中暴露的数据
    let c2 = ref()      // 这里获取的是子组件中暴露的数据

    function updateChild1Toy(){
        c1.value.toy = "小猪佩奇"
    }

    function updateChild2Computer(){
        c2.value.computer = "小米电脑"
    }

    function getAllChilds(childs: any) {   // 这里接受的是$refs对象, 这个对象包含了所有使用ref标记的子组件实力.
        // console.log(childs)
        console.log("c1:: ", childs.c1.toy)
        console.log("c2: ", childs.c2.computer)
    }

    defineExpose({house: house})  // 暴露对象给其他组件使用
</script>

子组件1:
<template>
    <h3>Child2</h3>
    <h4>玩具: {{ toy }}</h4>

    <button @click="updateFatherHouse($parent)">修改父亲的房子为豪宅</button>
</template>

<script setup lang="ts" name ="RefsAndParentChild">
    import { ref } from "vue";
    let toy = ref('奥特曼')

    defineExpose({toy: toy})  // 暴露对象给其他组件使用

    function updateFatherHouse(parent: any) {
        parent.house = "豪宅"
    }
</script>

子组件2:
<template>
    <h3>Child2</h3>
    <h4>电脑: {{ computer }}</h4>
    <button @click="updateFatherHouse($parent)">修改父亲的房子为大大大别墅</button>

</template>

<script setup lang="ts" name ="RefsAndParentChild2">
    import { ref } from "vue";
    let computer = ref('联想')

    defineExpose({computer})  // 暴露对象给其他组件使用

    function updateFatherHouse(parent: any) {
        parent.house = "大大大别墅"
    }
</script>



7. provide 向后代传递数据(子,孙,....都能拿到数据) , inject
## 使用attrs,会经过一个中间的组件, 而使用provide和inject不需要经过中间的组件, 可以实现直接的祖孙组件通信

父组件:
<template>
    <div>
        <h3>父组件</h3>
        <h4>money: {{ money }}</h4>
        <h4>一辆{{ car.brand }}车, 价格:{{ car.price }}, 购买时间: {{ car.buyTime }}</h4>
        <h4> 后代传递过来的数据: {{ dt }} </h4>
        <ProvideAndInjectChild></ProvideAndInjectChild>
    </div>
</template>

<script lang = 'ts' setup name = 'ProvideAndInjectFather'>
    import ProvideAndInjectChild from "@/views/07_provide-inject/Child.vue";

    import { ref, reactive, provide } from "vue";

    let money = ref(10000000)
    let car = reactive({
        brand: "奔驰",
        price: 1000000,
        buyTime: "2024-02-22"
    })

    provide('money', money)  // 向后代提供数据, 这里传递的应该是一个响应式的对象
    provide('car', car)  // 向后代提供数据, 这里传递的应该是一个响应式的对象

    let dt = ref('')
    function getData(val: string) {
        dt.value = val
    }

    provide("getData", getData)  // 向后代传递一个函数, 用于获取后代的数据.

</script>

子组件:
<template>
    <h3>子组件</h3>
    <ProvideAndInjectGrandChild></ProvideAndInjectGrandChild>
</template>

<script setup lang="ts" name ="ProvideAndInjectChild">
    import ProvideAndInjectGrandChild from "@/views/07_provide-inject/GrandChild.vue";
</script>

孙组件:
<template>
    <h3>孙子组件</h3>
    <h4>银子:: {{ money }}</h4>
    <h4>祖上的: 一辆{{ car.brand }}车, 价格:{{ car.price }}, 购买时间: {{ car.buyTime }}</h4>
    <button @click="sendData"> 发送数据“abccc”给祖组件 </button>
</template>

<script setup lang="ts" name ="ProvideAndInjectGrandChild">
    import { inject } from "vue";

    // 第一个参数是key, 第二个参数是默认值(通过默认值来指定数据类型),
    let money = inject('money', 888)  // inject用于接受provide提供的数据

    let car = inject('car', {brand: '未知', price: 0, buyTime: '0000-00-00'})

    let getData = inject('getData', (val: string)=>{})  // 祖上传递过来的函数

    function sendData(){
        getData('abccc')  // 调用这个函数用于向祖上传递数据.
    }
</script>

<style scoped>
</style>



8. pinia 参考之前的



9. slot(插槽): 页面具有相同的结构,但是数据不同, 通过同一个组件对不同的数据进行渲染.

// 占位符,

(1). 默认插槽: 占位符,  默认插槽的名字为default, 默认不需要写
父组件: 
<template>
    <div class="father">
        <div class="context">
            <Category :title="title1">
                <div>
                    内容1，这里的数据被添加到Category组件的solt中
                </div>
            </Category>

            <Category :title="title2">
                <div>
                    内容2，这里的数据被添加到Category组件的solt中
                </div>
            </Category>

            <Category :title="title3">
                <div>
                    内容3，这里的数据被添加到Category组件的solt中
                </div>
            </Category>
        </div>
    </div>
</template>

<script lang = 'ts' setup name = 'SlotFather'>
    import Category from "@/views/09_slot/Category.vue";
    import {ref} from 'vue';
    let title1 = ('标题1')
    let title2 = ('标题2')
    let title3 = ('标题3')
</script>

<style scoped>
    .father {
        background-color: rgb(165, 164, 164);
        padding: 10px;
        border-radius: 10px;
    }

    .context {
        display: flex;
        justify-content: space-evenly;
    }
</style>

子组件:
<template>
    <div>
        <h2>{{ title }}</h2>
        <slot></slot>  <!-- 组件中定义的内容会被显示到这里 -->
    </div>
</template>

<script setup lang="ts" name ="Category">
    defineProps<{title: string}>()
</script>
 
<style scoped>
    h3{
        background-color: orange;
    }
</style>


(2). 具名插槽: 有名字的占位符, 可以根据名字选择不同的占位符
// v-slot:s1 --> 将内容放到名字为s1的插槽中, 只能作用与 template标签和自定义组件标签上. 所以需要将想放进插槽中的内容放到template中. 在组件中可以定义不同的<slot name="插槽名字"><slot>来显示不同的内容. 使用v-slot:name 有一个语法糖: <template v-slot:s1>  ====>   <template #s1>  等价
父组件:
<template>
    <div class="father">
        <div class="context">
            <Category :title="title1">
                <template v-slot:s2>
                    <div>
                        内容1111，这里的数据被添加到Category组件的solt中
                    </div>
                </template>

                <template v-slot:s1>
                    <h2>标题1111</h2>
                </template>
            </Category>

            <Category :title="title1">
                <template v-slot:s2>
                    <div>
                        内容2222，这里的数据被添加到Category组件的solt中
                    </div>
                </template>

                <template v-slot:s1>
                    <h2>标题2222</h2>
                </template>
            </Category>

            <Category :title="title1">
                <template #s2>
                    <div>
                        内容3333，这里的数据被添加到Category组件的solt中
                    </div>
                </template>

                <template #s1>
                    <h2>标题3333</h2>
                </template>
            </Category>
        </div>
    </div>
</template>

<script lang = 'ts' setup name = 'SlotFather'>
    import Category from "@/views/09_slot/Category.vue";
    import {ref} from 'vue';
    let title1 = ('标题1')
    let title2 = ('标题2')
    let title3 = ('标题3')
</script>

<style scoped>
    .father {
        background-color: rgb(165, 164, 164);
        padding: 10px;
        border-radius: 10px;
    }

    .context {
        display: flex;
        justify-content: space-evenly;
    }
</style>

子组件:
<template>
        <slot name="s1">这是默认内容111</slot>  <!-- 组件中定义的内容会被显示到这里 -->
        <slot name="s2">这是默认内容222</slot>
</template>

<script setup lang="ts" name ="Category">
    defineProps<{title: string}>()
</script>
 
<style scoped>
    h3{
        background-color: orange;
    }
</style>


(3). 作用域插槽:
// 数据定义在子组件中, 在父组件中渲染数据需要用到子组件中的数据, 通过slot将数据传递给父组件.
父组件:
<template>
    <div class="father">
        <div class="context">
            <Category>
                <!-- 在子组件中通过slot标签传递的所有数据，都被放在了一个名字为params 的对象中了 --> 
                <template v-slot="params">
                    <ul>
                        <li v-for="g in params.youxi" :key="g.id">{{ g.name }}</li>
                    </ul>
                </template>
            </Category>

            <Category>
                <template v-slot="params">
                    <ol>
                        <li v-for="g in params.youxi" :key="g.id">{{ g.name }}</li>
                    </ol>
                </template>
            </Category>

        </div>
    </div>
</template>

<script lang = 'ts' setup name = 'SlotFather'>
    import Category from "@/views/09_slot/Category.vue";
</script>

<style scoped>
    .father {
        background-color: rgb(165, 164, 164);
        padding: 10px;
        border-radius: 10px;
    }

    .context {
        display: flex;
        justify-content: space-evenly;
    }
</style>

子组件:
<template>
       <slot :youxi="game" x="x变量" y="y变量"></slot>
</template>

<script setup lang="ts" name ="Category">
    import { reactive } from "vue";
    let game = reactive([
        {
            id: "001",
            name: "穿越火线",
        },
        {
            id: "002",
            name: "地下城与勇士",
        },
        {
            id: "002",
            name: "梦幻西游",
        }
    ])
</script>
 
<style scoped>
    h3{
        background-color: orange;
    }
</style>

// 作用域插槽也可以配合具名插槽使用
// v-slot:插槽名字="参数名字"
```



17. 其他的API

```typescript
1. ref 和 shallowRef: 
let person = shallowRef({id: '001', name: '张三'})
let sum = shallowRef(10)

function updateData() {
  person.value = {id: '002', name: '李四'}  // 第一层, 可以修改成功
  person.value.name = '王五'  // 第二层, 不能修改成功
  
  sum.value = 100	// 第一层, 可以修改成功
}

# shallowRef只能做第一层数据的修改, .value就是第一层, 因此只能对.vlaue进行修改.
# 对于一些属性较多的,只需要关注对整体的修改, 效率比较高.

2. reactive 和 shallowReactive: 
let car = shallowReactive({
    name: "奔驰",			// 第一层
    options: {			 // 第一层
        color: "紫色",	// 第二层
        engine: "v8"	 // 第二层
    }
})

function updateData() {
    car.name = "宝马",			// 第一层, 可以修改成功
    car.options.color = "黑色",	// 第二层, 不能修改成功
    car.options.engine = "v12",	 // 第二层, 不能修改成功
    car.options = {				 // 第一层, 可以修改成功
        color: "蓝色",
        engine: "v18"
    }
}

# shallowReactive只能做第一层数据的修改,

3. readonly // 所有层次只读,  shallowReadonlly // 第一层只读,其它层次可以修改

4. toRaw // 将一个相应是对象变成一般对象
let person = reactive({id: '001', name: '张三'})
let person2 = toRaw(person)		// 将一个响应式对象变成最原始的对象

5. markRaw // 让对象永远不能变成响应式的
let car = {name: "奔驰", price: 100}
let car2 = reactive(car) // 将原始对象变成响应式,
##
let car = markRaw({name: "奔驰", price: 100})
let car2 = reactive(car) // 这里变成响应式是无法生效的

6. 自定义Ref: customRef,  实现一个修改数据3秒后进行变化, 最好封装成一个hook
let initValue = '你好'
let timmer: number 
let msg = customRef((track, trigger) => { 
    // msg被读取的时候调用
    get(){
        track() 	// 持续关注msg, 一旦收到了msg变化的通知,就更新msg   -- 跟踪
        return initValue
    },
    // msg被修改的时候调用
    set(val){ // 修改时候接收到的值
        clearTimeout(timer)
        timer = setTimeout(()=>{
            initValue = val
        	trigger()	// 通知vue, 数据msg发生了变化   -- 出发变化
        }, 3000)
    },
})
```

