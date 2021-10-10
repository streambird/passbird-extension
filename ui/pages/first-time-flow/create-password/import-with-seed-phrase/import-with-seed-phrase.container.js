import { connect } from 'react-redux';
import { getMetaMaskAccounts } from '../../../../selectors';
import {
  setSeedPhraseBackedUp,
  initializeThreeBox,
  importNewAccount,
  displayWarning,
  createNewVault,
  createNewVaultAndGetSeedPhrase,
  setSelectedAddress,
} from '../../../../store/actions';
import ImportWithSeedPhrase from './import-with-seed-phrase.component';
import { getMostRecentOverviewPage } from '../../../../ducks/history/history';

function mapStateToProps(state) {
  return {
    error: state.appState.warning,
    firstAddress: Object.keys(getMetaMaskAccounts(state))[0],
    mostRecentOverviewPage: getMostRecentOverviewPage(state),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    importNewAccount: (strategy, [privateKey]) => {
      return dispatch(importNewAccount(strategy, [privateKey]));
    },
    displayWarning: (message) =>
      dispatch(displayWarning(message || null)),
    setSelectedAddress: (address) =>
      dispatch(setSelectedAddress(address)),
    setSeedPhraseBackedUp: (seedPhraseBackupState) =>
      dispatch(setSeedPhraseBackedUp(seedPhraseBackupState)),
    initializeThreeBox: () => dispatch(initializeThreeBox()),
    createNewVault: (password) =>
      dispatch(createNewVault(password)),
    createNewAccount: (password) =>
      dispatch(createNewVaultAndGetSeedPhrase(password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImportWithSeedPhrase);


