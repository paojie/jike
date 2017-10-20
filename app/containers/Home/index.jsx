import React from 'react';
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import {connect} from 'react-redux';
import {fetchUser, logOut} from '../../actions'
import PureRenderMixin from 'react-addons-pure-render-mixin'    

import './index.less'
let img = {
    p1: require('../../static/img/home-p1.jpg'),
    p2: require('../../static/img/home-p2.jpg'),
    p3: require('../../static/img/home-p3.jpg'),
    p4: require('../../static/img/home-p4.jpg'),
    p5: require('../../static/img/home-p5.jpg')
}
class Home extends React.Component {
    constructor(props) {
        super(props)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.handleLogout = this.handleLogout.bind(this)        
    }


    handleLogout(){
        const {dispatch} = this.props;

        localStorage.removeItem('token');
        
        // 发送logout action，reducer计算 user设置为{ }
        dispatch(logOut());
        // browserHistory.push('/');
    }

    // 发送fetchUser action获取用户
    componentDidMount(){
        console.log('>>>>>>>> 携带token获取用户数据' );
        const {dispatch} = this.props;
        dispatch(fetchUser())
    }

    render() {
        const {user} = this.props;

        return (
            <div>
                <Header logOut={this.handleLogout} user={user}></Header>
                <main>
                    <div className="picture clearfix">
                        <div>
                            <a href="">
                                <img src={img.p1}/>
                                <span className="home-picture-title">愿不愿意跟我在一起？</span>
                            </a>
                        </div>
                        <div>
                            <a href="">
                                <img src={img.p2}/>
                                <span className="home-picture-title">坚持绘画147天</span>
                            </a>
                        </div>
                        <div>
                            <a href="">
                                <img src={img.p3}/>
                                <span className="home-picture-title">喜欢《悟空传》的燃，是因为《西游记》太丧</span>
                            </a>
                        </div>
                        <div>
                            <a href="">
                                <img src={img.p4}/>
                                <span className="home-picture-title">暗恋这条路，道阻且长</span>
                            </a>
                        </div>
                        <div>
                            <a href="">
                                <img src={img.p5}/>
                                <span className="home-picture-title">毕业三年，写给自己的25句忠告。</span>
                            </a>
                        </div>
                    </div>

                    <div className="content">
                        
                    </div>
                </main>
                <Footer></Footer>
            </div>
        )
    }
};



function mapStateToProps(state) {
    const { user } = state
    // const {
    //     items: posts
    // } = postsByAuthor[selectedAuthor] || {
    //     items: []                                
    // }
    return {
        user
    }
}


export default connect(mapStateToProps)(Home)
