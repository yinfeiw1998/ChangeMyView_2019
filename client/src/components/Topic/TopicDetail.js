import React from 'react';
import ReactHtmlParser from 'react-html-parser';

export default class App extends React.Component {
    /* Topic Format: 
        {
            title: string,
            content: string,
            hotness: number
        }
    */
            /*

        Information include: 
        {
            title: str,
            content_rich: str,
            argument: [{  //论点Object
                arg_point: string, // 论点内容
                arg_author: string, // 论点提供者
                interpretations: [{ // 论证object
                    Author: string // 论证作者
                    interpretationContent: string, // 论证内容
                    createDate: datetime,
                    interpId: objectId
                    comments: [{
                        commentId: objectId,
                        createDate: datetime,
                        Author: string // 评论作者
                        commentContent: 评论内容
                    }]
                }]

            }]
        }
        */

    constructor(props)
    {
        super(props)
        console.log(props.match.params);
        /*Connect backend to get the information of the post! */

        this.state = {
            dummy: null,
            topicObject: null,// this stores the object of topic. The format is as the above comment.

            currentStage: this.stages.PICK_POINT,
            info: {
                userPick: null,
                commentArray: null,

            },

            // Following dedicated to PICK stage handles.
            pickButtonValue: "Hide Content" // alternative: "Show Content"

        }
    }
    renderDummyValue = () => {
        const dummyParagraph = '<h1><span style="font-family: Times New Roman;"><strong>wdsaj;a;fda;sfdadsl;kasf</strong></span></h1><p>WTFWTFWTFWTFDSJIOAFASDJOJIOADFOIJ;ASFJI;ASDFJASFDAJFDJADFS;ADFSK;LZ;ASDZDSFLKLKZDSF</p><p>AAAAAASFASDLKADFSJAKLJASDKLJASFJDLKLASJ;AD;AD;AKSF;ASD;ADASAJSLF;AJKDSAJ;ASJDFAKFDCKNASHJFJSCBVUDSHEWCUUBIAUS FIOCULIRALSIDFURHSCUHDSFACDGKJFAHCUHJDSFAHCFAJKCHSCAFLHCSDFADDSHFASCKSDHDSLCSHFDKSHFSDHHDSKHFSDKHDSKFHSDJHDSJKHFSJHDFKSHJFDHSKHDFJSKHSJDKJFSJFKWHF</p><ul><li>sjdkskldsd</li><li>sdfjklsdfsdflkj</li><li>sdfjkldsfjlsdljk</li><li>sadfjajsfksd</li></ul><ol><li>dfsjklsdflkjjlkdsf</li><li>sdfjkllkjdfsjlkfsd</li><li>sfdjjosdfojisdf</li><li>sdfjiofsdjiofsd</li></ol><p></p><p></p>'
        return (
            
            
            <div>
                {ReactHtmlParser(dummyParagraph)}
            </div>
        )
    }
    stages = {
        PICK_POINT: "pick_point",
        VIEW_OPPOSITE: "view_opposite",
        SUMMARY: "summary"
    }
    
    onPickToggleClick = () => {
        console.log("Kawhi Leonard");
        let newValue = '';
        if (this.state.pickButtonValue == "Hide Content"){
            newValue = "Show Content";
        }else {
            newValue = "Hide Content";
        }

        this.setState(() => ({ pickButtonValue: newValue }));
    }
    handlePointPick = (index) => {
        console.log(index);
    }
    renderTopicBody = () => {

    }
   
    renderPickPoint = () => {
        const spaceAdd='';
        const dummyPoints = ["dafeige","minliaoli","xiaowenzhu","dsjlsd","dssdsd","dsdssdfdsf"];
        return (
            <div>
            <div className="Detail_pick_wrapper AddMargin">
                <div className="Detail_Pick_Topic">
                    <h2>This is the place that title is supposed to show. Be ready that 
                    title may actually Take up LOOOTs of space! 
                    </h2>
                    <div className="Detail_Pick_Topic_Info row">
                        <div className="col-md-8 cdx">
                            {"Hoteness:  "+100+" "}
                            <span>Contributor: Batian Diao</span>
                        </div>

                        <div className="col-md-4 rightAlign">
                            <button onClick={this.onPickToggleClick} className="btn btn-link">
                                {this.state.pickButtonValue}
                            </button>
                        </div>
                    </div>
                </div>

                {
                    (this.state.pickButtonValue === "Hide Content") && 
                    <div className="Detail_pick_topic_main_wrap">
                        <div className="Detail_pick_Topic_main">
                            {this.renderDummyValue()}
                        </div>
                    </div>

                }
 
            </div>

            <div className="Detail_pick_Query midAlign">
                <h2>What is your Point of View?</h2>
            </div>
            <div className="Detail_pick_wrap_me">
                <div className="Detail_pick_midMargin">
                    {
                        dummyPoints.map((point, index) =>
                        // Only do this if items have no stable IDs
                        <button 
                        key={index} 
                        onClick={() => this.handlePointPick(index)} 
                        className="btn btn-secondary btn-lg AddMargin">
                            {point}
                        </button>
                        )
                    }
                </div>
            </div>
            
                
            </div>
        );
    }
    // onClick={() => this.handleSort(column)}
    renderViewOpposite = () => {
        return (
            <div>
                <h3>Render View Opposite</h3>
            </div>
        );
    }

    renderSummary = () => {
        return (
            <div>
                <h3>Render Summary</h3>
            </div>
        );
    }

    render() {
        let mainContent = null;
        const stage = this.state.currentStage;
        console.log(stage);
        if (stage === this.stages.PICK_POINT){
            mainContent = this.renderPickPoint();
        }else if (stage === this.stages.VIEW_OPPOSITE) {
            mainContent = this.renderViewOpposite();
        }else if (stage === this.stages.SUMMARY) {
            mainContent = this.renderSummary();
        }

        return (
            <div className="container">
                {mainContent}
            </div>
        

        );
    }
}