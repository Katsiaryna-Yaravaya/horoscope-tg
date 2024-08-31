import './styles.css';

const Modal = ({onTouchStart, onTouchMove, children}) => {

    return (
        <div
            className="modal"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
        >
            <div className="modal-dialog">
                {children}
            </div>
        </div>
    );
};

export default Modal;
