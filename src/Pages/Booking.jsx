import { FiMapPin ,  FiUsers , FiCalendar , FiClock } from "react-icons/fi";
import { BsCarFrontFill } from "react-icons/bs";
function Booking(){
    const rideTypes = [
        {name:"Economy" , price :5 },
        {name:"Comfort" , price :8 },
        {name:"Premium" , price :12 },


    ];
return(
<div className="min-h-screen  bg-yellow-400  flex flex-col">
    <div className="flex-1 py-10 px-4 flex justify-center">
        <div className="w-full max-w-2xl bg-black rounded-2xl shadow-xl p-8">
<h1 className="text-3xl font-bold text-yellow-400 text-center">Book Your Ride</h1>
<p className="text-center text-white mt-1">Fast , Safe and affordable trips - anytime , anywhere .</p>
<div className="mt-8 space-y-4">
<div className="flex items-center border rounded-xl p-3 bg-white gap-3">
<FiMapPin className="text-yellow-400 text-xl"/>
<input className="w-full bg-transparent outline-none" placeholder="Drop-off location" />
</div>
</div>
<h2 className="text-lg fonr-semibold mt-6">Choose your ride </h2>
<div className="flex gap-4 overflow-x-auto mt-3 pb-2">
{rideTypes.map((ride , index)=>{
    return(
        <div 
    key={index}className="min-w-[120px]bg-gray-100 rounded-xl p-4 text-center border hover:border-yellow-400 cursor-pointer transition"
    >
        <BsCarFrontFill className="text-3xl mx-auto mb-2 text-yellow-400 " />
        <p className="font=semibold">{ride.name}</p>
        <p className="text-sm text-white">${ride.price}</p>


    </div>

    );
    
})}
</div>
<h2 className="text-lg font-semibold mt-6">Trip details</h2>
<div className="grid grid-cols-2 gap-4 mt-3">
<div className="border rounded-xl p-3 flex items-center gap-3 bg-white">
<FiCalendar className="text-yellow-400 text-xl"/>
<input type="date" className="bg-transparent outline-none w-full" />

</div>
<div className="border rounded-xl p-3 flex items-center gap-3 bg-white">
<FiClock className="text-yellow-400 text-xl"/>
<input type="time" className="bg-transparent outline-none w-full" />
</div>
<div className="border rounded-xl p-3 flex items-center gap-3 bg-white col-spaan-2">
<FiUsers className="text-yellow-400 text-xl"/>
<select className="bg-transparent outline-none w-full">
<options>1 Passenger</options>
<options>2 Passengers</options>
<options>3 Passengers</options>
<options>4 Passengers</options>
</select>
</div>
</div>
<div className="mt-6 bg-yellow-400 p-5 rounded-xl border border-yellow-400 shadow">
<h3 className="font-bold text-lg">Estimated Price</h3>
<div className="flex justify-between text-white font-bold">
<p>Distance:</p>
<p>7.4 km</p>
</div>
<div className="flex justify-between text-white font-bold ">
    <p>Approx. Fare</p>
    <p className="font-bold">12.50$</p>
    
</div>
<div className="flex justify-between text-white font-bold">
<p>ETA:</p>
<p>5min</p>
</div>
</div>
<button className="w-full mt-6 bg-yellow-400 text-white py-4 rounded-full text-lg font-semibold hover:opacity-90 transition">
Book Now
</button>
</div>

    </div>

</div>
);
}
export default Booking;