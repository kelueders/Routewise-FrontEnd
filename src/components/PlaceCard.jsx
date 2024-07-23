import React, { forwardRef, useContext, useEffect, useState } from 'react'
import { DataContext } from '../Context/DataProvider'
import "./placecards.scoped.css"
import ScrollText from './ScrollText';

export const PlaceCard = forwardRef(({ place, index, addStar, removeStar, removePlace, updateMapCenter }, ref) => {
    const { textFunctions, renderRating } = useContext(DataContext);

    let firstCategory = place.category.split(",")[0]
    let days = {
        monday: "11:00AM - 7:00PM",
        tuesday: "11:00AM - 7:00PM",
        wednesday: "11:00AM - 7:00PM",
        thursday: "11:00AM - 7:00PM",
        friday: "11:00AM - 7:00PM",
        saturday: "9:00AM - 5:00PM",
        sunday: "9:00 - 1:00PM",
    }
    const convertInfo = (openingHoursStr) => {
        if (openingHoursStr.toLowerCase().includes(":")) {

            let openingHoursArr = openingHoursStr.split(", ");
            let result = {}
            // loop thru arr
            for (let i = 0; i < openingHoursArr.length; i++) {
                // let day = openingHoursArr[i].slice(0, 3)
                // get day
                let day = openingHoursArr[i].split(": ")[0]
                // get opning hrs
                let hours = openingHoursArr[i].split(": ")[1]
                // update result object
                result[day] = hours;
            }
            return result;
        } else {
            return openingHoursStr;
        }
    }
    useEffect(() => {
        console.log(convertInfo(place.info))
    }, [])
    const [openingHoursDayIndex, setOpeningHoursDayIndex] = useState(null);
    const updateOpeningHoursDayIndex = (index) => {
        if (index !== openingHoursDayIndex) {
            setOpeningHoursDayIndex(index);
        } else {
            setOpeningHoursDayIndex(null);
        }
    }

    return (
        <>
            <div className="div-to-create-space-from-fade-for-ref">
                <div id={`placeholderBefore-${index}`} className="placeCard2-placeholder hidden"></div>
                <div ref={ref} key={index} className={`placeCard2 position-relative flx-r o-none gone shown`}>

                    <div className="placeCard-img-div flx-4">
                        <img onClick={() => updateMapCenter(place.geocode)} className="placeCard2-img" src={place.imgURL} />
                    </div>
                    <div className="placeCard2-body flx-7">
                        {/* <div onClick={() => togglePopUp(index)} id={`popUp-${index}`} className="popUp d-none">{place.info}</div> */}
                        <p className="body-title truncated">{place.placeName}</p>
                        <div className="align-all-items">
                            <p className="body-category">{textFunctions.capitalize(place.category.split(',')[0])}</p>
                            {place.rating &&
                                <>
                                    <p className='m-0 x-small mx-1 gray-text'>&bull;</p>
                                    <div className="rating">
                                        <p className='score-text'>{place.rating}</p>
                                        {renderRating(place.rating).map((star, index) => {
                                            let noStar = star === 0;
                                            let fullStar = star === 1;
                                            let halfStar = star === 0.5;
                                            return <img key={index} src={`${fullStar ? "https://i.imgur.com/3eEFOjj.png" : noStar ? "https://i.imgur.com/ZhvvgPZ.png" : "https://i.imgur.com/SWExJbv.png"}`} alt="" className="star-img" />
                                        })}

                                    </div>
                                </>
                            }

                        </div>
                        {/* {place.info &&
                            <ScrollText text={place.info} height={20} fontSize={12} color="gray" />
                            // <p className="body-info truncated">{place.info.constructor === Array ? place.info.join(", ") : place.info}</p>
                        } */}
                        <div className="days">

                            {Object.entries(convertInfo(place.info)).map((day, index) => {
                                let dayName = day[0];
                                let dayShort = dayName.slice(0, 2)
                                let openingHours = day[1];
                                return <>
                                    <div key={index} onClick={() => updateOpeningHoursDayIndex(index)} className={`day-circle ${index === openingHoursDayIndex && "selected"}`}>
                                        <p className="m-0 x-small bold700">{textFunctions.capitalize(dayShort)}</p>
                                    </div>
                                    <p className={`openingHours x-small ${index !== openingHoursDayIndex && "closed"}`}>{openingHours}</p>
                                </>
                            })}
                        </div>
                        <p className="m-0 body-address truncated-2">{place.summary ?? place.address}</p>
                    </div>
                    <div className="side-options">

                        {place.favorite !== true ?
                            <img onClick={() => addStar(index)} id={`star-empty-${index}`} src="https://i.imgur.com/ZzbFaMA.png" alt="" className="star-empty my-2" />
                            :
                            <img onClick={() => removeStar(index)} id={`star-full-${index}`} src="https://i.imgur.com/M5Yj2Nu.png" alt="" className="star-full my-2" />
                        }
                        <span onClick={() => removePlace(index)} className="material-symbols-outlined mx-3 my-2 onHover-50 pointer">
                            delete
                        </span>
                    </div>
                </div>
            </div>
            <div id={`placeholderAfter-${index}`} className="placeCard2-placeholder hidden"></div>

        </>
    )
})
export default PlaceCard;