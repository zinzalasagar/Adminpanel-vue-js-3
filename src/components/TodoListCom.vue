<template>
    <div class="max-w-md mx-auto">
      <h1 class="text-3xl font-bold mb-4">Todo List</h1>
      <!-- Form to add new todos -->
      <form @submit.prevent="addTodo">
        <div class="flex mb-4">
          <input type="text" v-model="newTodo.todo" class="w-full border-gray-300 rounded-md px-4 py-2" placeholder="Add a new todo...">
          <button type="submit" class="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">Add</button>
        </div>
      </form>
      <!-- List of todos -->
      <table class="rounded-xl w-full mb-5 border-collapse border border-gray-300">
        <thead>
          <tr class="bg-gray-200  rounded-md">
            <th class="border border-gray-300 px-4 py-2">Id</th>
            <th class="border border-gray-300 px-4 py-2">Todo</th>
            <th class="border border-gray-300 px-4 py-2">Status</th>
            <th class="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(todo, index) in todos" :key="index" class="bg-white">
            <td class="border border-gray-300 px-4 py-2">{{ index + 1 }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ todo.todo }}</td>
            <td class="border border-gray-300 px-4 py-2">{{ todo.status }}</td>
            <td class="border border-gray-300 px-4 py-2">
              <button @click="toggleStatus(index)" class="text-blue-500 hover:text-blue-700 font-semibold mr-2">Toggle Status</button>
              <button @click="removeTodo(index)" class="text-red-500 hover:text-red-700 font-semibold">Remove</button>
            </td>
            
          </tr>
          
        </tbody>
      </table>
      <a href="/" class="bg-black text-white p-3 ">Home page</a>
    </div>
  </template>
  
  <script>
  export default {
    name:'ToDo',
    data() {
      return {
        todos: [],
        newTodo: {
          id: 1,
          todo: '',
          status: 'Pending'
        }
      };
    },
    methods: {
      addTodo() {
        if (this.newTodo.todo.trim() !== '') {
          this.todos.push({...this.newTodo});
          this.newTodo.todo = '';
        }
      },
      removeTodo(index) {
        this.todos.splice(index, 1);
      },
      toggleStatus(index) {
        this.todos[index].status = this.todos[index].status === 'Pending' ? 'Complete' : 'Pending';
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  </style>
  