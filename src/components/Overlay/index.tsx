import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../store/reducers';

import { toggleOverlay } from '../../store/actions';

import style from './Overlay.module.css';

export interface OverlayProps {
  showOverlay: boolean;
}

const _Overlay = ({ showOverlay }: OverlayProps): JSX.Element => {
  return (
    <div
      className={`${style.backdrop}`}
      style={{ display: showOverlay ? 'flex' : 'none' }}
    >
      <div
        className={`d-flex flex-column justify-content-center align-items-center `}
      >
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div>Loading...</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: StoreState) => {
  return { showOverlay: state.showOverlay };
};

export const Overlay = connect(mapStateToProps, { toggleOverlay })(_Overlay);
