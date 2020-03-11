import React, { Component } from 'react'
import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'
import axios from 'axios'


const URL = 'http://localhost:3003/api/todos'

export default class Todo extends Component {
    constructor(props){
        super(props)
        this.handleClear = this.handleClear.bind(this)
        this.state = {
            description: '',
            list: []
        }
    }


    handleClear(){
        this.refresh()
    }

    render(){
        return(
            <div>
                <PageHeader name="Tarefas" small="Cadastro" />
                <TodoForm handleClear={this.handleClear} />
                <TodoList />
            </div>
        )
    }
}