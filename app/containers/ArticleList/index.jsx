import React from 'react'

export default class ArticleList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="article-list">
                <div className="article-flag">
                    {this.props.article_flag}
                </div>
                <div className="article-item">
                    <div className="article-info"></div>
                    <div className="article-img"></div>
                </div>
                <div className="article-item">
                    <div className="article-info"></div>
                    <div className="article-img"></div>
                </div>
                <div className="article-item">
                    <div className="article-info"></div>
                    <div className="article-img"></div>
                </div>
            </div>
        )
    }
}
