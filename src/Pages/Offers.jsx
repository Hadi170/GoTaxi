function Offers(){
    const Offers=[
        {
            title : "Welcome Discount",
            description:"Enjoy 20% off your first ride when you sign up for the first time .",
            badge:"New",
            button:"Book Now",
            highlight : true
        },
        {
            title : "Monthly Subscription Plans",
            description:"Save up to 25% with our monthly ride packages - perfect for frequent riders .",
            badge:"Save",
            button:"View Plans",
            highlight : false
        },
                {
            title : "Student Offer",
            description:"Get a flat 15% discount on all rides with a valid student ID.",
            badge:"Student",
            button:"Get Offer",
            highlight : false
        },
                {
            title : "Employee Offer",
            description:"Enjoy 10% off your daily commute rides from and to your workplace .",
            badge:"Work",
            button:"Register Company",
            highlight : false
        }
    ]
return(
<div className="min-h-screen bg-yellow-400 text-white px-6 py-12">
    <h1 className="text-4xl font-bold text-center mb-10">
        Best Offers Available
    </h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gao-8 max-w-6xl mx-auto">
        {Offers.map((offer , index)=>{
            return(
                <div key={index}
                className={`border rounded-2xl p-6 shadow-lg transtion transform hover:scale-105  ${offer.highlight ? "bg-yellow-400 text-black border-yellow-500":"bg-gray-900 border-gray-700 "}`}
                >
                    <span className="text-sm font-bold bg-gray-800 text-yellow-400 px-3 py-1 rounded-full">
                        {offer.badge}

                    </span>
                    <h2 className="text-2xl font-bold mt-4">
                        {offer.title}

                    </h2>
                    <p className="mt-2 text-gray-300 leading-relaxed">
                        {offer.description}
                    </p>
                    <button className={`mt-5 w-full py-2 rounded-lg font-bold transition ${offer.highlight ? "bg-black text-yellow-400 hover:bg-gray-800 ":"bg-yellow-400 text-black hover:bg-yellow-400"}`}>
                        {offer.button}
                    </button>

                </div>

            );
        })}

    </div>
    
</div>
);
}
export default Offers;