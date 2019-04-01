import React from "react";
import {Grid, Typography,CircularProgress} from "@material-ui/core";
import queryString from "query-string";
import ErrorIcon from "@material-ui/icons/Error";
import DoneIcon from "@material-ui/icons/Done"
import {settings} from "./settings/settings";

export default class VerifyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: 'Veryfying...',
            verified: undefined
        }
    }
    componentDidMount() {
        let key = queryString.parse(this.props.location.search).key;
        //if no key is specified
        if(!key)
            return this.setState({
                message: 'No key was specified',
                verified: false
            });
        fetch(settings.verifyUrl+"/verify?key="+key).then(res => {
            if(res.status !== 200) throw new Error("Key is invalid");
            this.setState({
                message: 'Successfully verified. You can now log in.',
                verified: true
            })
        }).catch(e => {
            this.setState({
                message: e.toLocaleString(),
                verified: false
            })
        })
    }

    render(){
        let icon;
        if(this.state.verified === undefined){
            icon = (<CircularProgress color="primary"/>)
        }
        else if(this.state.verified === false){
            icon = (<ErrorIcon color="error" style={{fontSize: 90}}/>)
        }
        else{
            icon = (<DoneIcon style={{fontSize: 90, color: "green"}}/>)
        }
        console.log(queryString.parse(this.props.location.search).key);
        return (
            <React.Fragment>
                <Grid container justify="center" direction="row" alignItems="center">
                    <Grid item xs={12} style={{marginTop: "15%", textAlign: "center"}}>
                        <Typography variant="h2">{this.state.message}</Typography>
                    </Grid>
                </Grid>
                <Grid container justify="center" direction="row" alignItems="center" style={{marginTop: "5%"}}>
                    {icon}
                </Grid>
            </React.Fragment>


        );
    }
}