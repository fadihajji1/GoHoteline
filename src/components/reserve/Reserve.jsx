import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./reserve.css"

import useFetch  from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({setOpen, hotelId}) => {
    const [selectedRooms, setSelectedRooms] = useState([])                  // intialize an emty array of selected rooms
    const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);   // fetch the rooms of the hotel
    const { dates } = useContext(SearchContext);

    const getDatesInRange = (startDate, endDate) => {
      const start = new Date(startDate);
      const end = new Date(endDate);
  
      const date = new Date(start.getTime());
  
      const dates = [];
  
      while (date <= end) {
        dates.push(new Date(date).getTime());
        date.setDate(date.getDate() + 1);
      }
  
      return dates;
    };


    
    const handleSelect = (e) => {
        const checked = e.target.checked;    // check if room is selected
        const value = e.target.value;        // get id of the room
        setSelectedRooms(                    // put selected rooms to the new array of selected rooms
            checked ? [...selectedRooms, value]: selectedRooms.filter(  // if the room is selected add it to the array, 
                (item) => item !== value)                               //else remove it from the array
          );    
    };

    const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate); // get all selected dates of reservation by user

    const isAvailable = (roomNumber) => {    // check if the room is available for the selected dates 
        const isFound = roomNumber.unavailableDates.some((date) =>
          alldates.includes(new Date(date).getTime())
        );
    
        return !isFound;
      };
    
    const navigate = useNavigate();
    const handleClick = async () => {  // when clicked on a room, send the selected dates to the server
        try {
            await Promise.all(        //promise: when all the promises are resolved, the result will be returned
              selectedRooms.map((roomId) => {
                const res = axios.put(`/rooms/availability/${roomId}`, {  //update the availability of the room
                  dates: alldates,
                });
                return res.data; //return the updated
              })
            );
            setOpen(false);  //close the modal "optional" but it's for compatibility
            navigate("/");  //redirect to home page  "optional"
          } catch (err) {}
    };

    //delete me later
    console.log(selectedRooms)
    console.log(getDatesInRange(dates[0].startDate, dates[0].endDate))

    return (
        <div className="reserve">
            <div className="rContainer">
                <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="rClose"
                    onClick={() => setOpen(false)}
                />
                <span>Select your rooms:</span>
                {data.map((item) => (
                    <div className="rItem" > 
                        <div className="rItemInfo">
                            <div className="rTitle">{item.title}</div>
                            <div className="rDesc">{item.desc}</div>
                            <div className="rMax">
                                Max people: <b>{item.maxPeople}</b>
                            </div>
                            <div className="rPrice">{item.price}</div>
                        </div>
                        <div className="rSelectRooms">
                        {item.roomNumber.map((roomNumber) => (
                            <div className="room">
                                <label>{roomNumber.number}</label>
                                <input
                                    type="checkbox"
                                    value={roomNumber._id}
                                    onChange={handleSelect}
                                    disabled={!isAvailable(roomNumber)}   //disale the checkbox if the room is not available for the selected dates   
                                />
                           </div>
                        ))}
                        </div>
                    </div>
                ))}
                <button onClick={handleClick} className="rButton">
                    Reserve Now!
                </button>
            </div>
        </div>
    );
};

export default Reserve