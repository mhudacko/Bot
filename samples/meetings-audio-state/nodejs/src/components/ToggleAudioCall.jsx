import React, { Component } from "react";
import { Flex, FlexItem, Button } from "@fluentui/react-northstar";
import * as microsoftTeams from "@microsoft/teams-js";
import "../style/style.css";

class MyView extends Component {
    constructor(props) {
        super(props)
        this.state = {
           errorCode:"",
            result: ""
        }
    }
    componentDidMount() {
        microsoftTeams.app.initialize();
    }
    callback = (errcode, bln) => {
        if (errcode) {
            this.setState({ errorCode: JSON.stringify(errcode) })
        }
        else {
            this.setState({ result: JSON.stringify(bln) })
        }
    }
    ClientAudioState = () => {
        microsoftTeams.meeting.getIncomingClientAudioState(this.callback);
    }
    togglestate = () => {
        microsoftTeams.meeting.toggleIncomingClientAudio(this.callback);
    }
    render() {
        return (
            <Flex>
                <FlexItem push>
                    <div className="tag-container">
                        <h3>Mute/Unmute Audio Call </h3>
                        <Button primary content="Mute/Un-Mute" onClick={this.togglestate} />
                    </div>
                </FlexItem>
            </Flex>
        )
    }
}

export default ToggleAudioCall