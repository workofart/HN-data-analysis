import React from 'react';
import {Table, Panel} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import 'semantic-ui-css/semantic.min.css';
import {Dimmer, Loader, Image, Segment, Accordion, Icon} from 'semantic-ui-react';


const CustomLoader = () => (
    <Segment>
        <Dimmer active>
            <Loader size='massive'/>
        </Dimmer>
        <Image src='http://semantic-ui.com/images/wireframe/short-paragraph.png' />
        <Image src='http://semantic-ui.com/images/wireframe/short-paragraph.png' />
        <Image src='http://semantic-ui.com/images/wireframe/short-paragraph.png' />
        <Image src='http://semantic-ui.com/images/wireframe/short-paragraph.png' />
        <Image src='http://semantic-ui.com/images/wireframe/short-paragraph.png' />
        <Image src='http://semantic-ui.com/images/wireframe/short-paragraph.png' />
        <Image src='http://semantic-ui.com/images/wireframe/short-paragraph.png' />
        <Image src='http://semantic-ui.com/images/wireframe/short-paragraph.png' />
        <Image src='http://semantic-ui.com/images/wireframe/short-paragraph.png' />
        <Image src='http://semantic-ui.com/images/wireframe/short-paragraph.png' />
        <Image src='http://semantic-ui.com/images/wireframe/short-paragraph.png' />
        <Image src='http://semantic-ui.com/images/wireframe/short-paragraph.png' />
    </Segment>
)

const searchCallBackOptions = {
    afterSearch: afterSearch,
    clearSearch: true,
    searchDelayTime: 350,
    paginationShowsTotal: true,
    sizePerPage: 8,
    pageStartIndex: 1,
    paginationSize: 5
}

function afterSearch(query, result) {
    console.log('Search query: ' + query);
    // console.log('Result: ' + result);
}

var SideInfo = React.createClass({
    render: function () {
        if(this.props.rows) {
            // Loop through dataset to generate comment replies
            for(var i = 0; i < this.props.rows.length; i++) {
                this.props.rows[i].numKids = this.props.rows[i].kids.length;
            }
            return (
                <Accordion>
                    <Accordion.Title>
                        <Segment inverted size='big' color='brown'>
                            Comments Table
                        </Segment>
                    </Accordion.Title>
                    <Accordion.Content>
                        <BootstrapTable data={this.props.rows} pagination={true} search={true}
                                        options={searchCallBackOptions} striped hover>
                            <TableHeaderColumn isKey searchable={false} className='alert-info' dataField='id' width='100'>Comment
                                ID</TableHeaderColumn>
                            <TableHeaderColumn dataField='text' className='alert-info' headerAlign='center'
                                            searchable={true}
                                            width='600'>Comment</TableHeaderColumn>
                            <TableHeaderColumn dataField='numKids' className='alert-info' headerAlign='center'
                                            searchable={false} dataSort={true}>#
                                Replies</TableHeaderColumn>
                        </BootstrapTable>
                    </Accordion.Content>
                </Accordion>
            );
        }
        return (
            <CustomLoader/>
        )
    }
});


export default SideInfo;
