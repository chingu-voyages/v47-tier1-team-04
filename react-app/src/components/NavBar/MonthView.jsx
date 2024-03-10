import { useEffect } from 'react';
import './Month.styles.css'

const MonthView = ({closeHandler}) => {

    const closeClickHandler = () => {
        closeHandler(false)
    }

    return (
        <div className='calendar'>

            <div className='header'>Mon
                <i className="fa-solid fa-arrow-left left-arrow"></i>
            </div>
            <div className='header'>Tues</div>
            <div className='header'>Wed</div>
            <div className='header'>Thur</div>
            <div className='header'>Fri</div>
            <div className='header'>Sat</div>
            <div className='header'>Sun
                <i className="fa-solid fa-arrow-right right-arrow"></i>
                <i className="fa-solid fa-xmark close" onClick={closeClickHandler}></i>
            </div>

            <MonthDays />
            
        </div>
    )
}

const MonthDays = () => {
    var daysInCurrentMonth=new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    const listItems = [];

    var currentDate = new Date();
    currentDate.setDate(1);
    var firstDay = currentDate.getDay();

    for (let i = 0; i < firstDay - 1; i++){
        listItems.push(<div key={i} className='day'></div>);
    }
    

    for (let i = 0; i < daysInCurrentMonth; i++) {
        listItems.push(<div key={firstDay + i + 1} className='day'>{i+1}</div>);
    }
    return (
        <>
        {listItems.map(item => item)}
        </>
    )
}

export default MonthView;