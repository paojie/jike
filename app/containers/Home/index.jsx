import React from 'react';
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import './index.less'
let img = {
    p1: require('../../static/img/home-p1.jpg'),
    p2: require('../../static/img/home-p2.jpg'),
    p3: require('../../static/img/home-p3.jpg'),
    p4: require('../../static/img/home-p4.jpg'),
    p5: require('../../static/img/home-p5.jpg')
}
export default class Home extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Header></Header>
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
                </main>
                <Footer></Footer>
            </div>
        )
    }
};
