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
<div className="min-h-screen bg-yellow-400 text-white p-6 md:p-16">
    <h1 className="text-4xl font-bold text-center drop-shadow-lg mb-10">
        Best Offers Available
    </h1>
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {Offers.map((offer , index)=>{
            return(
                <div key={index}
                className="bg-black backdrop-blur-lg shadow-xl rounded-2xl p-6 border border-white/20 transition transform hover:-translate-y-2 hover:shadow-2xl duration-300"
                >
                    <span className="px-3 py-1 bg-black/20 text-white text-sm rounded-full">
                        {offer.badge}

                    </span>
                    <h2 className="text-2xl font-bold mt-3">
                        {offer.title}

                    </h2>
                    <p className="mt-2 text-gray-300 leading-relaxed">
                        {offer.description}
                    </p>
                    <button className="mt-5 w-full py-2 rounded-xl bg-yellow-400 text-white font-semibold hover:bg-yellow-200">
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