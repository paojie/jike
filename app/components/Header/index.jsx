import React from 'react'
import './index.less'
import {Link} from 'react-router-dom'
import PureRenderMixin from 'react-addons-pure-render-mixin'    
// 获取本地图片
let img = require('../../static/img/edit-icon.png')

export default class Header extends React.Component {
    constructor(props) {
        super(props)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            curr: 0
        }
    }

    componentDidMount() {
        let beforeScrollTop = document.body.scrollTop
        window.addEventListener('scroll', function() {

            let afterScrollTop = document.body.scrollTop
            let delta  = afterScrollTop - beforeScrollTop
            if(delta === 0)  {
                return false
            }
            confirm('hh')
            
            // _handScroll( delta > 0 ? "down" : "up" );  

            _handScroll('bs')
        })
    }

    _handScroll(direction) {
        confirm(direction)
    }

    handleClick(i) {
        this.setState({curr: i})
    }

    handleScroll() {

    }



    render() {
        return (
            <header>
                <div className="head">
                    <div className="head-logo">
                        <a href=""></a>
                    </div>
                    <ul className="nav clearfix" data-index={this.state.curr}>
                        <div className="nav-bottom-bar"></div>
                        <li onClick={this.handleClick.bind(this, 1)}
                            className={this.state.curr === 1 ? 'active' : ''}>
                            <Link to="/">
                                <span>
                                    首页
                                </span>
                            </Link>
                        </li>
                        <li onClick={this.handleClick.bind(this, 2)}
                            className={this.state.curr === 2 ? 'active' : ''}>
                            <Link to="/">
                                <span>阅读</span>
                            </Link>
                        </li>
                        <li onClick={this.handleClick.bind(this, 3)}
                            className={this.state.curr === 3 ? 'active' : ''}>
                            <Link to="/">
                                <span>电台</span>
                            </Link>
                        </li>
                        <li onClick={this.handleClick.bind(this, 4)}
                            className={this.state.curr === 4 ? 'active' : ''}>
                            <Link to="/">
                                <span>碎片</span>
                            </Link>
                        </li>
                        <li onClick={this.handleClick.bind(this, 5)}
                            className={this.state.curr === 5 ? 'active' : ''}>
                            <Link to="/">
                                <span>客户端</span>
                            </Link>
                        </li>

                    </ul>
                    <div className="nav-r">
                        <div className="editor">
                            <div className="editor-wrapper">
                                <img src={img}/>
                            </div>
                        </div>
                        <div className="h-login">
                            <div>登录&nbsp;<span>/</span>&nbsp;注册</div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
};
