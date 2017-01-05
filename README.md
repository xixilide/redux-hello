
### Redux三大部分：store,action,reducer。相当于King的直系下属。

那么也可以看出Redux只是一个状态管理方案，完全可以单独拿出来使用，这个King不仅仅可以是React的，去Angular，Ember那里也是可以做King的。在React中维系King和组件关系的库叫做 react-redux。

， 它主要有提供两个东西：Provider 和connect，具体使用文后说明。

提供几个Redux的学习地址：[官方教程-中文版](http://cn.redux.js.org/index.html)，[Redux 入门教程（一）：基本用法
](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)


Redux 规定， 一个 State 对应一个 View。只要 State 相同，View 就相同

### 1.Store

`Store `就是保存数据的地方，它实际上是一个Object tree。整个应用只能有一个 Store。这个Store可以看做是King的首相，掌控一切子民(组件)的活动(state)。

Redux 提供createStore这个函数，用来生成 Store。
```js
import { createStore } from 'redux';
const store = createStore(func);
```
createStore接受一个函数作为参数，返回一个Store对象(首相诞生记)

我们来看一下Store(首相)的职责：

- 维持应用的 state；
- 提供 getState() 方法获取 state；
- 提供 dispatch(action) 方法更新 state；
- 通过 subscribe(listener) 注册监听器;
- 通过 subscribe(listener) 返回的函数注销监听器。

### 2.action

`State` 的变化，会导致 View 的变化。但是，用户接触不到 State，只能接触到 View。所以，State 的变化必须是 View 导致的。Action 就是 View 发出的通知，表示 State 应该要发生变化了。即store的数据变化来自于用户操作。action就是一个通知，它可以看作是首相下面的邮递员，通知子民(组件)改变状态。它是 store 数据的唯一来源。一般来说会通过 `store.dispatch() `将 action 传到 store。

Action 是一个对象。其中的type属性是必须的，表示 Action 的名称。
```js
const action = {
  type: 'ADD_TODO',
  payload: 'Learn Redux'
};
```

Action创建函数

`Action 创建函数` 就是生成 action 的方法。“action” 和 “action 创建函数” 这两个概念很容易混在一起，使用时最好注意区分。

在 Redux 中的 action 创建函数只是简单的返回一个 action:
```js
function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}
```
这样做将使 action 创建函数更容易被移植和测试。
### 3.reducer

Action 只是描述了有事情发生了这一事实，并没有指明应用如何更新 state。而这正是 `reducer` 要做的事情。也就是邮递员(action)只负责通知，具体你(组件)如何去做，他不负责.

专业解释: Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。

Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。
```js
const reducer = function (state, action) {
  // ...
  return new_state;
};
```

### 4.数据流

严格的单向数据流是 Redux 架构的设计核心。

Redux 应用中数据的生命周期遵循下面 4 个步骤：

- 调用 store.dispatch(action)。
- Redux store 调用传入的 reducer 函数。
- 根 reducer 应该把多个子 reducer 输出合并成一个单一的 state 树。
- Redux store 保存了根 reducer 返回的完整 state 树。

工作流程图如下：

![](http://7xsssj.com2.z0.glb.qiniucdn.com/6b3fb1df3ad9c95354280a332065941a_thumb.png?_=6202469)

### 5.Connect

这里需要再强调一下：Redux 和 React 之间没有关系。Redux 支持 React、Angular、Ember、jQuery 甚至纯 JavaScript。

尽管如此，Redux 还是和 React 和 Deku 这类框架搭配起来用最好，因为这类框架允许你以 state 函数的形式来描述界面，Redux 通过 action 的形式来发起 state 变化。

Redux 默认并不包含 React 绑定库，需要单独安装。
```
npm install --save react-redux
```
当然，我们这个实例里是不需要的，所有需要的依赖已经在package.json里配置好了。

React-Redux 提供`connect`方法，用于从 UI 组件生成容器组件。connect的意思，就是将这两种组件连起来。
```js
import { connect } from 'react-redux';
const TodoList = connect()(Memos);
```
上面代码中Memos是个UI组件，TodoList就是由 React-Redux 通过connect方法自动生成的容器组件。

而只是纯粹的这样把Memos包裹起来毫无意义，完整的connect方法这样使用：
```js
import { connect } from 'react-redux'
const TodoList = connect(
  mapStateToProps
)(Memos)
```
上面代码中，connect方法接受两个参数：`mapStateToProps`和`mapDispatchToProps`。它们定义了 UI 组件的业务逻辑。前者负责输入逻辑，即将state映射到 UI 组件的参数（props），后者负责输出逻辑，即将用户对 UI 组件的操作映射成 Action。

### 6.Provider

 这个Provider 其实是一个中间件，它是为了解决让容器组件拿到King的指令(state对象)而存在的。
```js
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './components/App'
let store = createStore(todoApp);
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```
上面代码中，Provider在根组件外面包了一层，这样一来，App的所有子组件就默认都可以拿到state了。
