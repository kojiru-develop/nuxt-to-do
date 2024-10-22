<template>
  <div>
    <h1>TODOリスト</h1>
    <div class="add-todo">
      <input
        v-model="newTodo"
        @keyup.enter="addTodoItem"
        placeholder="新しいタスクを追加"
      />
      <button @click="addTodoItem">追加</button>
    </div>
    <div class="filter">
      <button @click="filter = 'all'" :class="{ active: filter === 'all' }">
        全て
      </button>
      <button
        @click="filter = 'active'"
        :class="{ active: filter === 'active' }"
      >
        未完了のみ
      </button>
    </div>
    <ul class="todo-list">
      <li v-for="todo in filteredTodos" :key="todo.id">
        <TodoItem :todo="todo" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useTodoStore } from "~/stores/todo";
import TodoItem from "~/components/TodoItem.vue";

const newTodo = ref("");
const todoStore = useTodoStore();
const filter = ref<"all" | "active">("all");

const filteredTodos = computed(() => {
  if (filter.value === "active") {
    return todoStore.todos.filter((todo) => !todo.completed);
  }
  return todoStore.todos;
});

const addTodoItem = () => {
  if (newTodo.value.trim()) {
    todoStore.addTodo(newTodo.value.trim());
    newTodo.value = "";
  }
};
</script>

<style scoped>
.add-todo {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.add-todo input {
  flex: 1;
}

.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.filter {
  margin-bottom: 20px;
}

.filter button {
  margin-right: 10px;
}

.filter button.active {
  font-weight: bold;
}
</style>
