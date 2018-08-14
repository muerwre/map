import React from 'react';

import { preparePoly, updatePoly } from "$utils/poly";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { updatePolyCoords } from "$redux/map/actions";

export class PolyComponent extends React.Component {
  componentDidMount() {
    preparePoly({
      updatePolyCoords: this.props.updatePolyCoords,
      latlngs: this.props.poly
    });
    // updatePoly(this.props.poly);
  }

  componentDidUpdate() {
    // poly.setLatLngs()
    updatePoly(this.props.poly);
  }

  render(){
    return null;
  }
}

function mapStateToProps(state) {
  const {
    map: { poly }
  } = state;


  return {
    poly
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  updatePolyCoords,
}, dispatch);

export const Poly = connect(mapStateToProps, mapDispatchToProps)(PolyComponent);
