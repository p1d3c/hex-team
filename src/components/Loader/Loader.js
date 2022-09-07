import './Loader.css';

function Loader(props) {
  return (
    <div className={`loader__overlay ${props.isLoading ? '' : 'loader__overlay_hidden'}`}>
      <div className={`lds-roller`}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loader;
