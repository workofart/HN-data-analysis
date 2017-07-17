import React, { Component } from 'react';
import {Table, Menu, Icon} from 'semantic-ui-react';

const pageButtons = 5;

class Pagination extends Component {

    state = {
        currentPage : 1
    }


    handlePageSwitch(e, target) {
        console.log('Target page: ' + target.children);
        this.setState({currentPage: target.children})

        this.props.parentSwitchPage(target.children);
    }

    refreshPageIcons (m) {
        console.log('refresh page icons')
        var n = this.props.totalRecords;
        var numPerPage = this.props.recordPerPage;
        var numPages = n / numPerPage;
        var targetPage = this.state.currentPage + m;

        // handle last/first page switch
        if (m == 999) {
            console.log('Attempt to page ' + (numPages))
            this.setState({currentPage : numPages});
            this.props.parentSwitchPage(numPages);
        }
        else if (m == -999) {
            console.log('Attempt to page ' + (1))
            this.setState({currentPage : 1});
            this.props.parentSwitchPage(1);
        }
        else if (targetPage <= numPages && targetPage >= 1) {
            console.log('Attempt to page ' + (this.state.currentPage + m))
            this.setState({currentPage : targetPage});
            this.props.parentSwitchPage(targetPage);
        }
        
    }

    // generatePageIcons (currentPage = this.state.currentPage) {
    //     var n = this.props.totalRecords;
    //     var numPerPage = this.props.recordPerPage;
    //     var numPages = n / numPerPage;

    //     console.log(currentPage);

    //     var totalIcons = [];
    //     for(var i = 1; i <= pageButtons; i ++) {
    //         var obj = <Menu.Item key={i} active={this.state.currentPage == i} onClick={ (e, target) => {this.handlePageSwitch(e, target) }}>{i}</Menu.Item>
    //         totalIcons.push(obj)
    //     }
    //     return totalIcons;
    // }

    render () {

        var n = this.props.totalRecords;
        var numPerPage = this.props.recordPerPage;
        var numPages = Math.round(n / numPerPage);

        // console.log(currentPage);

        var totalIcons = [];
        var pageStart = Math.max(1, Math.floor(this.state.currentPage / (pageButtons + 1))  * pageButtons + 1);
        var pageEnd = Math.min(numPages, Math.ceil(this.state.currentPage / pageButtons) * pageButtons);

        for(var i = pageStart; i <= pageEnd; i ++) {
            var obj = <Menu.Item key={i} active={this.state.currentPage == i} onClick={ (e, target) => {this.handlePageSwitch(e, target) }}>{i}</Menu.Item>
            totalIcons.push(obj)
        }

        return (
            <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan={this.props.colSpan}>
                    <Menu floated='right' pagination>
                        <Menu.Item icon onClick={ () => {this.refreshPageIcons.bind(this)(-999)}}>
                            <Icon name='angle double left' />
                        </Menu.Item>
                        <Menu.Item icon onClick={ () => {this.refreshPageIcons.bind(this)(-1)}}>
                            <Icon name='angle left' />
                        </Menu.Item>
                        {totalIcons}
                        <Menu.Item icon onClick={ () => {this.refreshPageIcons.bind(this)(1)}}>
                            <Icon name='angle right' />
                        </Menu.Item>
                        <Menu.Item icon onClick={ () => {this.refreshPageIcons.bind(this)(999)}}>
                            <Icon name='angle double right' />
                        </Menu.Item>
                    </Menu>
                    </Table.HeaderCell>
                </Table.Row>
                </Table.Footer>
        )
    }
}

export default Pagination