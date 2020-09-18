import React from 'react';
import { connect } from 'react-redux';
import loadingImg from '../img/loading.png'

const Spinner = ({ isLoading }) => 
    <div className="spinner-img">
        <div className="spinner-placeholder"></div>
        <img className="spinner" src={loadingImg} alt=""/>
    </div>

const mapStateToProps = state => ({
    isLoading: state.gameData.isLoading
});

export default connect(mapStateToProps)(Spinner);
