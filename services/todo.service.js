// NOTE: this is a synchronous service on purpose
// meant to simplify first intro to Vuex

import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const KEY = 'todosDB'

export const todoService = {
    query,
    getById,
    remove,
    save,
    getEmptyTodo
}


// async function query(filterBy) {


//     var todos = utilService.loadFromStorage(KEY)

//     if (!todos || !todos.length) {
//         todos = JSON.parse(JSON.stringify(gTodos))
//         utilService.saveToStorage(KEY, todos)
//     }

//     if (filterBy) {
//         const regex = new RegExp(filterBy.task, 'i')
//         if (filterBy.task) todos = todos.filter(todo => regex.test(todo.task))

//         if (filterBy.status && typeof filterBy.status !== 'string') {
//             todos = todos.filter((todo) => !todo.isDone)
//         } else if (filterBy.status === false) {
//             todos = todos.filter((todo) => todo.isDone)
//         } else {
//             todos = todos
//         }
//     }

//     return Promise.resolve(todos)
// }

function query(filterBy) {
    return storageService.queryWithDelay(KEY).then((todos) => {
        // console.log('todos:', todos)
        if (!todos || !todos.length) {
            todos = _createTodos()
            storageService.postMany(KEY, todos)
        }



            if (filterBy) {
                const regex = new RegExp(filterBy.task, 'i')
                if (filterBy.task) todos = todos.filter(todo => regex.test(todo.task))

                if (filterBy.status && typeof filterBy.status !== 'string') {
                    todos = todos.filter((todo) => todo.isDone)
                } else if (filterBy.status === false) {
                    todos = todos.filter((todo) => !todo.isDone)
                } else {
                    todos = todos
                }
            }


        return todos
    })
}

function getById(todoId) {
    return storageService.get(KEY, todoId)
}

async function remove(todoId) {
    return storageService.remove(KEY, todoId)
}

function save(todo) {
    return todo._id ? _update(todo) : _add(todo)
}

function _add(addedTodo) {
    const newTodo = _createTodo(addedTodo.task)
    return storageService.post(KEY, newTodo)
}

function _update(updatedTodo) {
    updatedTodo.modifiedAt = Date.now()
    return storageService.put(KEY, updatedTodo)
}

function getEmptyTodo() {
    return {
        _id: '',
        task: '',
        isDone: false
    }
}

function _createTodos() {
    var todos = utilService.loadFromStorage(KEY)
    if (!todos || !todos.length) {
        todos = [_createTodo('wash the dishes'), _createTodo('throw the garbege'), _createTodo('Be happy')]
        utilService.saveToStorage(KEY, todos)
    }
    return todos
}

function _createTodo(task) {
    return {
        _id: utilService.makeId(),
        task,
        isDone: utilService.getRandomIntInclusive(0, 100) > 50 ? false : true
    }
}

