import React, { Component } from 'react';

/**
 * Pagination Component
 * 
 * @param object props - Component props.
 * @returns next and previous links, if applicable 
 */
export class Pagination extends Component {
    constructor(props) {
        super(props);
        this.onClickPrevious = this.onClickPrevious.bind(this);
        this.onClickNext = this.onClickNext.bind(this);
    }

    onClickPrevious(e) {
        const { onChangePage } = this.props;
        onChangePage(this.props.currentPage - 1 );
    }

    onClickNext(e) {
        const { onChangePage } = this.props;
        onChangePage(this.props.currentPage + 1 );
    }

    render () {
        const { totalPages, currentPage } = this.props;
        let nextLink, previousLink;

        // No pagination necessary if less than or equal to 1 pag 
        if (totalPages <= 1) {
            return null;
        }

        // Previous link only needed after page 1
        if (currentPage > 1) {
            previousLink = <div><a className="pagination__previous" onClick={this.onClickPrevious} >Previous</a></div>
            ;
        } else {
            previousLink = <div></div>;
        }

        // Next link not needed on last page 
        if (currentPage < totalPages) {
            nextLink =  <div><a className="pagination__next" onClick={this.onClickNext}>Next</a></div>;
        } else {
            nextLink = <div></div>;
        }

        return (
            <div className="pagination">
                { previousLink }
                { nextLink }
            </div>
        );
    }
}