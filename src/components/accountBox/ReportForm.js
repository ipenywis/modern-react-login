import React, {Component, useState} from "react";
import mapPicker from "../accountBox/mapPicker"
import MapPicker from "../accountBox/mapPicker";



class ReportForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <section className="clean-block clean-form dark">
                    <h2 >Segurita</h2>
                    <div className="container">
                    </div>
                            <div className="mb-3">
                                <MapPicker />
                            </div>
                </section>
        );
    }
}
export default ReportForm;
