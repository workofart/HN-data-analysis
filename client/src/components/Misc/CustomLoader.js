import React, {Component} from 'react';
import {Image, Segment, Dimmer, Loader} from 'semantic-ui-react';

class CustomLoader extends Component {

    render() {
        return (
            <Segment>
                <Dimmer active>
                    <Loader size='massive'/>
                </Dimmer>
                <Image src={process.env.PUBLIC_URL + '/img/loader-short-paragraph.png'} />
                <Image src={process.env.PUBLIC_URL + '/img/loader-short-paragraph.png'} />
                <Image src={process.env.PUBLIC_URL + '/img/loader-short-paragraph.png'} />
                <Image src={process.env.PUBLIC_URL + '/img/loader-short-paragraph.png'} />
                <Image src={process.env.PUBLIC_URL + '/img/loader-short-paragraph.png'} />
                <Image src={process.env.PUBLIC_URL + '/img/loader-short-paragraph.png'} />
                <Image src={process.env.PUBLIC_URL + '/img/loader-short-paragraph.png'} />
                <Image src={process.env.PUBLIC_URL + '/img/loader-short-paragraph.png'} />
                <Image src={process.env.PUBLIC_URL + '/img/loader-short-paragraph.png'} />
                <Image src={process.env.PUBLIC_URL + '/img/loader-short-paragraph.png'} />
                <Image src={process.env.PUBLIC_URL + '/img/loader-short-paragraph.png'} />
                <Image src={process.env.PUBLIC_URL + '/img/loader-short-paragraph.png'} />
            </Segment>
        )
    }

}

export default CustomLoader;