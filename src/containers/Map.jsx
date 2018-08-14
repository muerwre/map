import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setMode, prepareMap } from "$utils/map";
import { Poly } from "$containers/Poly";

export class MapComponent extends React.Component {
  componentDidMount() {
    prepareMap();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.mode !== this.props.mode) setMode(this.props.mode);
  }

  render(){
    return (
      <div>
        <Poly />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { };
}

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export const Map = connect(mapStateToProps, mapDispatchToProps)(MapComponent);
