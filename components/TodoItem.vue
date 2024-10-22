<template>
  <div class="todo-item">
    <input type="checkbox" v-model="todo.completed" />
    <div class="task-content">
      <span v-if="!isEditing" :class="{ completed: todo.completed }">{{
        todo.title
      }}</span>
      <input
        v-else
        type="text"
        v-model="editedTitle"
        @keyup.enter="saveTitle"
        @blur="saveTitle"
      />
    </div>
    <div class="button-group">
      <button @click="toggleEdit">{{ isEditing ? "保存" : "編集" }}</button>
      <button @click="removeTodoItem">削除</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Todo, useTodoStore } from "~/stores/todo";

const props = defineProps<{
  todo: Todo;
}>();

const todoStore = useTodoStore();
const isEditing = ref(false);
const editedTitle = ref(props.todo.title);

const toggleEdit = () => {
  if (isEditing.value) {
    saveTitle();
  } else {
    isEditing.value = true;
  }
};

const saveTitle = () => {
  todoStore.updateTodoTitle(props.todo.id, editedTitle.value);
  isEditing.value = false;
};

const removeTodoItem = () => {
  todoStore.removeTodo(props.todo.id);
};
</script>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.task-content {
  flex: 1;
}

.button-group {
  margin-right: auto;
  display: flex;
  gap: 5px;
}

.todo-item input[type="text"] {
  flex: 1;
}

.todo-item .completed {
  text-decoration: line-through;
}

.todo-item input[type="checkbox"] {
  cursor: pointer;
}

.todo-item .completed {
  text-decoration: line-through;
}
</style>
