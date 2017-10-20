import React from 'react'
import './index.less'
import {Link} from 'react-router-dom'
import {logIn} from '../../actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom' 

import PureRenderMixin from 'react-addons-pure-render-mixin'    

// 获取本地图片
let img = require('../../static/img/edit-icon.png')
let img_msg = require('../../static/img/msg.png')
let img_setting = require('../../static/img/user-setting-img.png')
class Header extends React.Component {
    constructor(props) {
        super(props)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            curr: 0,
            scroll_d: '',
            curr_l: 1,
            show: false,
            name: '',
            email: '',
            password: '',

            login_name: '',
            login_password: '',

            name_click: false,
            email_click: false,
            password_click: false,
            input_ok: '',

            input_email_no: false,
            validate: true,
            validate_flag: false,
            validate_name: false,
            validate_email: false,
            validate_password: false,

            show_name: false
        }

        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleNameValue = this.handleNameValue.bind(this)
        this.handleEmailValue = this.handleEmailValue.bind(this)
        this.handlePasswordValue = this.handlePasswordValue.bind(this)
        this.handleValidateName = this.handleValidateName.bind(this)
        this.handleValidateEmail = this.handleValidateEmail.bind(this)
        this.handleValidatePassword = this.handleValidatePassword.bind(this)
        this.handleReg = this.handleReg.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleLoginNameValue = this.handleLoginNameValue.bind(this)
        this.handleLoginPasswordValue = this.handleLoginPasswordValue.bind(this)
        // this.handleInputUI = this.handleInputUI.bind(this)

    }

    componentDidMount() {

        window.setTimeout(function() {
            window.scrollTo(0,0)
        },200)

        document.body.style.overflow = 'hidden'

        let beforeScrollTop = document.body.scrollTop || document.documentElement.scrollTop
        let that = this
        window.addEventListener('scroll', function() {

            let afterScrollTop = document.body.scrollTop || document.documentElement.scrollTop
            let delta = afterScrollTop - beforeScrollTop

            if(delta === 0)  {
                return false
            }

            that._handScroll( delta > 0 ? "down" : "up" );  

            beforeScrollTop = afterScrollTop

        })
    }

    _handScroll(direction) {
        if(direction == 'down') {
            this.setState({
                scroll_d : 'down'
            })
        }
        else if (direction == 'up') {
            this.setState({
                scroll_d : 'up'
            })
        }
    }
    handleLoginNameValue(event) {
        this.setState({
            login_name: event.target.value
        })
    }

    handleLoginPasswordValue(event) {
        this.setState({
            login_password: event.target.value
        })
    }



    handleUIClick(i) {
        this.setState({curr: i})
    }

    handleLoginChange(i) {
        this.setState({curr_l: i})
    }

    handleShow() {
        this.setState({show: true})
    }

    handleClose() {
        this.setState({show: false})
    }

    handleNameValue(event) {
        this.setState({name: event.target.value})
    }
    handleEmailValue(event) {
        this.setState({email: event.target.value})
    }
    handlePasswordValue(event) {
        this.setState({password: event.target.value})
    }

    handleValidateName(event) {
        // 2-6 位·中文
        let reg = /^[\u4E00-\u9FA5]{2,6}$/g
        this.setState({
            name_click: true
        })
        if(!reg.test(event.target.value)) {
            this.setState({
                validate: false,
                validate_name: true
            })
        }else {
            this.setState({
                validate: true,
                validate_name: false
            })

            let content = JSON.stringify({
                name: event.target.value
            })

            fetch('http://localhost:3003/api/findUser', {
                method: 'POST',
                headers:{
                    "Content-Type": "application/json",
                    "Content-Length": event.target.value.length.toString()
                },
                body: content
            }).then(res => {
                if(res.ok){
                    return res.json()
                } else {
                    console.log('获取用户失败')
                }
            }).then(json => {
                if(json.reg) {
                    this.setState({
                        show_name: true
                    })
                }else {
                    this.setState({
                        show_name: false
                    })
                }
            })

        }

    }

    handleValidateEmail(event) {
        let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/ 
        this.setState({
            email_click: true
        })
        if(!reg.test(event.target.value)) {
            this.setState({
                validate: false,
                validate_email: true
            })
        }else {
            this.setState({
                validate: true,
                validate_email: false
            })
        }

    }

    handleValidatePassword(event) {
        // 6-12位字母数字下划线
        let reg = /^[\w]{6,12}$/g
        this.setState({
            password_click: true
        })
        if(!reg.test(event.target.value)) {
            this.setState({
                validate: false,
                validate_password: true
            })
        }else {
            this.setState({
                validate: true,
                validate_password: false
            })
        }

    }

    handleInputUI(i) {
        this.setState({
            input_ok: i
        })
    }

    handleReg() {

        const {dispatch} = this.props
        // let name = this.state.name,

        if(this.state.show_name||!this.state.name_click || !this.state.email_click || !this.state.password_click || !this.state.validate) {
            return false;
        }else {
            let content  = JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })

            fetch('http://localhost:3003/api/register', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Content-Length": content.length.toString()
                },
                body: content
            }).then(res => {
                if(res.ok) {
                    console.log('注册成功')
                    return res.json()
                }
            }).then(json => {
                if(json) {
                    localStorage.setItem('token',json)
                    dispatch(logIn(
                        {
                            name: this.state.name
                        }
                    ))
                    // this.props.history.push('/')
                    this.setState({
                        show: false
                    })
                }else {
                    console.log('注册失败');
                }
            })
        }

    }

    handleLogin() {
        const {dispatch} = this.props

        const name = this.state.login_name
        const password = this.state.login_password

        const content = JSON.stringify({
            name,
            password
        })

        fetch('http://localhost:3003/api/login', {
            method: 'POST',    
            headers:{
                "Content-Type": "application/json",
                "Content-Length": content.length.toString()
            },
            body: content
        }).then(res => {
            if(res.ok){
                this.setState({
                    show: false
                })
                console.log('登录成功')
                return res.json()  // 返回token的json数据
            }
        }).then(token=>{          // 接受token的json数据，改变state中的user的值。
            if(token){         //如果有token
                dispatch(logIn({name}))  // 发出action，{ type: LOG_IN,user }, reducer=> {user:name}
                localStorage.setItem('token',token)  // 存储token到localStorage中。
            } else {
                console.log('登录失败!')
            }
    })

    }



    render() {

        // 获取用户信息，退出callback
        const {user,logOut} = this.props;  
        console.log('>>>>>>>>.' + user.name);
        // region 返回顶部
        let head_cl
        if(this.state.scroll_d == '') {
            head_cl = ''
        }else if(this.state.scroll_d == 'up') {
            head_cl = 'fade-up'
        }else if(this.state.scroll_d == 'down') {
            head_cl = 'fade-down'
        }
        //endregion 
 
        return (
            <div>
            <header className={head_cl} >
                <div className="head">
                    <div className="head-logo">
                        <a href=""></a>
                    </div>
                    <ul className="nav clearfix" data-index={this.state.curr}>
                        <div className="nav-bottom-bar"></div>
                        <li onClick={this.handleUIClick.bind(this, 1)}
                            className={this.state.curr === 1 ? 'active' : ''}>
                            <Link to="/">
                                <span>
                                    首页
                                </span>
                            </Link>
                        </li>
                        <li onClick={this.handleUIClick.bind(this, 2)}
                            className={this.state.curr === 2 ? 'active' : ''}>
                            <Link to="/">
                                <span>阅读</span>
                            </Link>
                        </li>
                        <li onClick={this.handleUIClick.bind(this, 3)}
                            className={this.state.curr === 3 ? 'active' : ''}>
                            <Link to="/">
                                <span>电台</span>
                            </Link>
                        </li>
                        <li onClick={this.handleUIClick.bind(this, 4)}
                            className={this.state.curr === 4 ? 'active' : ''}>
                            <Link to="/">
                                <span>碎片</span>
                            </Link>
                        </li>
                        <li onClick={this.handleUIClick.bind(this, 5)}
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

                        {
                            user.name && 
                            (
                                <div className="message">
                                    <div className="msg-icon">
                                        <img src={img_msg} width="44px" /> 
                                    </div> 
                                    <div className="msg-menu">
                                        <div className="drop-menu msg-drop">
                                            <ul>
                                                <li>
                                                    <a href="">评论 <span>0</span></a></li> 
                                                <li>
                                                    <a href="">喜欢 <span>0</span></a></li> 
                                                <li><a href="">粉丝 <span>0</span></a></li> 
                                                <li><a href="">片邮 <span>0</span></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                        {
                            user.name && 
                            <div className="setting">
                                <a href="../../pages/user/user.html?uid=4601791">
                                    <img src={img_setting} className="user-icon"/>
                                </a> 
                                <div className="msg-menu">
                                    <div className="drop-menu setting-drop">
                                        <ul>
                                            <li><a href="../../pages/set/userSet.html">账号设置</a></li> 
                                            <li><a onClick={logOut}>退出</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        }


                        {
                            !user.name &&    
                            <div className="h-login"  onClick={this.handleShow}>
                                <div>登录&nbsp;<span>/</span>&nbsp;注册</div>
                            </div>
                        }
                       

                    </div>
                </div>
                <div className="login">

                </div>
            </header>

            <div className="login" style={this.state.show ? {display: 'block'} : {display: 'none'}}>

                <div className="login-box" style={this.state.show ? {display: 'block'} : {display: 'none'}}>

                    <div className="login-close" onClick={this.handleClose}>

                    </div>

                    <div className="login-box-head">世界很美, 而你正好有空</div> 
                    <div className="login-title" data-index={this.state.curr_l} > 
                        <div className="login-action-bar">

                        </div>
                        <span className="active" onClick={this.handleLoginChange.bind(this, 1)}>登录</span> 
                        <span className="" onClick={this.handleLoginChange.bind(this, 2)}>注册</span>
                    </div> 
                    <div className="login-content" >
                        {
                            this.state.curr_l === 1 ? 
                            <div>
                                <div className="login-input">
                                    <input 
                                        type="text" 
                                        placeholder="输入邮箱或手机号" 
                                        value={this.state.login_name} 
                                        onChange={this.handleLoginNameValue}
                                        onFocus={this.handleInputUI.bind(this, 'a')}
                                        className={this.state.input_ok == 'a' ? 'login-input-active': ''}/>
                                </div>  
                                <div className="login-input">
                                    <input 
                                        type="password" 
                                        placeholder="密码" 
                                        value={this.state.login_password} 
                                        onChange={this.handleLoginPasswordValue}
                                        onFocus={this.handleInputUI.bind(this, 'b')}
                                        className={this.state.input_ok == 'b' ? 'login-input-active': ''}/>
                                    <div className="login-btn" onClick={this.handleLogin}>登录</div>
                                </div> 
                                <div className="register-content" style={{display:'none'}}>
                                    <img src="http://qnstatic.pianke.me/public/assets/img/pianke-code.png"/>
                                </div> 
                            </div> : 
                            <div>
                                <div className="login-input">
                                    <input type="text" 
                                        placeholder="昵称" 
                                        value={this.state.name} 
                                        onChange={this.handleNameValue} 
                                        onBlur={this.handleValidateName} 
                                        onFocus={this.handleInputUI.bind(this, 1)}
                                        className={this.state.input_ok == '1' ? 'login-input-active': ''}/>
                                    {
                                        this.state.validate_name ? <div className="login-tip">请输入2到6位中文</div> : ''
                                    }{
                                        this.state.show_name ? <div className="login-tip">该昵称已被占用哦</div> : ''
                                    }
                                </div> 
                                <div className="login-input">
                                    <input type="text" 
                                        placeholder="输入邮箱" 
                                        value={this.state.email} 
                                        onChange={this.handleEmailValue} 
                                        onBlur={this.handleValidateEmail} 
                                        onFocus={this.handleInputUI.bind(this, 2)}
                                        className={this.state.input_ok == '2' ? 'login-input-active': ''}/>

                                    {
                                        this.state.validate_email ? <div className="login-tip">请输入正确的邮箱地址</div> : ''
                                    }
                                    
                                </div> 
                                {/* <div className="login-input">
                                    <input type="text" placeholder="输入手机号" />
                                </div>  */}
                                <div className="login-input">
                                    <input type="password" 
                                        placeholder="密码" 
                                        value={this.state.password} 
                                        onChange={this.handlePasswordValue} 
                                        onBlur={this.handleValidatePassword} 
                                        onFocus={this.handleInputUI.bind(this, 3)}
                                        className={this.state.input_ok == '3' ? 'login-input-active': ''}/>

                                    {
                                        this.state.validate_password ? <div className="login-tip"> 6到12位字母&nbsp;数字&nbsp;下划线</div> : ''
                                    }
                                    
                                    <div className="login-btn" onClick={this.handleReg}>注册</div>
                                </div> 
                                <div className="register-content" style={{display:'none'}}>
                                    <img src="http://qnstatic.pianke.me/public/assets/img/pianke-code.png"/>
                                </div> 
                            </div>

                            // <div>

                            

                        }
                    </div>
                        



                        <hr style={{display:'block',width: '400px',marginLeft: '50px',marginTop: '80px',border:'1px solid #eee'}}/>
                        {/* <div className="login-others-way">
                            <div>社区帐号登录:</div> 
                            <div className="share-cpt">
                                <div className="share-sina"></div> 
                                <div className="share-wechat"></div> 
                                <div className="share-qq"></div> 
                                <div className="share-dou"></div>
                            </div>
                        </div> */}
                </div>
            </div>
            </div>

        )
    }
};

function mapStateToProps(state) {
    const { user } = state
    return {
      user
    }
}


export default withRouter(connect(
    mapStateToProps
)(Header))


