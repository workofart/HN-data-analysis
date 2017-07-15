import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
// import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
// import 'semantic-ui-css/semantic.min.css';
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
    sizePerPage: 20,
    pageStartIndex: 1,
    paginationSize: 3
}

function afterSearch(query, result) {
    console.log('Search query: ' + query);
    // console.log('Result: ' + result);
}

class StoryVocabulary extends Component{
    render () {
        if(this.props.rows && this.props.rows != -1) {
            // console.log(this.props.rows);
            return (
                <Accordion>
                    <Accordion.Title>
                        <Segment inverted size='big' color='brown'>
                            Vocabulary Table
                        </Segment>
                    </Accordion.Title>
                    <Accordion.Content>
                        <BootstrapTable data={this.props.rows} pagination={true} search={true}
                                        options={searchCallBackOptions} striped hover>
                            <TableHeaderColumn isKey searchable={false} className='alert-info' dataField='word' width='30'>Word</TableHeaderColumn>
                            <TableHeaderColumn dataField='freq' className='alert-info' headerAlign='center'
                                            searchable={true}
                                            width='20'>Frequency</TableHeaderColumn>
                        </BootstrapTable>
                </Accordion.Content>
                </Accordion>
            );
        }
        else if (this.props.rows === -1) {
            // There are no vocabulary for the story
            return (
                <h1>No vocabulary for this story</h1>
            )
        }
        return (
            <CustomLoader/>
        )
    }
};


export default StoryVocabulary;
