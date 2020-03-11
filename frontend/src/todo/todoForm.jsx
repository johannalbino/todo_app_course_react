import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Grid from '../template/grid'
import IconButton from '../template/iconButton'
import { changeDescription, search, add, clearInput } from './action'


class TodoForm extends Component {

    constructor(props){
        super(props)
        this.keyHandler = this.keyHandler.bind(this)
    }

    componentDidMount() {
        this.props.search()
    }

    keyHandler(e) {
        const { add, search, description, clearInput } = this.props
        if (e.key === 'Enter'){
            e.shiftKey ? search(description) : add(description)
        } else if (e.key === 'Escape'){
            clearInput()
        }
    }
    render(){
        const { add, search, description, clearInput } = this.props
        return (
            <div role="form" className="todoForm">
                <Grid cols='12 9 10'>
                    <input id="description" className="form-control" onChange={this.props.changeDescription}
                        placeholder="Adicione uma tarefa" value={this.props.description} onKeyUp={this.keyHandler} />
                </Grid>
                <Grid cols='12 3 2'>
                    <IconButton style="primary" icon="plus" onClick={() => add(description)}></IconButton>
                    <IconButton style="info" icon="search" onClick={() => search(description)}></IconButton>
                    <IconButton style="default" icon="close" onClick={() => clearInput()}></IconButton>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => ({description: state.todo.description})
const mapDispatchToProps = dispatch => 
                    bindActionCreators({ add, changeDescription, search, clearInput }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(TodoForm)