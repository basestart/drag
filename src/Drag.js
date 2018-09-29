import React, { Component } from 'react';
import Draggable from 'react-draggable'; 

export default class Drag extends Component {
    componentDidMount () {
        this.flag = false;       //是否按下鼠标的标记
        this.cur = {             //记录鼠标按下时的坐标
            x:0,
            y:0
        }
        Object.assign(this, {
            nx: 0,
            ny: 0
        });
        this.div2 = this.refs.box;

        document.addEventListener("touchmove",function(event){
            event.preventDefault();
        },false);
    }

    down (event){
        this.flag = true;
        var touch ;
        if(event.touches){
            touch = event.touches[0];
        }else {
            touch = event;
        }
        //确认鼠标按下
        this.cur.x = touch.clientX;   //记录当前鼠标的x坐标
        this.cur.y = touch.clientY;   //记录当前鼠标的y坐标
        let {offsetLeft, offsetTop, offsetWidth, offsetHeight} = touch.target;
        this.center = [offsetLeft + offsetWidth / 2, offsetTop + offsetHeight / 2];
    }

    move (event) {
        if(this.flag){
            var touch ;
            if(event.touches){
                touch = event.touches[0];
            }else {
                touch = event;
            }
            this.nx = touch.clientX - this.cur.x;
            this.ny = touch.clientY - this.cur.y;
            let {offsetLeft, offsetTop, offsetWidth, offsetHeight} = touch.target;
            this.center = [offsetLeft + this.nx + offsetWidth / 2, offsetTop + this.ny + offsetHeight / 2];
            this.div2.style.transform = `translate(${this.nx}px, ${this.ny}px)`;
        }
    }

    //鼠标释放时候的函数
    end(){
        console.log(this.center)
        let {end} = this.props;
        let res = end(this.props.id, this.center);
        this.div2.style.transform = `translate(0px, 0px)`
        this.flag = false;
    }

    render () {
        return <div 
            onMouseDown={this.down.bind(this)}
            onTouchStart={this.down.bind(this)}
            onMouseMove={this.move.bind(this)}
            onTouchMove={this.move.bind(this)}
            onMouseUp={this.end.bind(this)}
            onTouchEnd={this.end.bind(this)}
        ref="box"
            style={{height:"200px", width: "200px", border: "1px solid red", borderRadius: "100px"}}
        ></div>
    }
}

