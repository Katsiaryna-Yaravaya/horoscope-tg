import './styles.css';

const Card = ({key, icon, name, period, onClick}) => {

    return (
        <div key={key} onClick={onClick} className="zodiac-block">
            <div className="zodiac-icon">{icon}</div>
            <div className="zodiac-info">
                <h3>{name}</h3>
                <p>{period}</p>
            </div>
        </div>
    );
};

export default Card;
