import {TOGGLE_TERMS_MODAL } from '../template/AppTemplateActions';

const initialState = {
    showTermsModal: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_TERMS_MODAL:
          return {
            ...state,
            showTermsModal: !state.showTermsModal,
          };
        default:
          return state;
      }
}