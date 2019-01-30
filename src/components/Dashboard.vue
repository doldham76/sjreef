<template>
  <div class="hello">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1 class="page-header">MyTV    
          </h1>
          <h2 class="user-info">
            <small>
              {{ user.name() ? user.name() : 'Nameless Person'}}'s Links
            </small>
            <small class="pull-right">
            {{ user.username ? user.username : user.identityAddress }}
            </small>
            <img :src="user.avatarUrl() ? user.avatarUrl() : '/avatar-placeholder.png'" class="avatar">
          </h2>
          <form @submit.prevent="addTodo" :disabled="! todo">
            <div class="input-group">
              <input v-model="todo" type="text" class="form-control" placeholder="Add a hash..." autofocus>
              <input v-model="flname" type="text" class="form-control" placeholder="Add a filename...">
              <span class="input-group-btn">
                <button class="btn btn-default" type="submit" :disabled="! todo">Add</button>
              </span>
            </div>
          </form>

          <ul class="list-group">
            <li v-for="todo in todos"
              class="list-group-item"
              :class="{completed: todo.completed}"
              :key="todo.id">
              <label>
                <input type="checkbox" v-model="todo.completed">{{ todo.text }}
              </label>
              <label>
                {{ todo.filename }}
              </label>
              <a @click.prevent="todos.splice(todos.indexOf(todo), 1)"
                class="delete pull-right"
                href="#">X</a>
            </li>
          </ul>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
var STORAGE_FILE = 'todos.json'
export default {
  name: 'dashboard',
  props: ['user'],
  data () {
    return {
      blockstack: window.blockstack,
      todos: [],
      todo: '',
      flname: '',
      uidCount: 0
    }
  },
  watch: {
    todos: {
      handler: function (todos) {
        const blockstack = this.blockstack

        // encryption is now enabled by default
        return blockstack.putFile(STORAGE_FILE, JSON.stringify(todos))
      },
      deep: true
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    addTodo () {
      if (!this.todo.trim()) {
        return
      }
      this.todos.unshift({
        id: this.uidCount++,
        text: this.todo.trim(),
        filename: this.flname,
        completed: false
      })
      this.todo = ''
      this.flname = ''
    },

    fetchData () {
      const blockstack = this.blockstack
      blockstack.getFile(STORAGE_FILE) // decryption is enabled by default
      .then((todosText) => {
        var todos = JSON.parse(todosText || '[]')
        todos.forEach(function (todo, index) {
          todo.id = index
        })
        this.uidCount = todos.length
        this.todos = todos
      })
    },

    signOut () {
      this.blockstack.signUserOut('http://localhost:8080/#/')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

input::placeholder {
  color: grey;
}

label {
  margin-bottom: 0;
  // width: 100%;
  cursor: pointer;
  input[type="checkbox"] {
    margin-right: 5px;
  }
}
.list-group-item {
  &.completed label {
    text-decoration: line-through;
  }

  .delete {
    display: none;
  }

  &:hover .delete {
    display: inline;
    color: grey;
    &:hover {
      text-decoration: none;
      color: red;
    }
  }
}
</style>
